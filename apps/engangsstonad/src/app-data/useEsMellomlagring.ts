import { useMutation } from '@tanstack/react-query';
import { API_URLS } from 'appData/queries';
import ky, { HTTPError } from 'ky';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ApiError, captureApiError, captureMessage } from '@navikt/fp-observability';
import { EsPersonopplysningerDto_fpoversikt, FpSoknadProblemDetails } from '@navikt/fp-types';

import { ContextDataMap, ContextDataType, useContextComplete, useContextReset } from './EsDataContext';

export const VERSJON_MELLOMLAGRING = 6;

export type EsMellomlagretData = { version: number; personinfo: EsPersonopplysningerDto_fpoversikt } & ContextDataMap;

export type MellomlagreSøknadOptions = {
    // Naviger (react-router) til gjeldande steg før lagring. Default true.
    // Settast false når kallaren skal forlate appen (t.d. fortsett-seinare).
    naviger?: boolean;
    // Prøv kallet på nytt ved transiente feil. Default false.
    medRetry?: boolean;
};

export type MellomlagreSøknadFn = (options?: MellomlagreSøknadOptions) => Promise<void>;

export const useEsMellomlagring = (
    personinfo: EsPersonopplysningerDto_fpoversikt,
    setVelkommen: (erVelkommen: boolean) => void,
) => {
    const navigate = useNavigate();
    const state = useContextComplete();
    const resetState = useContextReset();

    const [forespørsel, setForespørsel] = useState<{ naviger: boolean; medRetry: boolean } | null>(null);

    const promiseRef = useRef<() => void>(null);

    const { mutate: slettMellomlagring } = useMutation({
        mutationFn: () => ky.delete(API_URLS.mellomlagring),
    });

    useEffect(() => {
        if (forespørsel) {
            const { naviger, medRetry } = forespørsel;

            const lagreEllerSlett = async () => {
                setForespørsel(null);

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
                            throw new ApiError('', 'Feil ved mellomlagring av engangsstønad', jsonResponse);
                        }
                        if (error instanceof Error) {
                            throw error;
                        }
                        throw new Error(String(error), { cause: error });
                    }
                } else {
                    // Ved avbryt så set ein Path = undefined og må så rydda opp i data her
                    slettMellomlagring();

                    setVelkommen(false);
                    resetState();
                    void navigate('/');
                }

                if (promiseRef.current) {
                    promiseRef.current();
                }
            };

            lagreEllerSlett().catch((error: Error) => {
                if (error instanceof ApiError) {
                    captureApiError(error.sentryMessage, error.problemDetails);
                } else {
                    captureMessage(error.message);
                }

                if (promiseRef.current) {
                    promiseRef.current();
                }
            });
        }
    }, [forespørsel]);

    const mellomlagreOgNaviger = useCallback<MellomlagreSøknadFn>((options) => {
        //Må gå via state change sidan ein må få oppdatert context før ein mellomlagrar
        setForespørsel({ naviger: options?.naviger ?? true, medRetry: options?.medRetry ?? false });

        return new Promise<void>((resolve) => {
            promiseRef.current = resolve;
        });
    }, []);

    return mellomlagreOgNaviger;
};
