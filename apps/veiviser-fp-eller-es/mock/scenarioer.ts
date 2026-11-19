import type { MockScenario } from '@navikt/fp-utils-test/mock';

export const scenarioer = {
    standard: {
        beskrivelse: 'Viser forsiden for valg av foreldrepenger eller engangsstønad.',
        kjennetegn:
            'Denne veiviseren er for deg som ønsker å vite om du har rett til foreldrepenger og/eller engangsstønad.',
        handlers: [],
    },
} satisfies Record<string, MockScenario>;
