import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { logAmplitudeEvent } from 'app/amplitude/amplitude';
import { useContextReset } from './SvpDataContext';

const useAvbrytSøknad = (setHarGodkjentVilkår: (harGodkjentVilkår: boolean) => void) => {
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

        // try {
        //     await Api.deleteMellomlagretSøknad(fødselsnr);
        // } catch (error) {
        //     // Vi bryr oss ikke om feil her. Logges bare i backend
        // }

        navigate('/');
    }, [navigate, setHarGodkjentVilkår, reset]);

    return avbrytSøknadHandler;
};

export default useAvbrytSøknad;
