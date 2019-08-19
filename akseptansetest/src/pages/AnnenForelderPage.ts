import TestUtils from '../utils/testutils';
import { Selector } from 'testcafe';
import { config } from '../../config';

export default class AnnenForelderPage {
    fornavnInput: Selector;
    etternavnInput: Selector;
    kanIkkOppgisCb: Selector;
    fødselsnummerInput: Selector;
    utenlandskFødselsnummerCb: Selector;
    landSelect: Selector;

    constructor() {
        this.fornavnInput = Selector('input[name="fornavn"]');
        this.etternavnInput = Selector('input[name="etternavn"]');
        this.kanIkkOppgisCb = Selector('input[name="annenForelderKanIkkeOppgis"]');
        this.fødselsnummerInput = Selector('input[name="fødselsnummer"]');
        this.utenlandskFødselsnummerCb = Selector('input[name="harUtenlandskFnr"]');
        this.landSelect = Selector('select[name="land"]');
    }

    async kanIkkeOppgi(t: TestController) {
        await t.click(this.kanIkkOppgisCb);
    }

    async enterMorsPersonalia(t: TestController) {
        await t
            .typeText(this.fornavnInput, 'Henriette')
            .typeText(this.etternavnInput, 'Ibsen')
            .typeText(this.fødselsnummerInput, config.fnr_annenForelderKvinne || '12107849597');
    }

    async bareFarMedmorHarRett(t: TestController) {
        await this.enterMorsPersonalia(t);
        await TestUtils.selectRadio(t, 'omsorgsfordeling', 'nei');
        await TestUtils.selectRadio(t, 'annenForelderRettPåForeldrepenger', 'nei');
        await TestUtils.selectRadio(t, 'erMorUfør', 'nei');
    }

    async farMedmorDeltOmsorg(t: TestController) {
        await this.enterMorsPersonalia(t);
        await TestUtils.selectRadio(t, 'omsorgsfordeling', 'nei');
        await TestUtils.selectRadio(t, 'annenForelderRettPåForeldrepenger', 'ja');
        await TestUtils.selectRadio(t, 'erAnnenForelderInformert', 'ja');
    }
}
