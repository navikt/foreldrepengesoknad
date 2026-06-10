import { getWebInstrumentations, initializeFaro } from '@grafana/faro-web-sdk';

type InitFaroOptions = {
    app: {
        /** Må matche `metadata.name` i naiserator.yaml. */
        name: string;
        /** Må matche `metadata.namespace` i naiserator.yaml. */
        namespace: string;
        /** Brukes til å sammenligne metrikker på tvers av deploys. */
        version?: string;
    };
};

/**
 * Initialiserer Grafana Faro for frontend-observability i NAIS.
 * Se https://docs.nais.io/observability/frontend/how-to/setup-faro/
 */
export const initFaro = ({ app }: InitFaroOptions) => {
    if (import.meta.env.MODE === 'development') {
        return;
    }

    initializeFaro({
        url: 'https://telemetry.nav.no/collect',
        paused: globalThis.location.hostname === 'localhost',
        app,
        instrumentations: [...getWebInstrumentations()],
    });
};
