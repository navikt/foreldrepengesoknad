import { useMutation, useQuery } from '@tanstack/react-query';
import { API_URLS, useAnnenPartVedtakOptions } from 'api/queries';
import ky, { HTTPError } from 'ky';
import { useCallback } from 'react';
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

import { ContextDataMap, ContextDataType, useContextGetLatestComplete } from './FpDataContext';

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
    // Vis feilmelding til brukaren dersom lagringa feilar. Default false – for vanleg
    // stegnavigasjon held det å logge, sidan neste lagring rettar opp i det.
    visFeilTilBruker?: boolean;
};

export type MellomlagringResultat = 'ok' | 'feilet';

/**
 * Lagrar søknaden og resolvar med utfallet. Kastar aldri, så kallarar som ikkje bryr seg
 * om resultatet kan trygt gjere `void mellomlagreSøknad()`.
 */
export type MellomlagreSøknadFn = (options?: MellomlagreSøknadOptions) => Promise<MellomlagringResultat>;

const RETRY_OPTIONS = {
    limit: 2,
    methods: ['post'],
    statusCodes: [408, 429, 500, 502, 503, 504],
};

const postMellomlagring = async (data: FpMellomlagretData, fnr: string, medRetry: boolean) => {
    try {
        await ky.post(API_URLS.mellomlagring, {
            json: data,
            headers: { fnr },
            ...(medRetry ? { retry: RETRY_OPTIONS } : {}),
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

export const useMellomlagreSøknad = (
    foreldrepengerSaker: FpSak_fpoversikt[],
    søkerInfo: FpPersonopplysningerDto_fpoversikt,
    erEndringssøknad: boolean,
    søknadGjelderEtNyttBarn?: boolean,
) => {
    const navigate = useNavigate();
    // Kallarar dispatchar typisk context-oppdateringar rett før dei mellomlagrar, så vi må
    // lese ferske data – ikkje React-state frå denne renderen.
    const hentAlleData = useContextGetLatestComplete();

    const annenPartVedtakOptions = useAnnenPartVedtakOptions();
    const annenPartVedtakQuery = useQuery(annenPartVedtakOptions);

    const mutation = useMutation({
        // Felles scope gjer at TanStack køyrer overlappande lagringar serielt i den
        // rekkjefølgja dei blei starta, i staden for at dei kappast om siste ord.
        scope: { id: 'mellomlagring' },
        mutationFn: async ({ naviger, medRetry }: Required<MellomlagreSøknadOptions>) => {
            const state = hentAlleData();

            if (naviger) {
                void navigate(notEmpty(state[ContextDataType.APP_ROUTE]));
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

            await postMellomlagring(data, søkerInfo.fnr, medRetry);
        },
        onError: (error: unknown) => {
            if (error instanceof ApiError) {
                captureApiError(error.sentryMessage, error.problemDetails);
            } else if (error instanceof Error) {
                captureMessage(error.message);
            }
        },
    });

    const { mutateAsync } = mutation;

    const mellomlagreSøknad = useCallback<MellomlagreSøknadFn>(
        async (options) => {
            try {
                await mutateAsync({
                    naviger: options?.naviger ?? true,
                    medRetry: options?.medRetry ?? false,
                    visFeilTilBruker: options?.visFeilTilBruker ?? false,
                });
                return 'ok';
            } catch {
                // Feilen er allereie logga i onError, og blir vist til brukaren via
                // lagringFeilet dersom kallaren bad om det.
                return 'feilet';
            }
        },
        [mutateAsync],
    );

    // Vanleg stegnavigasjon skal ikkje uroe brukaren – neste lagring rettar opp i det.
    // Ei ny, vellukka lagring nullstiller mutasjonen og skjuler feilmeldinga automatisk.
    const lagringFeilet = mutation.isError && (mutation.variables?.visFeilTilBruker ?? false);

    return { mellomlagreSøknad, lagringFeilet, nullstillLagringFeilet: mutation.reset };
};
