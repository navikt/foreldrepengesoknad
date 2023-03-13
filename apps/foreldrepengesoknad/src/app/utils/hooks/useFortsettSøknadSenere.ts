import { logAmplitudeEvent } from 'app/amplitude/amplitude';
import { useCallback } from 'react';
import Environment from 'app/Environment';

const useFortsettSøknadSenere = () => {
    const useFortsettSøknadSenere = useCallback(() => {
        logAmplitudeEvent('applikasjon-hendelse', {
            app: 'foreldrepengesoknad',
            team: 'foreldrepenger',
            hendelse: 'fortsettSenere',
        });

        (window as any).location = Environment.FAMILIE;
    }, []);

    return useFortsettSøknadSenere;
};

export default useFortsettSøknadSenere;
