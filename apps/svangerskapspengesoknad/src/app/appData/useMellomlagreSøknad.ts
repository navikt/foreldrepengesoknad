import * as Sentry from '@sentry/browser';
import { AxiosInstance } from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ApiAccessError, ApiGeneralError, deleteData, postData } from '@navikt/fp-api';
import { Kvittering, LocaleNo } from '@navikt/fp-types';

import { ContextDataMap, ContextDataType, useContextComplete, useContextReset } from './SvpDataContext';

export const VERSJON_MELLOMLAGRING = 2;

const FEIL_VED_INNSENDING =
    'Det har oppstått et problem med innsending av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ';

export type SvpDataMapAndMetaData = { version: number; locale: LocaleNo } & ContextDataMap;

const useMellomlagreSøknad = (
    svpApi: AxiosInstance,
    locale: LocaleNo,
    setHarGodkjentVilkår: (harGodkjentVilkår: boolean) => void,
) => {
    const navigate = useNavigate();
    const state = useContextComplete();
    const resetState = useContextReset();

    const [skalMellomlagre, setSkalMellomlagre] = useState(false);

    const promiseRef = useRef<() => void>();

    useEffect(() => {
        if (skalMellomlagre) {
            const lagreEllerSlett = async () => {
                setSkalMellomlagre(false);

                const currentPath = state[ContextDataType.APP_ROUTE];
                if (currentPath) {
                    navigate(currentPath);

                    await postData<SvpDataMapAndMetaData, Kvittering>(
                        svpApi,
                        '/rest/storage/svangerskapspenger',
                        {
                            version: VERSJON_MELLOMLAGRING,
                            locale,
                            ...state,
                        },
                        FEIL_VED_INNSENDING,
                    );
                } else {
                    setHarGodkjentVilkår(false);
                    resetState();
                    navigate('/');

                    // Ved avbryt så set ein Path = undefined og må så rydda opp i data her
                    await deleteData(svpApi, '/rest/storage/svangerskapspenger', FEIL_VED_INNSENDING);
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

export default useMellomlagreSøknad;
