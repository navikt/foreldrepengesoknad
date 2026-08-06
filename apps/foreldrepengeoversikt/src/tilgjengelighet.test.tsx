import { composeStories } from '@storybook/react-vite';
import { screen } from '@testing-library/react';

import { forventIngenUuFeil } from '@navikt/fp-utils-test/a11y';

import * as beregningPageStories from './pages/beregning-page/BeregningPage.stories';
import * as bruktOpplysningerStories from './pages/BruktOpplysningerOmArbeidsforhold/BruktOpplysningerOmArbeidsforhold.stories';
import * as dokumenterEttersendingStories from './pages/dokumenter-page/EttersendingPage.stories';
import * as ettersendingStories from './pages/ettersending/EttersendingPage.stories';
import * as forsideStories from './pages/forside/Forside.stories';
import * as inntektsmeldingStories from './pages/inntektsmelding-page/InntektsmeldingPage.stories';
import * as minidialogPageStories from './pages/minidialog-page/MinidialogPage.stories';
import * as saksoversiktStories from './pages/saksoversikt/Saksoversikt.stories';

// Éin representativ variant per side. WCAG 2.1 AA er lovpålagt for nav.no, og statisk
// jsx-a11y-linting fangar berre ein liten del av krava – difor køyrer vi axe mot ferdig
// rendra sider. Fargekontrast blir berre målt i browser-modus (sjå forventIngenUuFeil).
// Stega blir køyrde med Story.run() slik at loaders (msw-handlarar) blir sette opp.
type KøyrbarStory = { run: () => Promise<void> };

const SIDER: Array<[string, KøyrbarStory]> = [
    ['Forside', composeStories(forsideStories).Default],
    ['Saksoversikt', composeStories(saksoversiktStories).Foreldrepenger],
    ['Beregning', composeStories(beregningPageStories).BeregningDirekteUtbetaling],
    ['Ettersending', composeStories(ettersendingStories).SkalIkkeFeileOpplasting],
    ['Dokumenter - ettersending', composeStories(dokumenterEttersendingStories).Default],
    ['Inntektsmelding', composeStories(inntektsmeldingStories).EnBortfaltNaturalytelse],
    ['Minidialog', composeStories(minidialogPageStories).Default],
    ['Brukt opplysninger om arbeidsforhold', composeStories(bruktOpplysningerStories).Default],
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
