import amplitude from 'amplitude-js';

export enum PageKeys {
    Velkommen = 'velkommen',
    Situasjon = 'situasjon',
    OmBarnetFødsel = 'om-barnet-fødsel',
    OmBarnetAdopsjon = 'om-barnet-adopsjon',
    AnnenForelder = 'annen-forelder',
    ManglendeVedlegg = 'manglende-vedlegg',
    UttaksplanSkjema = 'uttaksplan-skjema',
    Uttaksplan = 'uttaksplan',
    AndreInntekter = 'andre-inntekter',
    Utenlandsopphold = 'utenlandsopphold',
    Oppsummering = 'oppsummering',
    SøknadSendt = 'søknad-sendt',
    Umyndig = 'umyndig',
}

export const initAmplitude = () => {
    if (amplitude) {
        amplitude.getInstance().init('default', '', {
            apiEndpoint: 'amplitude.nav.no/collect-auto',
            saveEvents: false,
            includeUtm: true,
            includeReferrer: true,
            platform: window.location.toString(),
            // eslint-disable-next-line no-console
            onError: () => console.log('Amplitude klarte ikke å starte opp'),
        });
    }
};

export const logAmplitudeEvent = (eventName: string, eventData?: any, logToConsoleOnly = true) => {
    if (logToConsoleOnly) {
        if (process.env.NODE_ENV !== 'test') {
            // eslint-disable-next-line no-console
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
            // eslint-disable-next-line no-console
            console.error(error);
        }
    });
};
