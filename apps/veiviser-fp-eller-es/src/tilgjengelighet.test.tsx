import { composeStories } from '@storybook/react-vite';
import { screen } from '@testing-library/react';

import { forventIngenUuFeil } from '@navikt/fp-utils-test/a11y';

import * as forsideStories from './pages/forside/FpEllerEsForside.stories';
import * as oppsummeringStories from './pages/oppsummering/OppsummeringFpEllerEsSide.stories';
import * as situasjonStories from './pages/situasjon/SituasjonSide.stories';

// Éin representativ variant per side. WCAG 2.1 AA er lovpålagt for nav.no, og statisk
// jsx-a11y-linting fangar berre ein liten del av krava – difor køyrer vi axe mot ferdig
// rendra sider. Fargekontrast blir berre målt i browser-modus (sjå forventIngenUuFeil).
// Stega blir køyrde med Story.run() slik at loaders (msw-handlarar) blir sette opp.
type KøyrbarStory = { run: () => Promise<void> };

const SIDER: Array<[string, KøyrbarStory]> = [
    ['Forside', composeStories(forsideStories).Default],
    ['Situasjon', composeStories(situasjonStories).Default],
    ['Oppsummering', composeStories(oppsummeringStories).MorHarTjentMerEnn200000OgHarRettTilFp],
];

describe('tilgjengelegheit', () => {
    it.each(SIDER)(
        '%s skal ikkje ha tilgjengelegheitsbrot',
        async (_navn, side) => {
            await side.run();

            // Vent til sida faktisk er rendra – nokre sider hentar data
            // før dei viser noko anna enn ein spinner.
            await screen.findAllByRole('heading', undefined, { timeout: 15000 });

            await forventIngenUuFeil();
        },
        30000,
    );
});
