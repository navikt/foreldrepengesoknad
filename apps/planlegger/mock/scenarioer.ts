import { type MockScenario, fpgrunndataHandlers } from '@navikt/fp-utils-test/mock';

const urlPrefiks = import.meta.env.BASE_URL;

export const scenarioer = {
    standard: {
        beskrivelse: 'Viser planleggerens forside.',
        kjennetegn: 'Planleggeren er både for de som er i permisjon',
        handlers: fpgrunndataHandlers(urlPrefiks),
    },
} satisfies Record<string, MockScenario>;
