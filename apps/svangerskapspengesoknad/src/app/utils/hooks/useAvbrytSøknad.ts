import { useNavigate } from 'react-router-dom';
import { logAmplitudeEvent } from 'app/amplitude/amplitude';
import actionCreator from 'app/context/action/actionCreator';
import { useCallback } from 'react';
import { useSvangerskapspengerContext } from 'app/context/hooks/useSvangerskapspengerContext';

const useAvbrytSøknad = () => {
    const navigate = useNavigate();
    const { dispatch } = useSvangerskapspengerContext();

    const avbrytSøknadHandler = useCallback(() => {
        logAmplitudeEvent('applikasjon-hendelse', {
            app: 'svangerskapspengesoknad',
            team: 'foreldrepenger',
            hendelse: 'avbrutt',
        });

        dispatch(actionCreator.avbrytSøknad());
        navigate('/');
    }, [navigate, dispatch]);

    return avbrytSøknadHandler;
};

export default useAvbrytSøknad;
