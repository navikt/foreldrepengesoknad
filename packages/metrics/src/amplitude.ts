import amplitude from 'amplitude-js';

export const initAmplitude = () => {
    if (amplitude) {
        amplitude.getInstance().init('default', '', {
            apiEndpoint: 'amplitude.nav.no/collect-auto',
            saveEvents: false,
            includeUtm: true,
            includeReferrer: true,
            platform: window.location.toString(),
            onError: () => console.log('Amplitude klarte ikke å starte opp'),
        });
    }
};

export const logAmplitudeEvent = (eventName: string, eventData?: any, logToConsoleOnly = false) => {
    if (logToConsoleOnly) {
        if (process.env.NODE_ENV !== 'test') {
            console.log({ eventName, eventData });
        }
        return;
    }

    setTimeout(() => {
        try {
            if (amplitude) {
                amplitude.getInstance().logEvent(eventName, eventData);
            }
        } catch (error) {
            // tslint:disable-next-line
            console.error(error);
        }
    });
};
