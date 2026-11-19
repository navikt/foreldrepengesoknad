import { type MockScenario, fpgrunndataHandlers } from '@navikt/fp-utils-test/mock';

const urlPrefiks = import.meta.env.BASE_URL;

export const scenarioer = {
    standard: {
        beskrivelse: 'Viser forsiden til veiviseren for utbetaling.',
        kjennetegn: 'Denne veiviseren er for deg som ønsker å vite omtrent hvor mye foreldrepenger du kan få fra Nav.',
        handlers: fpgrunndataHandlers(urlPrefiks),
    },
} satisfies Record<string, MockScenario>;
