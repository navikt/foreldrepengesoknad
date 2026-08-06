import { composeStories } from '@storybook/react-vite';
import { screen } from '@testing-library/react';

import { forventIngenUuFeil } from '@navikt/fp-utils-test/a11y';

import * as andreInntektskilderStories from './steps/andre-inntektskilder/AndreInntektskilderSteg.stories';
import * as annenForelderStories from './steps/annen-forelder/AnnenForelderSteg.stories';
import * as arbeidsforholdOgInntektStories from './steps/arbeidsforhold-og-inntekt/ArbeidsforholdOgInntektSteg.stories';
import * as egenNæringStories from './steps/egen-næring/EgenNæringSteg.stories';
import * as fordelingStories from './steps/fordeling/FordelingSteg.stories';
import * as frilansStories from './steps/frilans/FrilansSteg.stories';
import * as manglendeVedleggStories from './steps/manglende-vedlegg/ManglendeVedlegg.stories';
import * as omBarnetStories from './steps/om-barnet/OmBarnetSteg.stories';
import * as oppsummeringStories from './steps/oppsummering/OppsummeringSteg.stories';
import * as periodeMedForeldrepengerStories from './steps/periode-med-foreldrepenger/PeriodeMedForeldrepengerSteg.stories';
import * as søkersituasjonStories from './steps/søkersituasjon/SøkersituasjonSteg.stories';
import * as senereUtenlandsoppholdStories from './steps/utenlandsopphold-senere/SenereUtenlandsoppholdSteg.stories';
import * as tidligereUtenlandsoppholdStories from './steps/utenlandsopphold-tidligere/TidligereUtenlandsoppholdSteg.stories';
import * as utenlandsoppholdStories from './steps/utenlandsopphold/UtenlandsoppholdSteg.stories';
import * as uttaksplanStories from './steps/uttaksplan/UttaksplanSteg.stories';
import * as forsideStories from './pages/forside/Forside.stories';

// Éin representativ variant per side. WCAG 2.1 AA er lovpålagt for nav.no, og statisk
// jsx-a11y-linting fangar berre ein liten del av krava – difor køyrer vi axe mot ferdig
// rendra sider. Fargekontrast blir berre målt i browser-modus (sjå forventIngenUuFeil).
// Stega blir køyrde med Story.run() slik at loaders (msw-handlarar) blir sette opp.
type KøyrbarStory = { run: () => Promise<void> };

const SIDER: Array<[string, KøyrbarStory]> = [
    ['Forside', composeStories(forsideStories).Default],
    ['Søkersituasjon', composeStories(søkersituasjonStories).Mor],
    ['Om barnet', composeStories(omBarnetStories).MorFødsel],
    ['Annen forelder', composeStories(annenForelderStories).MorUfødtBarn],
    ['Periode med foreldrepenger', composeStories(periodeMedForeldrepengerStories).MorFødselDeltUttak],
    ['Fordeling', composeStories(fordelingStories).MorDeltUttakEttBarnTermin],
    ['Uttaksplan', composeStories(uttaksplanStories).FødselMorOgFarBeggeHarRett],
    ['Manglende vedlegg', composeStories(manglendeVedleggStories).Termindatodokumentasjon],
    ['Utenlandsopphold', composeStories(utenlandsoppholdStories).Default],
    ['Tidligere utenlandsopphold', composeStories(tidligereUtenlandsoppholdStories).Default],
    ['Senere utenlandsopphold', composeStories(senereUtenlandsoppholdStories).Default],
    ['Arbeidsforhold og inntekt', composeStories(arbeidsforholdOgInntektStories).Default],
    ['Frilans', composeStories(frilansStories).Default],
    ['Egen næring', composeStories(egenNæringStories).Default],
    ['Andre inntektskilder', composeStories(andreInntektskilderStories).Default],
    ['Oppsummering', composeStories(oppsummeringStories).Default],
];

describe('tilgjengelegheit', () => {
    it.each(SIDER)(
        '%s skal ikkje ha tilgjengelegheitsbrot',
        async (_navn, side) => {
            await side.run();

            // Vent til sida faktisk er rendra – nokre steg hentar data (t.d. stønadskontoar)
            // før dei viser noko anna enn ein spinner.
            await screen.findAllByRole('heading', undefined, { timeout: 15000 });

            await forventIngenUuFeil();
        },
        30000,
    );
});
