import { useCallback, useEffect, useMemo, useState } from 'react';
import { AxiosInstance } from 'axios';
import { Kvittering } from '@navikt/fp-types';
import { postData, ApiAccessError, ApiGeneralError, deleteData } from '@navikt/fp-api';
import { EsDataMap, EsDataType, useEsCompleteState, useEsStateResetFn } from './EsDataContext';
import { useNavigate } from 'react-router-dom';
import { Path } from './paths';
import { notEmpty } from '@navikt/fp-validation';

export const VERSJON_MELLOMLAGRING = 1;

export type EsDataMapAndVersion = { version: number } & EsDataMap;

// TODO (TOR) Fiks lokalisering
const FEIL_VED_INNSENDING =
    'Det har oppstått et problem med mellomlagring av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ';

const useEsMellomlagring = (esApi: AxiosInstance, setVelkommen: (erVelkommen: boolean) => void) => {
    const navigate = useNavigate();
    const state = useEsCompleteState();
    const resetState = useEsStateResetFn();

    const [error, setError] = useState<ApiAccessError | ApiGeneralError>();

    const [skalMellomlagre, setSkalMellomlagre] = useState(false);

    useEffect(() => {
        if (skalMellomlagre) {
            const lagreEllerSlett = async () => {
                setSkalMellomlagre(false);

                const currentPath = notEmpty(state[EsDataType.CURRENT_PATH]);
                if (currentPath !== Path.VELKOMMEN) {
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
                    // Ved avbryt så set ein Path.VELKOMMEN og må rydda opp i data

                    await deleteData(esApi, '/storage/engangstønad', FEIL_VED_INNSENDING);
                    const dokumentasjon = state[EsDataType.DOKUMENTASJON];
                    if (dokumentasjon) {
                        const vedleggUuids = dokumentasjon.vedlegg
                            .map((v) => v.uuid)
                            .filter((uuid): uuid is string => !!uuid);
                        if (vedleggUuids.length > 0) {
                            await deleteData<string[]>(esApi, '/storage/vedlegg', FEIL_VED_INNSENDING, vedleggUuids);
                        }
                    }

                    setVelkommen(false);
                    resetState();
                    navigate(Path.VELKOMMEN);
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
