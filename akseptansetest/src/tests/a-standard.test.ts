import * as moment from 'moment';

import TestUtils from '../utils/testutils';
import InngangPage from '../pages/InngangPage';
import VelkommenPage from '../pages/VelkommenPage';
import RelasjonTilBarnPage from '../pages/RelasjonTilBarnPage';
import AnnenForelderPage from '../pages/AnnenForelderPage';
import UttaksplanSkjemaPage from '../pages/UttaksplanSkjemaPage';
import UttaksplanPage from '../pages/UttaksplanPage';
import UtenlandsoppholdPage from '../pages/UtenlandsoppholdPage';
import ArbeidsforholdOgInntektPage from '../pages/ArbeidsforholdOgInntekstPage';
import ManglendeVedleggPage from '../pages/ManglendeVedleggPage';
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
const manglendeVedleggPage = new ManglendeVedleggPage();
const oppsummeringPage = new OppsummeringPage();

fixture(`Standardsøknader`);

test.before(async (t) => TestUtils.setParent(t, config.fnr_default_mor))('Standardmor', async (t) => {
    await TestUtils.startAndResetSøknad(t, 0);
    await velkommenPage.startFørstegangssøknad(t);
    await inngangPage.fødselMor(t);
    await TestUtils.gåVidere(t);
    await relasjonTilBarnPage.ufødtBarn(t);
    await TestUtils.gåVidere(t);
    await annenForelderPage.farMedmorDeltOmsorg(t);
    await TestUtils.gåVidere(t);
    await uttaksplanSkjemaPage.standard(t);
    await uttaksplanSkjemaPage.velgAntallUkerFelles(t, 16);
    await TestUtils.gåVidere(t);
    await TestUtils.gåVidere(t);
    await utenlandsoppholdPage.ingenUtenlandsopphold(t);
    await TestUtils.gåVidere(t);
    await arbeidOgInntektPage.standard(t);
    await TestUtils.gåVidere(t);
    await oppsummeringPage.aksepterVilkår(t);
    await TestUtils.gåVidere(t);
    await TestUtils.ventPåKvittering(t);
});

test.before(async (t) => TestUtils.setParent(t, config.fnr_default_far))('Standardfar', async (t) => {
    const startDato = moment()
        .add(6, 'weeks')
        .toDate();

    await TestUtils.startAndResetSøknad(t, 0);
    await velkommenPage.startFørstegangssøknad(t);
    await inngangPage.fødselFar(t);
    await TestUtils.gåVidere(t);
    await relasjonTilBarnPage.fødtBarn(t);
    await TestUtils.gåVidere(t);
    await annenForelderPage.farMedmorDeltOmsorg(t);
    await TestUtils.gåVidere(t);
    await uttaksplanSkjemaPage.standard(t);
    await TestUtils.gåVidere(t);
    await uttaksplanPage.uttaksplan.leggTilUkerPåFar(t, 15, startDato);
    await TestUtils.gåVidere(t);
    await utenlandsoppholdPage.ingenUtenlandsopphold(t);
    await TestUtils.gåVidere(t);
    await arbeidOgInntektPage.standard(t);
    await TestUtils.gåVidere(t);
    await oppsummeringPage.aksepterVilkår(t);
    await TestUtils.gåVidere(t);
    await TestUtils.ventPåKvittering(t);
});

test.before(async (t) => TestUtils.setParent(t, config.fnr_default_far))('Far og studerende mor', async (t) => {
    const førsteUttaksdato = moment()
        .add(6, 'weeks')
        .toDate();

    await TestUtils.startAndResetSøknad(t, 0);
    await velkommenPage.startFørstegangssøknad(t);
    await inngangPage.fødselFar(t);
    await TestUtils.gåVidere(t);
    await relasjonTilBarnPage.fødtBarn(t);
    await TestUtils.gåVidere(t);
    await annenForelderPage.bareFarMedmorHarRett(t);
    await TestUtils.gåVidere(t);
    await uttaksplanSkjemaPage.standard(t);
    await TestUtils.gåVidere(t);
    await t.click(uttaksplanPage.uttaksplan.openNyPeriodeForm);
    await uttaksplanPage.uttaksplan.leggInnAntallUker(t, 20, førsteUttaksdato);
    await uttaksplanPage.uttaksplan.selectAkvititetskrav(t, 'UTDANNING');
    await uttaksplanPage.uttaksplan.selectGradering(t, 'nei');
    await t.click(uttaksplanPage.uttaksplan.leggTilPeriodeKnapp);
    await TestUtils.gåVidere(t);
    await utenlandsoppholdPage.ingenUtenlandsopphold(t);
    await TestUtils.gåVidere(t);
    await arbeidOgInntektPage.standard(t);
    await TestUtils.gåVidere(t);
    await manglendeVedleggPage.uploadVedlegg(t);
    await TestUtils.gåVidere(t);
    await oppsummeringPage.aksepterVilkår(t);
    await TestUtils.gåVidere(t);
    await TestUtils.ventPåKvittering(t);
});

test.before(async (t) => TestUtils.setParent(t, config.fnr_default_mor))('Alenemor med tre uker ferie', async (t) => {
    const terminOmFireUker = moment()
        .add(4, 'weeks')
        .toDate();

    const treUkerFørTermin = moment()
        .add(1, 'week')
        .toDate();

    const førsteDagMedFerie = moment(terminOmFireUker)
        .add(6, 'weeks')
        .toDate();

    await TestUtils.startAndResetSøknad(t, 0);
    await velkommenPage.startFørstegangssøknad(t);
    await inngangPage.fødselMor(t);
    await TestUtils.gåVidere(t);
    await relasjonTilBarnPage.ufødtBarn(t, terminOmFireUker);
    await TestUtils.gåVidere(t);
    await annenForelderPage.kanIkkeOppgi(t);
    await TestUtils.gåVidere(t);
    await uttaksplanSkjemaPage.standard(t);
    await uttaksplanSkjemaPage.velgPeriodestart(t, treUkerFørTermin);
    await TestUtils.gåVidere(t);
    await uttaksplanPage.uttaksplan.leggInnFerie(t, førsteDagMedFerie, 3);
    await TestUtils.gåVidere(t);
    await utenlandsoppholdPage.ingenUtenlandsopphold(t);
    await TestUtils.gåVidere(t);
    await arbeidOgInntektPage.standard(t);
    await TestUtils.gåVidere(t);
    await oppsummeringPage.aksepterVilkår(t);
    await TestUtils.gåVidere(t);
    await TestUtils.ventPåKvittering(t);
});
