import { composeStories } from '@storybook/react-vite';
import { screen } from '@testing-library/react';

import { forventIngenUuFeil } from '@navikt/fp-utils-test/a11y';

import * as planleggerStories from './Planlegger.stories';
import * as arbeidssituasjonStories from './steps/arbeidssituasjon/ArbeidssituasjonSteg.stories';
import * as barnehageplassStories from './steps/barnehageplass/BarnehageplassSteg.stories';
import * as fordelingStories from './steps/fordeling/FordelingSteg.stories';
import * as hvemPlanleggerStories from './steps/hvem-planlegger/HvemPlanleggerSteg.stories';
import * as hvorLangPeriodeStories from './steps/hvor-lang-periode/HvorLangPeriodeSteg.stories';
import * as hvorMyeStories from './steps/hvor-mye/HvorMyeSteg.stories';
import * as omBarnetStories from './steps/om-barnet/OmBarnetSteg.stories';
import * as omPlanleggerenStories from './steps/om-planleggeren/OmPlanleggerenSteg.stories';
import * as oppsummeringStories from './steps/oppsummering/OppsummeringSteg.stories';
import * as hvaErMuligStories from './steps/planen-deres/hva-er-mulig/HvaErMulig.stories';
import * as planenDeresAdopsjonStories from './steps/planen-deres/PlanenDeresSteg_Adopsjon.stories';
import * as planenDeresFødselStories from './steps/planen-deres/PlanenDeresSteg_Fødsel.stories';
import * as uforutsetteEndringerStories from './steps/planen-deres/uforutsette-endringer/UforutsetteEndringer.stories';

// Éin representativ variant per side. WCAG 2.1 AA er lovpålagt for nav.no, og statisk
// jsx-a11y-linting fangar berre ein liten del av krava – difor køyrer vi axe mot ferdig
// rendra sider. Fargekontrast blir berre målt i browser-modus (sjå forventIngenUuFeil).
// Stega blir køyrde med Story.run() slik at loaders (msw-handlarar) blir sette opp.
type KøyrbarStory = { run: () => Promise<void> };

const SIDER: Array<[string, KøyrbarStory]> = [
    ['Planlegger (forside)', composeStories(planleggerStories).Default],
    ['Hvem planlegger', composeStories(hvemPlanleggerStories).Default],
    ['Om barnet', composeStories(omBarnetStories).FlereForsørgere],
    ['Arbeidssituasjon', composeStories(arbeidssituasjonStories).ArbeidssituasjonMorOgFar],
    ['Barnehageplass', composeStories(barnehageplassStories).FlereForsørgereBarnTerminDesemberStartAugustOmToÅr],
    ['Hvor lang periode', composeStories(hvorLangPeriodeStories).FlereForsørgereEttBarnKunMorHarRett],
    ['Hvor mye', composeStories(hvorMyeStories).FlereForsørgere],
    ['Fordeling', composeStories(fordelingStories).FlereForsørgereEttBarn],
    ['Planen deres - fødsel', composeStories(planenDeresFødselStories).MorOgFarBeggeHarRett],
    ['Planen deres - adopsjon', composeStories(planenDeresAdopsjonStories).MorOgFarBeggeHarRett],
    ['Hva er mulig', composeStories(hvaErMuligStories).FødselMorOgFarBeggeHarRett],
    ['Uforutsette endringer', composeStories(uforutsetteEndringerStories).FødselMorOgFarBeggeHarRett],
    ['Om planleggeren', composeStories(omPlanleggerenStories).Default],
    ['Oppsummering', composeStories(oppsummeringStories).FlereForsørgereHundreProsentTermin],
];

describe('tilgjengelegheit', () => {
    it.each(SIDER)(
        '%s skal ikkje ha tilgjengelegheitsbrot',
        async (_navn, side) => {
            await side.run();

            // Vent til sida faktisk er rendra – nokre steg hentar data
            // før dei viser noko anna enn ein spinner.
            await screen.findAllByRole('heading', undefined, { timeout: 15000 });

            await forventIngenUuFeil();
        },
        30000,
    );
});
