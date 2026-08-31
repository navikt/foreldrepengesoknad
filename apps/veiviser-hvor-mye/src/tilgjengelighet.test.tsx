import { composeStories } from '@storybook/react-vite';
import { screen } from '@testing-library/react';

import { forventIngenUuFeil } from '@navikt/fp-utils-test/a11y';

import * as arbeidssituasjonStories from './pages/arbeidssituasjon/ArbeidssituasjonSide.stories';
import * as forsideStories from './pages/forside/HvorMyeForside.stories';
import * as oppsummeringStories from './pages/oppsummering/OppsummeringSide.stories';

// Éin representativ variant per side. WCAG 2.1 AA er lovpålagt for nav.no, og statisk
// jsx-a11y-linting fangar berre ein liten del av krava – difor køyrer vi axe mot ferdig
// rendra sider. Fargekontrast blir berre målt i browser-modus (sjå forventIngenUuFeil).
// Stega blir køyrde med Story.run() slik at loaders (msw-handlarar) blir sette opp.
type KøyrbarStory = { run: () => Promise<void> };

const SIDER: Array<[string, KøyrbarStory]> = [
    ['Forside', composeStories(forsideStories).Default],
    ['Arbeidssituasjon', composeStories(arbeidssituasjonStories).Default],
    ['Oppsummering', composeStories(oppsummeringStories).ArbeidstakerMed20000Imåneden],
];

describe('tilgjengelegheit', () => {
    it.each(SIDER)(
        '%s skal ikkje ha tilgjengelegheitsbrot',
        async (_navn, side) => {
            await side.run();

            // Vent til sida faktisk er rendra – nokre sider hentar data
            // før dei viser noko anna enn ein spinner.
            await screen.findAllByRole('heading', undefined, { timeout: 15_000 });

            await forventIngenUuFeil();
        },
        30_000,
    );
});
