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

export type MellomlagreSøknadOptions = {
    // Naviger (react-router) til gjeldande steg før lagring. Default true.
    // Settast false når kallaren skal forlate appen (t.d. fortsett-seinare).
    naviger?: boolean;
    // Prøv kallet på nytt ved transiente feil. Default false.
    medRetry?: boolean;
};

export type MellomlagreSøknadFn = (options?: MellomlagreSøknadOptions) => Promise<void>;

export const useMellomlagreSøknad = (
    foreldrepengerSaker: FpSak_fpoversikt[],
    søkerInfo: FpPersonopplysningerDto_fpoversikt,
    erEndringssøknad: boolean,
    søknadGjelderEtNyttBarn?: boolean,
) => {
    const navigate = useNavigate();
    const state = useContextComplete();

    const annenPartVedtakQuery = useQuery(useAnnenPartVedtakOptions());

    const [forespørsel, setForespørsel] = useState<{ naviger: boolean; medRetry: boolean } | null>(null);

    const promiseRef = useRef<() => void>(null);

    useEffect(() => {
        if (forespørsel) {
            const { naviger, medRetry } = forespørsel;
            const currentRoute = notEmpty(state[ContextDataType.APP_ROUTE]);

            const lagre = async () => {
                setForespørsel(null);

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

                if (promiseRef.current) {
                    promiseRef.current();
                }
            };

            lagre().catch((error) => {
                //Logg feil, men ikkje vis feilmelding til brukar
                if (error instanceof ApiError) {
                    captureApiError(error.sentryMessage, error.problemDetails);
                } else if (error instanceof Error) {
                    captureMessage(error.message);
                }

                if (promiseRef.current) {
                    promiseRef.current();
                }
            });
        }
    }, [forespørsel]);

    const mellomlagreSøknad = useCallback<MellomlagreSøknadFn>((options) => {
        //Må gå via state change sidan ein må få oppdatert context før ein mellomlagrar
        setForespørsel({ naviger: options?.naviger ?? true, medRetry: options?.medRetry ?? false });

        const promise = new Promise<void>((resolve) => {
            promiseRef.current = resolve;
        });

        return promise;
    }, []);

    return mellomlagreSøknad;
};
