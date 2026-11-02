import { API_URLS } from 'appData/queries';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';

import { LagreMellomlagringOptions, MellomlagringResultat, useMellomlagringskø } from '@navikt/fp-app-shell';
import { EsPersonopplysningerDto_fpoversikt } from '@navikt/fp-types';

import { ContextDataMap, ContextDataType, useContextComplete, useContextReset } from './EsDataContext';

// Bumpet fra 6 til 7: landkoder i skjemaet gikk fra alpha-2 til alpha-3 (ISO 3166-1),
// så eldre mellomlagret data må forkastes for å unngå at gamle 2-bokstavskoder blir sendt inn.
export const VERSJON_MELLOMLAGRING = 7;

export type EsMellomlagretData = { version: number; personinfo: EsPersonopplysningerDto_fpoversikt } & ContextDataMap;

type MellomlagreSøknadOptions = LagreMellomlagringOptions & {
    // Naviger (react-router) til gjeldende steg før lagring. Default true.
    // Settes false når kalleren skal forlate appen (f.eks. fortsett senere).
    naviger?: boolean;
    // Kalles med utfallet av akkurat denne lagringen, f.eks. før brukeren sendes ut av appen.
    onFerdig?: (resultat: MellomlagringResultat) => void;
};

export type MellomlagreSøknadFn = (options?: MellomlagreSøknadOptions) => Promise<void>;

type Forespørsel = Required<Omit<MellomlagreSøknadOptions, 'onFerdig'>> & {
    ferdig: (resultat: MellomlagringResultat) => void;
};

export const useEsMellomlagring = (
    personinfo: EsPersonopplysningerDto_fpoversikt,
    setVelkommen: (erVelkommen: boolean) => void,
) => {
    const navigate = useNavigate();
    const state = useContextComplete();
    const resetState = useContextReset();

    const { lagre, slett, lagringsfeil, nullstillLagringsfeil } = useMellomlagringskø<EsMellomlagretData>({
        url: API_URLS.mellomlagring,
        telemetrimeldingLagring: 'Feil ved mellomlagring av engangsstønad',
        telemetrimeldingSletting: 'Feil ved sletting av mellomlagret engangsstønad',
    });

    // Forespurte lagringer ligger i en ref-kø, ikke i state, slik at hvert kall får sitt eget svar
    // selv om flere kommer før effekten kjører. Sekvensnummeret trigger effekten, slik at vi leser
    // ferskt context-state etter kallerens dispatcher.
    const forespørslerRef = useRef<Forespørsel[]>([]);
    const [seq, setSeq] = useState(0);

    useEffect(() => {
        const forespørsler = forespørslerRef.current;
        if (forespørsler.length === 0) {
            return;
        }
        forespørslerRef.current = [];

        const fullfør = (resultat: MellomlagringResultat) => {
            for (const forespørsel of forespørsler) {
                forespørsel.ferdig(resultat);
            }
        };

        const currentPath = state[ContextDataType.CURRENT_PATH];
        if (!currentPath) {
            // Ved avbryt settes path til undefined, og mellomlagret data må ryddes opp her
            setVelkommen(false);
            resetState();
            void navigate('/');
            void slett().then(() => fullfør('OK'));
            return;
        }

        if (forespørsler.some((f) => f.naviger)) {
            void navigate(currentPath);
        }

        const data = {
            version: VERSJON_MELLOMLAGRING,
            personinfo,
            ...state,
        } satisfies EsMellomlagretData;

        void lagre(data, {
            medRetry: forespørsler.some((f) => f.medRetry),
            visFeilTilBruker: forespørsler.some((f) => f.visFeilTilBruker),
        }).then(fullfør);
    }, [seq]);

    const mellomlagreOgNaviger = useCallback<MellomlagreSøknadFn>(
        (options) =>
            new Promise<void>((resolve) => {
                forespørslerRef.current.push({
                    naviger: options?.naviger ?? true,
                    medRetry: options?.medRetry ?? false,
                    visFeilTilBruker: options?.visFeilTilBruker ?? false,
                    ferdig: (resultat) => {
                        options?.onFerdig?.(resultat);
                        resolve();
                    },
                });
                setSeq((s) => s + 1);
            }),
        [],
    );

    const slettMellomlagring = useCallback(() => {
        // Lagringer som er bestilt, men ikke sendt til køen ennå, må forkastes her. Ellers havner de
        // bak DELETE og gjenoppretter utkastet etter sletting.
        const forkastede = forespørslerRef.current;
        forespørslerRef.current = [];
        for (const forespørsel of forkastede) {
            forespørsel.ferdig('FORKASTET');
        }
        return slett();
    }, [slett]);

    return { mellomlagreOgNaviger, slettMellomlagring, lagringsfeil, nullstillLagringsfeil };
};
