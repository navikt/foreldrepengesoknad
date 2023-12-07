import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosInstance } from 'axios';
import { Kvittering } from '@navikt/fp-types';
import { postData, ApiAccessError, ApiGeneralError, deleteData } from '@navikt/fp-api';
import { ContextDataMap, ContextDataType, useContextComplete, useContextReset } from './EsDataContext';

export const VERSJON_MELLOMLAGRING = 1;

export type EsDataMapAndVersion = { version: number } & ContextDataMap;

// TODO (TOR) Fiks lokalisering
const FEIL_VED_INNSENDING =
    'Det har oppstått et problem med mellomlagring av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ';

const useEsMellomlagring = (esApi: AxiosInstance, setVelkommen: (erVelkommen: boolean) => void) => {
    const navigate = useNavigate();
    const state = useContextComplete();
    const resetState = useContextReset();

    const [error, setError] = useState<ApiAccessError | ApiGeneralError>();

    const [skalMellomlagre, setSkalMellomlagre] = useState(false);

    useEffect(() => {
        if (skalMellomlagre) {
            const lagreEllerSlett = async () => {
                setSkalMellomlagre(false);

                const currentPath = state[ContextDataType.CURRENT_PATH];
                if (currentPath) {
                    await postData<EsDataMapAndVersion, Kvittering>(
                        esApi,
                        '/storage/engangsstonad',
                        {
                            version: VERSJON_MELLOMLAGRING,
                            ...state,
                        },
                        FEIL_VED_INNSENDING,
                    );

                    navigate(currentPath);
                } else {
                    // Ved avbryt så set ein Path = undefined og må så rydda opp i data
                    await deleteData(esApi, '/storage/engangsstonad', FEIL_VED_INNSENDING);

                    setVelkommen(false);
                    resetState();
                    navigate('/');
                }
            };

            lagreEllerSlett().catch((error: ApiAccessError | ApiGeneralError) => {
                setError(error);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [skalMellomlagre]);

    const mellomlagreOgNaviger = useCallback(() => {
        //Må gå via state change sidan ein må få oppdatert context før ein mellomlagrar
        setSkalMellomlagre(true);
    }, []);

    return useMemo(
        () => ({
            mellomlagreOgNaviger,
            errorMellomlagre: error,
        }),
        [mellomlagreOgNaviger, error],
    );
};

export default useEsMellomlagring;
