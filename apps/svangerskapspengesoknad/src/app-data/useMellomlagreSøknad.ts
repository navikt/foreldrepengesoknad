import * as Sentry from '@sentry/browser';
import { useMutation } from '@tanstack/react-query';
import ky, { HTTPError } from 'ky';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Søkerinfo } from '@navikt/fp-types';

import { ContextDataMap, ContextDataType, useContextComplete, useContextReset } from './SvpDataContext';

export const VERSJON_MELLOMLAGRING = 7;

const UKJENT_UUID = 'ukjent uuid';
const FEIL_VED_INNSENDING =
    'Det har oppstått et problem med innsending av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil-id: ';

export type SvpDataMapAndMetaData = { version: number; søkerInfo: Søkerinfo } & ContextDataMap;

export const useMellomlagreSøknad = (
    søkerInfo: Søkerinfo,
    setHarGodkjentVilkår: (harGodkjentVilkår: boolean) => void,
) => {
    const navigate = useNavigate();
    const state = useContextComplete();
    const resetState = useContextReset();

    const [skalMellomlagre, setSkalMellomlagre] = useState(false);

    const promiseRef = useRef<() => void>(null);

    const { mutate: slettMellomlagring } = useMutation({
        mutationFn: () => ky.delete(`${import.meta.env.BASE_URL}/rest/storage/svangerskapspenger`),
    });

    useEffect(() => {
        if (skalMellomlagre) {
            const lagreEllerSlett = async () => {
                setSkalMellomlagre(false);

                const currentPath = state[ContextDataType.APP_ROUTE];
                if (currentPath) {
                    navigate(currentPath);

                    try {
                        const data = {
                            version: VERSJON_MELLOMLAGRING,
                            søkerInfo,
                            ...state,
                        } satisfies SvpDataMapAndMetaData;
                        await ky.post(`${import.meta.env.BASE_URL}/rest/storage/svangerskapspenger`, { json: data });
                    } catch (error: unknown) {
                        if (error instanceof HTTPError) {
                            if (error.response.status === 401 || error.response.status === 403) {
                                throw error;
                            }

                            const jsonResponse = await error.response.json();
                            const callIdForBruker = jsonResponse?.uuid ?? UKJENT_UUID;
                            Sentry.captureMessage(FEIL_VED_INNSENDING + callIdForBruker);
                            throw Error(FEIL_VED_INNSENDING + callIdForBruker);
                        }
                        if (error instanceof Error) {
                            throw error;
                        }
                        throw new Error(String(error));
                    }
                } else {
                    setHarGodkjentVilkår(false);
                    resetState();
                    navigate('/');

                    // Ved avbryt så set ein Path = undefined og må så rydda opp i data her
                    slettMellomlagring();
                }

                if (promiseRef.current) {
                    promiseRef.current();
                }
            };

            lagreEllerSlett().catch((error: Error) => {
                Sentry.captureMessage(error.message);

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
