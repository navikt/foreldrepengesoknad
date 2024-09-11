import * as Sentry from '@sentry/browser';
import { AxiosInstance } from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ApiAccessError, ApiGeneralError, deleteData, postData } from '@navikt/fp-api';
import { Kvittering, LocaleAll } from '@navikt/fp-types';

import { ContextDataMap, ContextDataType, useContextComplete, useContextReset } from './EsDataContext';

export const VERSJON_MELLOMLAGRING = 1;

export type EsDataMapAndMetaData = { version: number; locale: LocaleAll } & ContextDataMap;

// TODO (TOR) Fiks lokalisering
const FEIL_VED_INNSENDING =
    'Det har oppstått et problem med mellomlagring av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ';

const useEsMellomlagring = (esApi: AxiosInstance, locale: LocaleAll, setVelkommen: (erVelkommen: boolean) => void) => {
    const navigate = useNavigate();
    const state = useContextComplete();
    const resetState = useContextReset();

    const [skalMellomlagre, setSkalMellomlagre] = useState(false);

    const promiseRef = useRef<() => void>();

    useEffect(() => {
        if (skalMellomlagre) {
            const lagreEllerSlett = async () => {
                setSkalMellomlagre(false);

                const currentPath = state[ContextDataType.CURRENT_PATH];
                if (currentPath) {
                    navigate(currentPath);

                    await postData<EsDataMapAndMetaData, Kvittering>(
                        esApi,
                        '/rest/storage/engangsstonad',
                        {
                            version: VERSJON_MELLOMLAGRING,
                            locale,
                            ...state,
                        },
                        FEIL_VED_INNSENDING,
                    );
                } else {
                    // Ved avbryt så set ein Path = undefined og må så rydda opp i data her
                    await deleteData(esApi, '/rest/storage/engangsstonad', FEIL_VED_INNSENDING);

                    setVelkommen(false);
                    resetState();
                    navigate('/');
                }

                if (promiseRef.current) {
                    promiseRef.current();
                }
            };

            lagreEllerSlett().catch((error: ApiAccessError | ApiGeneralError) => {
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

export default useEsMellomlagring;
