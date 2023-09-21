import { logAmplitudeEvent } from 'app/amplitude/amplitude';
import { useCallback } from 'react';

const useFortsettSøknadSenere = () => {
    const useFortsettSøknadSenere = useCallback(() => {
        logAmplitudeEvent('applikasjon-hendelse', {
            app: 'foreldrepengesoknad',
            team: 'foreldrepenger',
            hendelse: 'fortsettSenere',
        });

        (window as any).location = 'https://nav.no';
    }, []);

    return useFortsettSøknadSenere;
};

export default useFortsettSøknadSenere;
