import { useMutation } from '@tanstack/react-query';
import { API_URLS } from 'appData/queries';
import ky, { HTTPError } from 'ky';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { ApiError, captureApiError, captureMessage } from '@navikt/fp-observability';
import { FpSoknadProblemDetails, SvpPersonopplysningerDto_fpoversikt } from '@navikt/fp-types';

import { ContextDataMap, ContextDataType, useContextComplete, useContextReset } from './SvpDataContext';

export const VERSJON_MELLOMLAGRING = 9;

export type SvpMellomlagretData = {
    version: number;
    søkerInfo: SvpPersonopplysningerDto_fpoversikt;
} & ContextDataMap;

export const useMellomlagreSøknad = (
    søkerInfo: SvpPersonopplysningerDto_fpoversikt,
    setHarGodkjentVilkår: (harGodkjentVilkår: boolean) => void,
) => {
    const navigate = useNavigate();
    const intl = useIntl();
    const state = useContextComplete();
    const resetState = useContextReset();

    const [skalMellomlagre, setSkalMellomlagre] = useState(false);

    const promiseRef = useRef<() => void>(null);

    const { mutate: slettMellomlagring } = useMutation({
        mutationFn: () => ky.delete(API_URLS.mellomlagring),
    });

    useEffect(() => {
        if (skalMellomlagre) {
            const lagreEllerSlett = async () => {
                setSkalMellomlagre(false);

                const currentPath = state[ContextDataType.APP_ROUTE];
                if (currentPath) {
                    void navigate(currentPath);

                    try {
                        const data = {
                            version: VERSJON_MELLOMLAGRING,
                            søkerInfo,
                            ...state,
                        } satisfies SvpMellomlagretData;
                        await ky.post(API_URLS.mellomlagring, { json: data });
                    } catch (error: unknown) {
                        if (error instanceof HTTPError) {
                            if (error.response.status === 401 || error.response.status === 403) {
                                throw error;
                            }

                            const jsonResponse = error.data as FpSoknadProblemDetails | undefined;
                            const callId = jsonResponse?.callId;
                            const feilmelding = callId
                                ? intl.formatMessage(
                                      { id: 'useMellomlagreSøknad.FeilVedMellomlagring.MedCallId' },
                                      { callId: callId.substring(0, 6) },
                                  )
                                : intl.formatMessage({ id: 'useMellomlagreSøknad.FeilVedMellomlagring.UtenCallId' });
                            throw new ApiError(
                                feilmelding,
                                'Feil ved mellomlagring av svangerskapspengesøknad',
                                jsonResponse,
                            );
                        }
                        if (error instanceof Error) {
                            throw error;
                        }
                        throw new Error(String(error), { cause: error });
                    }
                } else {
                    setHarGodkjentVilkår(false);
                    resetState();
                    void navigate('/');

                    // Ved avbryt så set ein Path = undefined og må så rydda opp i data her
                    slettMellomlagring();
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
    }, [skalMellomlagre]);

    const mellomlagreOgNaviger = useCallback(() => {
        //Må gå via state change sidan ein må få oppdatert context før ein mellomlagrar
        setSkalMellomlagre(true);

        const promise = new Promise<void>((resolve) => {
            promiseRef.current = resolve;
        });

        return promise;
    }, []);

    return mellomlagreOgNaviger;
};
