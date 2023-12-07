import { logAmplitudeEvent } from 'app/amplitude/amplitude';

const useFortsettSøknadSenere = () => {
    const useFortsettSøknadSenere = () => {
        logAmplitudeEvent('applikasjon-hendelse', {
            app: 'foreldrepengesoknad',
            team: 'foreldrepenger',
            hendelse: 'fortsettSenere',
        });

        (window as any).location = 'https://nav.no';
    };

    return useFortsettSøknadSenere;
};

export default useFortsettSøknadSenere;
