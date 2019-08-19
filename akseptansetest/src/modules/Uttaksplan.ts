import * as moment from 'moment';
import { Selector } from 'testcafe';
import TestUtils from '../utils/testutils';

class Uttaksplan {
    openNyPeriodeForm: Selector;
    utsettEnPeriodeForm: Selector;
    fomInput: Selector;
    tomInput: Selector;
    aktivitetskravInput: Selector;
    leggTilPeriodeKnapp: Selector;
    lukkEndrePeriodeKnapp: Selector;

    constructor() {
        this.openNyPeriodeForm = Selector('button[data-name="openNyPeriodeForm"]');
        this.utsettEnPeriodeForm = Selector('.knapperad')
            .find('.knapp')
            .nth(0);
        this.leggTilPeriodeKnapp = Selector('button[data-name="leggTilPeriode"]');
        this.fomInput = Selector('input[name="fraDatoInput"]');
        this.tomInput = Selector('input[name="tilDatoInput"]');
        this.aktivitetskravInput = Selector('select[name="hvaSkalMorGjøre.spørsmål"]');
        this.lukkEndrePeriodeKnapp = Selector('button.endreperiodeForm__lukkPeriode');
    }

    async selectKvote(t: TestController, kvote: string) {
        await TestUtils.selectRadio(t, 'kvote', kvote);
    }

    async selectSamtidigUttak(t: TestController, samtidigUttak: string) {
        await TestUtils.selectRadio(t, 'samtidigUttak', samtidigUttak);
    }

    async selectGradering(t: TestController, gradering: string) {
        await TestUtils.selectRadio(t, 'ønskerDuGradertUttak', gradering);
    }

    async selectÅrsakTilUtsettelse(t: TestController, årsak: string) {
        await TestUtils.selectRadio(t, 'årsakTilUtsettelse', årsak);
    }

    async selectAkvititetskrav(t: TestController, aktivitet: string) {
        await TestUtils.selectDropdown(t, this.aktivitetskravInput, aktivitet);
    }

    async selectPeriodenGjelder(t: TestController, forelder: string) {
        await TestUtils.selectRadio(t, 'periodenGjelder', forelder);
    }

    async leggInnAntallUker(t: TestController, antallUker: number, startDato: Date = new Date()) {
        const førsteUttaksDato: Date = TestUtils.skipWeekend(startDato);
        const sisteUttaksDato: Date = TestUtils.rewindToBeforeWeekend(
            moment(førsteUttaksDato)
                .add(antallUker, 'weeks')
                .subtract(1, 'day')
                .toDate()
        );

        await this.skrivInnDatoer(t, førsteUttaksDato, sisteUttaksDato);
    }

    async leggTilUkerPåFar(t: TestController, antallUker: number, startDato: Date = new Date()) {
        const førsteUttaksDato: Date = TestUtils.skipWeekend(startDato);
        const sisteUttaksDato: Date = TestUtils.rewindToBeforeWeekend(
            moment(førsteUttaksDato)
                .add(antallUker, 'weeks')
                .subtract(1, 'day')
                .toDate()
        );

        await t.click(this.openNyPeriodeForm);
        await this.skrivInnDatoer(t, førsteUttaksDato, sisteUttaksDato);
        await this.selectPeriodenGjelder(t, 'farMedmor');
        await this.selectKvote(t, 'FEDREKVOTE');
        await this.selectSamtidigUttak(t, 'nei');
        await this.selectGradering(t, 'nei');
        await t.click(this.leggTilPeriodeKnapp);
    }

    async skrivInnDatoer(t: TestController, førsteUttaksdato: Date, sisteUttaksdato: Date) {
        await t
            .typeText(this.fomInput, TestUtils.dateToString(førsteUttaksdato))
            .pressKey('tab')
            .typeText(this.tomInput, TestUtils.dateToString(sisteUttaksdato))
            .pressKey('tab');
    }

    async leggTilPeriodeForFar(t: TestController) {
        const fødselsdato: Date = new Date();
        let førsteUttaksDato: Date = moment(fødselsdato)
            .add(2, 'months')
            .toDate();
        let sisteUttaksDato: Date = moment(førsteUttaksDato)
            .add(2, 'months')
            .toDate();

        førsteUttaksDato = TestUtils.skipWeekend(førsteUttaksDato);
        sisteUttaksDato = TestUtils.skipWeekend(sisteUttaksDato);

        await t.click(this.openNyPeriodeForm);
        await this.skrivInnDatoer(t, førsteUttaksDato, sisteUttaksDato);
        await this.selectPeriodenGjelder(t, 'farMedmor');
        await this.selectKvote(t, 'FEDREKVOTE');
        await this.selectSamtidigUttak(t, 'nei');
        await this.selectGradering(t, 'nei');
        await t.click(this.leggTilPeriodeKnapp);
    }

    /*
     * Obs! Tar ikke høyde for helligdager, så perioden kan bli mindre enn <antallUker>.
     */
    async leggInnFerie(t: TestController, førsteDagMedFerie: Date, antallUker: number) {
        const førsteDag: Date = TestUtils.skipWeekend(førsteDagMedFerie);
        let sisteDag: Date = moment(førsteDag)
            .add(antallUker, 'weeks')
            .toDate();

        await t.click(this.utsettEnPeriodeForm);
        await this.skrivInnDatoer(t, førsteDag, sisteDag);
        await this.selectÅrsakTilUtsettelse(t, 'ferie');
        await t.click(this.leggTilPeriodeKnapp);
    }
}

export default Uttaksplan;
