import amplitude from 'amplitude-js';

const MAX_AWAIT_TIME = 500;

export const initAmplitude = () => {
    if (amplitude) {
        amplitude.getInstance().init('default', '', {
            apiEndpoint: 'amplitude.nav.no/collect-auto',
            saveEvents: false,
            includeUtm: true,
            includeReferrer: true,
            platform: window.location.toString(),
        });
    }
};

export enum AmplitudeEvents {
    'besøk' = 'besøk',
    'applikasjonStartet' = 'applikasjon-startet',
    'søknadStartet' = 'skjema startet',
    'søknadSendt' = 'skjema fullført',
    'søknadFeilet' = 'skjemainnsending feilet',
    'applikasjonInfo' = 'applikasjon-info',
    'applikasjonHendelse' = 'applikasjon-hendelse',
    'apiError' = 'api-error',
}

type EventProperties = {
    [key: string]: any;
};

export const logEvent = async (eventName: string, eventProperties?: EventProperties) => {
    const instance = amplitude.getInstance();
    if (instance) {
        const timeoutPromise = new Promise((resolve) => setTimeout(() => resolve(null), MAX_AWAIT_TIME));
        const logPromise = new Promise((resolve) => {
            const eventProps = {
                ...eventProperties,
                app: 'foreldrepengeoversikt',
                applikasjon: 'foreldrepengeoversikt',
            };
            instance.logEvent(eventName, eventProps, (response: any) => {
                resolve(response);
            });
        });
        return Promise.race([timeoutPromise, logPromise]);
    }
};
