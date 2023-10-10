import amplitude from 'amplitude-js';

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

export const logAmplitudeEvent = (eventName: string, eventData?: any, logToConsoleOnly = false) => {
    if (logToConsoleOnly) {
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
