import { useNavigate } from 'react-router-dom';
import { logAmplitudeEvent } from 'app/amplitude/amplitude';
import Api from 'app/api/api';
import { useContextReset } from 'app/context/FpDataContext';
import { useCallback } from 'react';

export const useAvbrytSøknad = (
    fødselsnr: string,
    setErEndringssøknad: (erEndringssøknad: boolean) => void,
    setHarGodkjentVilkår: (harGodkjentVilkår: boolean) => void,
    setSøknadGjelderNyttBarn: (søknadGjelderNyttBarn?: boolean) => void,
) => {
    const navigate = useNavigate();
    const reset = useContextReset();

    const avbrytSøknadHandler = useCallback(async () => {
        logAmplitudeEvent('applikasjon-hendelse', {
            app: 'foreldrepengesoknad',
            team: 'foreldrepenger',
            hendelse: 'avbrutt',
        });

        reset();

        setErEndringssøknad(false);
        setHarGodkjentVilkår(false);
        setSøknadGjelderNyttBarn(undefined);

        try {
            await Api.deleteMellomlagretSøknad(fødselsnr);
        } catch (error) {
            // Vi bryr oss ikke om feil her. Logges bare i backend
        }

        navigate('/');
    }, [fødselsnr, navigate, reset, setErEndringssøknad, setHarGodkjentVilkår, setSøknadGjelderNyttBarn]);

    return avbrytSøknadHandler;
};
