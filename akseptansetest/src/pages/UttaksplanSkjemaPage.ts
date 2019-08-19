import TestUtils from '../utils/testutils';
import { Selector } from 'testcafe';
import { config } from '../../config';

export default class UttaksplanSkjemaPage {
    permisjonStartdatoInput: Selector;
    skalIkkeHaUttakCb: Selector;
    fellesperiodeRange: Selector;

    constructor() {
        this.permisjonStartdatoInput = Selector('#permisjonStartdato');
        this.skalIkkeHaUttakCb = Selector('input[name="skalIkkeHaUttakFørTermin"]');
        this.fellesperiodeRange = Selector('.rangeInput');
    }

    async standard(t: TestController) {
        await TestUtils.selectRadio(t, 'dekningsgrad', '100');
    }

    async velgAntallUkerFelles(t: TestController, antallUker: number) {
        await TestUtils.selectRangeValue(t, this.fellesperiodeRange, antallUker);
    }

    async velgPeriodestart(t: TestController, periodestart: Date) {
        const førsteArbeidsdagEtterStart = TestUtils.skipWeekend(periodestart);
        await TestUtils.setDato(t, this.permisjonStartdatoInput, førsteArbeidsdagEtterStart);
    }
}
