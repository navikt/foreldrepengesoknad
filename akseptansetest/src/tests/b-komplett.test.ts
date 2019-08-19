import TestUtils from '../utils/testutils';
import InngangPage from '../pages/InngangPage';
import VelkommenPage from '../pages/VelkommenPage';
import RelasjonTilBarnPage from '../pages/RelasjonTilBarnPage';
import AnnenForelderPage from '../pages/AnnenForelderPage';
import UttaksplanSkjemaPage from '../pages/UttaksplanSkjemaPage';
import UttaksplanPage from '../pages/UttaksplanPage';
import UtenlandsoppholdPage from '../pages/UtenlandsoppholdPage';
import ArbeidsforholdOgInntektPage from '../pages/ArbeidsforholdOgInntekstPage';
import OppsummeringPage from '../pages/OppsummeringPage';

import { config } from '../../config';

const inngangPage = new InngangPage();
const velkommenPage = new VelkommenPage();
const relasjonTilBarnPage = new RelasjonTilBarnPage();
const annenForelderPage = new AnnenForelderPage();
const uttaksplanSkjemaPage = new UttaksplanSkjemaPage();
const uttaksplanPage = new UttaksplanPage();
const utenlandsoppholdPage = new UtenlandsoppholdPage();
const arbeidOgInntektPage = new ArbeidsforholdOgInntektPage();
const oppsummeringPage = new OppsummeringPage();

fixture(`Komplette søknader`);

test.before(async (t) => {
    return TestUtils.setParent(t, config.fnr_default_mor);
})('Komplett førstegangssøknad fødsel mor', async (t) => {
    await TestUtils.startAndResetSøknad(t, 0);
    await velkommenPage.startFørstegangssøknad(t);
    await inngangPage.fødselMor(t);
    await TestUtils.gåVidere(t);
    await relasjonTilBarnPage.fødtBarn(t);
    await TestUtils.gåVidere(t);
    await annenForelderPage.farMedmorDeltOmsorg(t);
    await TestUtils.gåVidere(t);
    await uttaksplanSkjemaPage.standard(t);
    await TestUtils.gåVidere(t);
    await uttaksplanPage.standard(t);
    await TestUtils.gåVidere(t);
    await utenlandsoppholdPage.medUtenlandsopphold(t);
    await TestUtils.gåVidere(t);
    await arbeidOgInntektPage.standard(t);
    await arbeidOgInntektPage.fyllUtFrilans(t);
    await arbeidOgInntektPage.fyllUtSelvstendigNæringsdrivende(t);
    await arbeidOgInntektPage.fyllUtAnnenInntektJobbIUtlandet(t);
    await TestUtils.gåVidere(t);
    await oppsummeringPage.aksepterVilkår(t);
    await TestUtils.gåVidere(t);
    await TestUtils.ventPåKvittering(t);
});

// test.before(async (t) => TestUtils.setParent(t, config.fnr_default_farmedmor))(
//     'Komplett førstegangssøknad fødsel far',
//     async (t) => {
//         await TestUtils.startAndResetSøknad(t, 0);
//         await velkommenPage.startFørstegangssøknad(t);
//         await inngangPage.fødselFar(t);
//         await TestUtils.gåVidere(t);
//         await relasjonTilBarnPage.fødtBarn(t);
//         await TestUtils.gåVidere(t);
//         await annenForelderPage.farMedmorDeltOmsorg(t);
//         await TestUtils.gåVidere(t);
//         await uttaksplanSkjemaPage.standard(t);
//         await TestUtils.gåVidere(t);
//         await uttaksplanPage.standard(t);
//         await uttaksplanPage.fyllUtFar(t);
//         await TestUtils.gåVidere(t);
//         await utenlandsoppholdPage.medUtenlandsopphold(t);
//         await TestUtils.gåVidere(t);
//         await arbeidOgInntektPage.standard(t);
//         await arbeidOgInntektPage.fyllUtFrilans(t);
//         await arbeidOgInntektPage.fyllUtSelvstendigNæringsdrivende(t);
//         await arbeidOgInntektPage.fyllUtAnnenInntektJobbIUtlandet(t);
//         await TestUtils.gåVidere(t);
//         await oppsummeringPage.aksepterVilkår(t);
//         await TestUtils.gåVidere(t);
//         await TestUtils.ventPåKvittering(t);
//     }
// );
