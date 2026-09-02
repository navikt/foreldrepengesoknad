import { composeStories } from '@storybook/react-vite';
import { screen } from '@testing-library/react';

import { forventIngenUuFeil } from '@navikt/fp-utils-test/a11y';

import * as forsideStories from './pages/forside/Forside.stories';
import * as ikkeKvinneStories from './pages/ikke-kvinne/IkkeKvinne.stories';
import * as arbeidIUtlandetStories from './steps/arbeid-i-utlandet/ArbeidIUtlandetSteg.stories';
import * as arbeidsforholdOgInntektStories from './steps/arbeidsforhold-og-inntekt/ArbeidsforholdOgInntektSteg.stories';
import * as barnetStories from './steps/barnet/BarnetSteg.stories';
import * as egenNæringStories from './steps/egen-næring/EgenNæringSteg.stories';
import * as ferieStories from './steps/ferie/FerieSteg.stories';
import * as frilansStories from './steps/frilans/FrilansSteg.stories';
import * as oppsummeringStories from './steps/oppsummering/OppsummeringSteg.stories';
import * as perioderStories from './steps/perioder/PerioderSteg.stories';
import * as skjemaStories from './steps/skjema/SkjemaSteg.stories';
import * as tilretteleggingStories from './steps/tilrettelegging/TilretteleggingSteg.stories';
import * as senereUtenlandsoppholdStories from './steps/utenlandsopphold-senere/SenereUtenlandsoppholdSteg.stories';
import * as tidligereUtenlandsoppholdStories from './steps/utenlandsopphold-tidligere/TidligereUtenlandsoppholdSteg.stories';
import * as utenlandsoppholdStories from './steps/utenlandsopphold/UtenlandsoppholdSteg.stories';
import * as velgArbeidStories from './steps/velg-arbeidsforhold/VelgArbeidSteg.stories';

// Éin representativ variant per side. WCAG 2.1 AA er lovpålagt for nav.no, og statisk
// jsx-a11y-linting fangar berre ein liten del av krava – difor køyrer vi axe mot ferdig
// rendra sider. Fargekontrast blir berre målt i browser-modus (sjå forventIngenUuFeil).
// Stega blir køyrde med Story.run() slik at loaders (msw-handlarar) blir sette opp.
type KøyrbarStory = { run: () => Promise<void> };

const SIDER: Array<[string, KøyrbarStory]> = [
    ['Forside', composeStories(forsideStories).Default],
    ['Ikkje kvinne', composeStories(ikkeKvinneStories).Default],
    ['Barnet', composeStories(barnetStories).Default],
    ['Arbeidsforhold og inntekt', composeStories(arbeidsforholdOgInntektStories).Default],
    ['Velg arbeidsforhold', composeStories(velgArbeidStories).Default],
    ['Frilans', composeStories(frilansStories).Default],
    ['Egen næring', composeStories(egenNæringStories).Default],
    ['Arbeid i utlandet', composeStories(arbeidIUtlandetStories).Default],
    ['Tilrettelegging', composeStories(tilretteleggingStories).ForArbeidsforhold],
    ['Perioder', composeStories(perioderStories).Default],
    ['Ferie', composeStories(ferieStories).Default],
    ['Utenlandsopphold', composeStories(utenlandsoppholdStories).Default],
    ['Tidligere utenlandsopphold', composeStories(tidligereUtenlandsoppholdStories).Default],
    ['Senere utenlandsopphold', composeStories(senereUtenlandsoppholdStories).Default],
    ['Skjema', composeStories(skjemaStories).SkalIkkeFeileOpplasting],
    ['Oppsummering', composeStories(oppsummeringStories).Default],
];

describe('tilgjengelegheit', () => {
    it.each(SIDER)(
        '%s skal ikkje ha tilgjengelegheitsbrot',
        async (_navn, side) => {
            await side.run();

            // Vent til sida faktisk er rendra – nokre steg hentar data
            // før dei viser noko anna enn ein spinner.
            await screen.findAllByRole('heading', undefined, { timeout: 15_000 });

            await forventIngenUuFeil();
        },
        30_000,
    );
});
