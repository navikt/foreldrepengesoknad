import { composeStories } from '@storybook/react-vite';
import { screen } from '@testing-library/react';

import { forventIngenUuFeil } from '@navikt/fp-utils-test/a11y';

import * as dokumentasjonStories from './steg/dokumentasjon/DokumentasjonSteg.stories';
import * as omBarnetStories from './steg/om-barnet/OmBarnetSteg.stories';
import * as oppsummeringStories from './steg/oppsummering/OppsummeringSteg.stories';
import * as søkersituasjonStories from './steg/sokersituasjon/SøkersituasjonSteg.stories';
import * as senereUtenlandsoppholdStories from './steg/utenlandsopphold-senere/SenereUtenlandsoppholdSteg.stories';
import * as tidligereUtenlandsoppholdStories from './steg/utenlandsopphold-tidligere/TidligereUtenlandsoppholdSteg.stories';
import * as utenlandsoppholdStories from './steg/utenlandsopphold/UtenlandsoppholdSteg.stories';
import * as velkommenStories from './velkommen/Velkommen.stories';

// Éin representativ variant per side. WCAG 2.1 AA er lovpålagt for nav.no, og statisk
// jsx-a11y-linting fangar berre ein liten del av krava – difor køyrer vi axe mot ferdig
// rendra sider. Fargekontrast blir berre målt i browser-modus (sjå forventIngenUuFeil).
// Stega blir køyrde med Story.run() slik at loaders (msw-handlarar) blir sette opp.
type KøyrbarStory = { run: () => Promise<void> };

const SIDER: Array<[string, KøyrbarStory]> = [
    ['Velkommen', composeStories(velkommenStories).Default],
    ['Søkersituasjon', composeStories(søkersituasjonStories).Default],
    ['Om barnet', composeStories(omBarnetStories).VisSideForFodsel],
    ['Utenlandsopphold', composeStories(utenlandsoppholdStories).Default],
    ['Tidligere utenlandsopphold', composeStories(tidligereUtenlandsoppholdStories).Default],
    ['Senere utenlandsopphold', composeStories(senereUtenlandsoppholdStories).Default],
    ['Dokumentasjon', composeStories(dokumentasjonStories).Terminbekreftelse],
    ['Oppsummering', composeStories(oppsummeringStories).BarnetErFodt],
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
