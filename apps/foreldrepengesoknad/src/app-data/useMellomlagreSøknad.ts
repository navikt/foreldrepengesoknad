import { useQuery } from '@tanstack/react-query';
import { API_URLS, useUttaksplanOptions } from 'api/queries';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { VERSJON_MELLOMLAGRING } from 'utils/mellomlagringUtils';

import { LagreMellomlagringOptions, MellomlagringResultat, useMellomlagringskø } from '@navikt/fp-app-shell';
import { FellesUttaksplanDto, FpPersonopplysningerDto_fpoversikt, FpSak_fpoversikt } from '@navikt/fp-types';
import { notEmpty } from '@navikt/fp-validation';

import { ContextDataMap, ContextDataType, useContextComplete } from './FpDataContext';

export type FpMellomlagretData = {
    version: number;
    søkerInfo: FpPersonopplysningerDto_fpoversikt;
    foreldrepengerSaker: FpSak_fpoversikt[];
    erEndringssøknad: boolean;
    søknadGjelderEtNyttBarn?: boolean;
    fellesUttaksplan?: FellesUttaksplanDto;
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
    foreldrepengerSaker: FpSak_fpoversikt[],
    søkerInfo: FpPersonopplysningerDto_fpoversikt,
    erEndringssøknad: boolean,
    søknadGjelderEtNyttBarn?: boolean,
) => {
    const navigate = useNavigate();
    const state = useContextComplete();

    const uttaksplanQuery = useQuery(useUttaksplanOptions());

    const { lagre, slett, lagringsfeil, nullstillLagringsfeil } = useMellomlagringskø<FpMellomlagretData>({
        url: API_URLS.mellomlagring,
        lagHeaders: (data) => ({ fnr: data.søkerInfo.fnr }),
        telemetrimeldingLagring: 'Feil ved mellomlagring av foreldrepengesøknad',
        telemetrimeldingSletting: 'Feil ved sletting av mellomlagret foreldrepengesøknad',
    });

    // Forespurte lagringer ligger i en ref-kø, ikke i state: flere kall kan komme før effekten
    // rekker å kjøre, og alle må få svar. Sekvensnummeret trigger effekten, slik at vi leser
    // ferskt context-state etter kallerens dispatcher. Selve skrivekallene serialiseres i
    // useMellomlagringskø.
    const forespørslerRef = useRef<Forespørsel[]>([]);
    const [seq, setSeq] = useState(0);

    useEffect(() => {
        const forespørsler = forespørslerRef.current;
        if (forespørsler.length === 0) {
            return;
        }
        forespørslerRef.current = [];

        if (forespørsler.some((f) => f.naviger)) {
            void navigate(notEmpty(state[ContextDataType.APP_ROUTE]));
        }

        const data = {
            version: VERSJON_MELLOMLAGRING,
            søkerInfo,
            foreldrepengerSaker,
            erEndringssøknad,
            søknadGjelderEtNyttBarn,
            // Lagre kun når kallet faktisk har et resultat, slik at vi ikke lagrer undefined
            // når kallet er pending/feilet og dermed gir falske utslag i
            // RegisterdataUtdatert-sjekken ved neste oppstart.
            ...(uttaksplanQuery.isSuccess && { fellesUttaksplan: uttaksplanQuery.data }),
            ...state,
        } satisfies FpMellomlagretData;

        void lagre(data, {
            medRetry: forespørsler.some((f) => f.medRetry),
            visFeilTilBruker: forespørsler.some((f) => f.visFeilTilBruker),
        }).then((resultat) => {
            for (const forespørsel of forespørsler) {
                forespørsel.ferdig(resultat);
            }
        });
    }, [seq]);

    const mellomlagreSøknad = useCallback<MellomlagreSøknadFn>(
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

    return { mellomlagreSøknad, slettMellomlagring, lagringsfeil, nullstillLagringsfeil };
};
