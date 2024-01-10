import { AxiosInstance } from 'axios';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Kvittering, LocaleNo } from '@navikt/fp-types';
import { ApiAccessError, ApiGeneralError, deleteData, postData } from '@navikt/fp-api';
import { FEIL_VED_INNSENDING } from 'app/utils/errorUtils';
import { ContextDataMap, ContextDataType, useContextComplete, useContextReset } from './SvpDataContext';

export const VERSJON_MELLOMLAGRING = 1;

export type SvpDataMapAndMetaData = { version: number; locale: LocaleNo } & ContextDataMap;

const useMellomlagreSøknad = (
    svpApi: AxiosInstance,
    locale: LocaleNo,
    setHarGodkjentVilkår: (harGodkjentVilkår: boolean) => void,
) => {
    const navigate = useNavigate();
    const state = useContextComplete();
    const resetState = useContextReset();

    const [error, setError] = useState<ApiAccessError | ApiGeneralError>();

    const [skalMellomlagre, setSkalMellomlagre] = useState(false);

    const promiseRef = useRef<() => void>();

    useEffect(() => {
        if (skalMellomlagre) {
            const lagreEllerSlett = async () => {
                setSkalMellomlagre(false);

                const currentPath = state[ContextDataType.APP_ROUTE];
                if (currentPath) {
                    await postData<SvpDataMapAndMetaData, Kvittering>(
                        svpApi,
                        '/storage/svangerskapspenger',
                        {
                            version: VERSJON_MELLOMLAGRING,
                            locale,
                            ...state,
                        },
                        FEIL_VED_INNSENDING,
                    );

                    navigate(currentPath);
                } else {
                    // Ved avbryt så set ein Path = undefined og må så rydda opp i data her
                    await deleteData(svpApi, '/storage/svangerskapspenger', FEIL_VED_INNSENDING);

                    setHarGodkjentVilkår(false);
                    resetState();
                    navigate('/');
                }

                if (promiseRef.current) {
                    promiseRef.current();
                }
            };

            lagreEllerSlett().catch((error: ApiAccessError | ApiGeneralError) => {
                setError(error);

                if (promiseRef.current) {
                    promiseRef.current();
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [skalMellomlagre]);

    const mellomlagreOgNaviger = useCallback(() => {
        //Må gå via state change sidan ein må få oppdatert context før ein mellomlagrar
        setSkalMellomlagre(true);

        const promise = new Promise<void>((resolve) => {
            promiseRef.current = resolve;
        });

        return promise;
    }, []);

    return useMemo(
        () => ({
            mellomlagreOgNaviger,
            errorMellomlagre: error,
        }),
        [mellomlagreOgNaviger, error],
    );
};

export default useMellomlagreSøknad;
