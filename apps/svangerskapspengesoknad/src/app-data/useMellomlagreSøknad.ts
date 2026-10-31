import { API_URLS } from 'appData/queries';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';

import { LagreMellomlagringOptions, MellomlagringResultat, useMellomlagringskø } from '@navikt/fp-app-shell';
import { SvpPersonopplysningerDto_fpoversikt } from '@navikt/fp-types';

import { ContextDataMap, ContextDataType, useContextComplete, useContextReset } from './SvpDataContext';

// Bumpet fra 9 til 10: landkoder i skjemaet gikk fra alpha-2 til alpha-3 (ISO 3166-1),
// så eldre mellomlagret data må forkastes for å unngå at gamle 2-bokstavskoder blir sendt inn.
export const VERSJON_MELLOMLAGRING = 10;

export type SvpMellomlagretData = {
    version: number;
    søkerInfo: SvpPersonopplysningerDto_fpoversikt;
} & ContextDataMap;

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

export const useMellomlagreSøknad = (
    søkerInfo: SvpPersonopplysningerDto_fpoversikt,
    setHarGodkjentVilkår: (harGodkjentVilkår: boolean) => void,
) => {
    const navigate = useNavigate();
    const state = useContextComplete();
    const resetState = useContextReset();

    const { lagre, slett, lagringsfeil, nullstillLagringsfeil } = useMellomlagringskø<SvpMellomlagretData>({
        url: API_URLS.mellomlagring,
        telemetrimeldingLagring: 'Feil ved mellomlagring av svangerskapspengesøknad',
        telemetrimeldingSletting: 'Feil ved sletting av mellomlagret svangerskapspengesøknad',
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

        const currentPath = state[ContextDataType.APP_ROUTE];
        if (!currentPath) {
            // Ved avbryt settes path til undefined, og mellomlagret data må ryddes opp her
            setHarGodkjentVilkår(false);
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
            søkerInfo,
            ...state,
        } satisfies SvpMellomlagretData;

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

    return { mellomlagreOgNaviger, slettMellomlagring: slett, lagringsfeil, nullstillLagringsfeil };
};
