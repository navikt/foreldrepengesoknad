import { useQuery } from '@tanstack/react-query';
import { API_URLS, useAnnenPartVedtakOptions } from 'api/queries';
import ky, { HTTPError } from 'ky';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VERSJON_MELLOMLAGRING } from 'utils/mellomlagringUtils';

import { ApiError, captureApiError, captureMessage } from '@navikt/fp-observability';
import {
    AnnenPartSak_fpoversikt,
    FpPersonopplysningerDto_fpoversikt,
    FpSak_fpoversikt,
    FpSoknadProblemDetails,
} from '@navikt/fp-types';
import { notEmpty } from '@navikt/fp-validation';

import { ContextDataMap, ContextDataType, useContextComplete } from './FpDataContext';

export type FpMellomlagretData = {
    version: number;
    søkerInfo: FpPersonopplysningerDto_fpoversikt;
    foreldrepengerSaker: FpSak_fpoversikt[];
    erEndringssøknad: boolean;
    søknadGjelderEtNyttBarn?: boolean;
    annenPartVedtak?: AnnenPartSak_fpoversikt;
} & ContextDataMap;

type MellomlagreSøknadOptions = {
    // Naviger (react-router) til gjeldande steg før lagring. Default true.
    // Settast false når kallaren skal forlate appen (t.d. fortsett-seinare).
    naviger?: boolean;
    // Prøv kallet på nytt ved transiente feil. Default false.
    medRetry?: boolean;
    // Blir kalla når lagringa er ferdig, med utfallet. Bruk denne når kallaren må
    // vite om lagringa gjekk bra (t.d. før ein sender brukaren ut av appen).
    onFerdig?: (resultat: MellomlagringResultat) => void;
    // Vis feilmelding til brukaren dersom lagringa feilar. Default false – for vanleg
    // stegnavigasjon held det å logge, sidan neste lagring rettar opp i det.
    visFeilTilBruker?: boolean;
};

export type MellomlagringResultat = 'ok' | 'feilet';

export type MellomlagreSøknadFn = (options?: MellomlagreSøknadOptions) => Promise<void>;

type Forespørsel = {
    naviger: boolean;
    medRetry: boolean;
    visFeilTilBruker: boolean;
    onFerdig?: (resultat: MellomlagringResultat) => void;
    ferdig: () => void;
};

export const useMellomlagreSøknad = (
    foreldrepengerSaker: FpSak_fpoversikt[],
    søkerInfo: FpPersonopplysningerDto_fpoversikt,
    erEndringssøknad: boolean,
    søknadGjelderEtNyttBarn?: boolean,
) => {
    const navigate = useNavigate();
    const state = useContextComplete();

    const annenPartVedtakQuery = useQuery(useAnnenPartVedtakOptions());

    const [lagringFeilet, setLagringFeilet] = useState(false);

    // Forespurte lagringar ligg i ein ref-kø, ikkje i state: fleire kall kan kome før
    // effekten rekk å køyre (t.d. «neste steg» og «fortsett seinare» rett etter kvarandre),
    // og då må alle promisa bli resolva. Sekvensnummeret finst berre for å trigge effekten,
    // som er naudsynt for at vi skal lese ferskt context-state etter kallaren sine dispatchar.
    const køRef = useRef<Forespørsel[]>([]);
    const [seq, setSeq] = useState(0);

    useEffect(() => {
        const forespørsler = køRef.current;
        if (forespørsler.length === 0) {
            return;
        }
        køRef.current = [];

        const naviger = forespørsler.some((f) => f.naviger);
        const medRetry = forespørsler.some((f) => f.medRetry);
        const currentRoute = notEmpty(state[ContextDataType.APP_ROUTE]);

        const lagre = async () => {
            if (naviger) {
                void navigate(currentRoute);
            }

            const data = {
                version: VERSJON_MELLOMLAGRING,
                søkerInfo,
                foreldrepengerSaker,
                erEndringssøknad,
                søknadGjelderEtNyttBarn,
                // Lagre kun når kallet faktisk har et resultat, slik at vi ikkje
                // lagrar undefined når kallet er pending/feila og dermed gir falske
                // utslag i RegisterdataUtdatert-sjekken ved neste oppstart.
                ...(annenPartVedtakQuery.isSuccess ? { annenPartVedtak: annenPartVedtakQuery.data } : {}),
                ...state,
            } satisfies FpMellomlagretData;

            try {
                await ky.post(API_URLS.mellomlagring, {
                    json: data,
                    headers: {
                        fnr: søkerInfo.fnr,
                    },
                    ...(medRetry
                        ? {
                              retry: {
                                  limit: 2,
                                  methods: ['post'],
                                  statusCodes: [408, 429, 500, 502, 503, 504],
                              },
                          }
                        : {}),
                });
            } catch (error: unknown) {
                if (error instanceof HTTPError) {
                    if (error.response.status === 401 || error.response.status === 403) {
                        throw error;
                    }

                    const jsonResponse = error.data as FpSoknadProblemDetails | undefined;
                    throw new ApiError('', 'Feil ved mellomlagring av foreldrepengesøknad', jsonResponse);
                }
                if (error instanceof Error) {
                    throw error;
                }
                throw new Error(String(error), { cause: error });
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

        lagre().then(
            () => fullfør('ok'),
            (error: unknown) => {
                //Logg feil. Om kallaren har bedt om det, blir brukaren også varsla.
                if (error instanceof ApiError) {
                    captureApiError(error.sentryMessage, error.problemDetails);
                } else if (error instanceof Error) {
                    captureMessage(error.message);
                }

                fullfør('feilet');
            },
        );
    }, [seq]);

    const mellomlagreSøknad = useCallback<MellomlagreSøknadFn>(
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

    return { mellomlagreSøknad, lagringFeilet, nullstillLagringFeilet };
};
