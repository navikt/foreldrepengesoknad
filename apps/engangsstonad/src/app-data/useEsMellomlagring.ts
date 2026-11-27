import { useMutation } from '@tanstack/react-query';
import { API_URLS } from 'appData/queries';
import ky, { HTTPError } from 'ky';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';

import { ApiError, captureApiError, captureMessage } from '@navikt/fp-observability';
import { EsPersonopplysningerDto_fpoversikt, FpSoknadProblemDetails } from '@navikt/fp-types';

import { ContextDataMap, ContextDataType, useContextComplete, useContextReset } from './EsDataContext';

// Bumpet fra 6 til 7: landkoder i skjemaet gikk fra alpha-2 til alpha-3 (ISO 3166-1),
// så eldre mellomlagret data må forkastes for å unngå at gamle 2-bokstavskoder blir sendt inn.
export const VERSJON_MELLOMLAGRING = 7;

export type EsMellomlagretData = { version: number; personinfo: EsPersonopplysningerDto_fpoversikt } & ContextDataMap;

type MellomlagreSøknadOptions = {
    // Naviger (react-router) til gjeldande steg før lagring. Default true.
    // Settast false når kallaren skal forlate appen (t.d. fortsett-seinare).
    naviger?: boolean;
    // Prøv kallet på nytt ved transiente feil. Default false.
    medRetry?: boolean;
    // Blir kalt når lagringen er ferdig, med utfallet. Bruk denne når kalleren må
    // vite om lagringen gikk bra (f.eks. før brukeren sendes ut av appen).
    onFerdig?: (resultat: MellomlagringResultat) => void;
    // Vis feilmelding til brukeren dersom lagringen feiler. Default false.
    visFeilTilBruker?: boolean;
};

export type MellomlagringResultat = 'ok' | 'feilet';

type Forespørsel = {
    naviger: boolean;
    medRetry: boolean;
    visFeilTilBruker: boolean;
    onFerdig?: (resultat: MellomlagringResultat) => void;
    ferdig: () => void;
};

export type MellomlagreSøknadFn = (options?: MellomlagreSøknadOptions) => Promise<void>;

const tilMellomlagringsFeil = (error: unknown): Error => {
    if (error instanceof HTTPError) {
        if (error.response.status === 401 || error.response.status === 403) {
            return error;
        }
        const jsonResponse = error.data as FpSoknadProblemDetails | undefined;
        return new ApiError('', 'Feil ved mellomlagring av engangsstønad', jsonResponse);
    }
    if (error instanceof Error) {
        return error;
    }
    return new Error(String(error), { cause: error });
};

export const useEsMellomlagring = (
    personinfo: EsPersonopplysningerDto_fpoversikt,
    setVelkommen: (erVelkommen: boolean) => void,
) => {
    const navigate = useNavigate();
    const state = useContextComplete();
    const resetState = useContextReset();

    const [lagringFeilet, setLagringFeilet] = useState(false);

    // Forespurte lagringer ligger i en ref-kø, ikke i state: flere kall kan komme før
    // effekten rekker å kjøre (f.eks. «neste steg» og «fortsett senere» rett etter hverandre),
    // og da må alle bli fullført. Sekvensnummeret finnes bare for å trigge effekten,
    // som er nødvendig for at vi skal lese ferskt context-state etter kallerens dispatcher.
    const køRef = useRef<Forespørsel[]>([]);
    const [seq, setSeq] = useState(0);

    const { mutate: slettMellomlagring } = useMutation({
        mutationFn: () => ky.delete(API_URLS.mellomlagring),
    });

    useEffect(() => {
        const forespørsler = køRef.current;
        if (forespørsler.length === 0) {
            return;
        }
        køRef.current = [];

        const naviger = forespørsler.some((f) => f.naviger);
        const medRetry = forespørsler.some((f) => f.medRetry);

        const lagreEllerSlett = async () => {
            const currentPath = state[ContextDataType.CURRENT_PATH];
            if (currentPath) {
                if (naviger) {
                    void navigate(currentPath);
                }

                try {
                    const data = {
                        version: VERSJON_MELLOMLAGRING,
                        personinfo,
                        ...state,
                    } satisfies EsMellomlagretData;
                    await ky.post(API_URLS.mellomlagring, {
                        json: data,
                        ...(medRetry && {
                            retry: {
                                limit: 2,
                                methods: ['post'],
                                statusCodes: [408, 429, 500, 502, 503, 504],
                            },
                        }),
                    });
                } catch (error: unknown) {
                    throw tilMellomlagringsFeil(error);
                }
            } else {
                // Ved avbryt så set ein Path = undefined og må så rydda opp i data her
                slettMellomlagring();

                setVelkommen(false);
                resetState();
                void navigate('/');
            }
        };

        const fullfør = (resultat: MellomlagringResultat) => {
            if (resultat === 'feilet' && forespørsler.some((f) => f.visFeilTilBruker)) {
                setLagringFeilet(true);
            }
            for (const forespørsel of forespørsler) {
                forespørsel.onFerdig?.(resultat);
                forespørsel.ferdig();
            }
        };

        const lagreOgHåndterFeil = async () => {
            try {
                await lagreEllerSlett();
            } catch (error: unknown) {
                const lagringsfeil = error as Error;
                if (lagringsfeil instanceof ApiError) {
                    captureApiError(lagringsfeil.telemetryMessage, lagringsfeil.problemDetails);
                } else {
                    captureMessage(lagringsfeil.message);
                }

                fullfør('feilet');
                return;
            }

            fullfør('ok');
        };

        void lagreOgHåndterFeil();
    }, [seq]);

    const mellomlagreOgNaviger = useCallback<MellomlagreSøknadFn>(
        (options) =>
            //Må gå via state change sidan ein må få oppdatert context før ein mellomlagrar
            new Promise<void>((resolve) => {
                køRef.current.push({
                    naviger: options?.naviger ?? true,
                    medRetry: options?.medRetry ?? false,
                    visFeilTilBruker: options?.visFeilTilBruker ?? false,
                    onFerdig: options?.onFerdig,
                    ferdig: resolve,
                });
                setSeq((s) => s + 1);
            }),
        [],
    );

    const nullstillLagringFeilet = useCallback(() => setLagringFeilet(false), []);

    return { mellomlagreOgNaviger, lagringFeilet, nullstillLagringFeilet };
};
