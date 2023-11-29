import { useCallback, useEffect, useMemo, useState } from 'react';
import { AxiosInstance } from 'axios';
import { Kvittering } from '@navikt/fp-types';
import { storeData, ApiAccessError, ApiGeneralError } from '@navikt/fp-api';
import { EsDataMap, EsDataType, useEsCompleteState, useEsStateAllDataFn } from './EsDataContext';
import { useNavigate } from 'react-router-dom';
import { notEmpty } from '@navikt/fp-validation';

// TODO (TOR) Fiks lokalisering
const FEIL_VED_INNSENDING =
    'Det har oppstått et problem med mellomlagring av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ';

const useEsMellomlagring = (esApi: AxiosInstance) => {
    const navigate = useNavigate();
    const state = useEsCompleteState();
    const hentData = useEsStateAllDataFn();

    const [error, setError] = useState<ApiAccessError | ApiGeneralError>();

    const [skalMellomlagre, setSkalMellomlagre] = useState(false);

    useEffect(() => {
        if (skalMellomlagre) {
            const lagre = async () => {
                setSkalMellomlagre(false);

                // Logikk for å slette ved avbryt

                await storeData<EsDataMap, Kvittering>(esApi, '/soknad/engangssoknad', state, FEIL_VED_INNSENDING);

                const currentRoute = notEmpty(hentData(EsDataType.CURRENT_PATH));
                navigate(currentRoute);
            };

            lagre().catch((error) => {
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
