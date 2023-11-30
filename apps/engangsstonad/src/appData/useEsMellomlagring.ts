import { useCallback, useEffect, useMemo, useState } from 'react';
import { AxiosInstance } from 'axios';
import { Kvittering } from '@navikt/fp-types';
import { postData, ApiAccessError, ApiGeneralError, deleteData } from '@navikt/fp-api';
import { EsDataMap, EsDataType, useEsCompleteState } from './EsDataContext';
import { useNavigate } from 'react-router-dom';
import { Path } from './paths';

export const VERSJON_MELLOMLAGRING = 1;

export type EsDataMapAndVersion = { version: number } & EsDataMap;

// TODO (TOR) Fiks lokalisering
const FEIL_VED_INNSENDING =
    'Det har oppstått et problem med mellomlagring av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ';

const useEsMellomlagring = (esApi: AxiosInstance, setVelkommen: (erVelkommen: boolean) => void) => {
    const navigate = useNavigate();
    const state = useEsCompleteState();

    const [error, setError] = useState<ApiAccessError | ApiGeneralError>();

    const [skalMellomlagre, setSkalMellomlagre] = useState(false);

    useEffect(() => {
        if (skalMellomlagre) {
            const lagreEllerSlett = async () => {
                setSkalMellomlagre(false);

                const currentPath = state[EsDataType.CURRENT_PATH];
                if (currentPath) {
                    await postData<EsDataMapAndVersion, Kvittering>(
                        esApi,
                        '/storage/engangstønad',
                        {
                            version: VERSJON_MELLOMLAGRING,
                            ...state,
                        },
                        FEIL_VED_INNSENDING,
                    );

                    navigate(currentPath);
                } else {
                    navigate(Path.VELKOMMEN);
                    // Sletter ved avbryt (context er resatt)
                    await deleteData(esApi, '/storage/engangstønad', FEIL_VED_INNSENDING);
                    setVelkommen(false);
                }
            };

            lagreEllerSlett().catch((error) => {
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
