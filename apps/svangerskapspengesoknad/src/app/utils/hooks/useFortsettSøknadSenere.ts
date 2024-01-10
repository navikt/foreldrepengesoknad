import { logAmplitudeEvent } from '@navikt/fp-metrics';

const useFortsettSøknadSenere = () => {
    const useFortsettSøknadSenere = () => {
        logAmplitudeEvent('applikasjon-hendelse', {
            app: 'svangerskapspenger',
            team: 'foreldrepenger',
            hendelse: 'fortsettSenere',
        });

        (window as any).location = 'https://nav.no';
    };

    return useFortsettSøknadSenere;
};

export default useFortsettSøknadSenere;
