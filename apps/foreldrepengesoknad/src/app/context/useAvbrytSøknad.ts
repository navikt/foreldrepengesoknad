import { useNavigate } from 'react-router-dom';
import { logAmplitudeEvent } from 'app/amplitude/amplitude';
import Api from 'app/api/api';
import { useFpStateResetFn } from 'app/context/FpDataContext';

export const useAvbrytSøknad = (
    fødselsnr: string,
    setErEndringssøknad: (erEndringssøknad: boolean) => void,
    setHarGodkjentVilkår: (harGodkjentVilkår: boolean) => void,
    setSøknadGjelderNyttBarn: (søknadGjelderNyttBarn: boolean) => void,
    lagretErEndringssøknad?: boolean,
    lagretHarGodkjentVilkår?: boolean,
    lagretSøknadGjelderNyttBarn?: boolean,
) => {
    const navigate = useNavigate();
    const reset = useFpStateResetFn();

    const avbrytSøknadHandler = () => {
        logAmplitudeEvent('applikasjon-hendelse', {
            app: 'foreldrepengesoknad',
            team: 'foreldrepenger',
            hendelse: 'avbrutt',
        });

        reset();
        setErEndringssøknad(lagretErEndringssøknad || false);
        setHarGodkjentVilkår(lagretHarGodkjentVilkår || false);
        setSøknadGjelderNyttBarn(lagretSøknadGjelderNyttBarn || false);

        Api.deleteStoredAppState(fødselsnr);

        navigate('/');
    };

    return avbrytSøknadHandler;
};
