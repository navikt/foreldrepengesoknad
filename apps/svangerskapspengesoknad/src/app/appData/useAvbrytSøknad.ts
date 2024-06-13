import { AxiosInstance } from 'axios';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { deleteData } from '@navikt/fp-api';
import { logAmplitudeEvent } from '@navikt/fp-metrics';

import { useContextReset } from './SvpDataContext';

const useAvbrytSøknad = (svpApi: AxiosInstance, setHarGodkjentVilkår: (harGodkjentVilkår: boolean) => void) => {
    const navigate = useNavigate();
    const reset = useContextReset();

    const avbrytSøknadHandler = useCallback(async () => {
        logAmplitudeEvent('applikasjon-hendelse', {
            app: 'svangerskapspengesoknad',
            team: 'foreldrepenger',
            hendelse: 'avbrutt',
        });

        reset();

        setHarGodkjentVilkår(false);

        try {
            await deleteData(svpApi, '/rest/storage/svangerskapspenger', 'Feil ved sletting av mellomlagret data');
        } catch (error) {
            // Vi bryr oss ikke om feil her. Logges bare i backend
        }

        navigate('/');
    }, [navigate, setHarGodkjentVilkår, reset, svpApi]);

    return avbrytSøknadHandler;
};

export default useAvbrytSøknad;
