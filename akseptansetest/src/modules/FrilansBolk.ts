import * as moment from 'moment';
import { Selector } from 'testcafe';
import TestUtils from '../utils/testutils';
import FrilandsOppdragDialog from './FrilansDialog';

class FrilansBolk {
    bolk: Selector;
    startetDato: Selector;
    leggTilOppdragBt: Selector;
    oppdrag: Selector;

    constructor() {
        this.startetDato = Selector('input[name="frilansStartDato"]');
        this.leggTilOppdragBt = Selector('button[data-name="leggTilFrilansOppdrag"]');
        this.bolk = Selector('[data-name="frilansOppdragBolk"]');
        this.oppdrag = Selector('[data-name="frilansOppdragBolk"] .interactiveListElement');
    }

    private async leggTilOppdrag(t: TestController) {
        const fom = moment()
            .subtract(2, 'months')
            .toDate();
        const tom = moment(fom)
            .add(1, 'months')
            .toDate();
        const frilansDialog = new FrilandsOppdragDialog();
        await t.click(this.leggTilOppdragBt);
        await frilansDialog.fyllUt(t, 'NAV', fom, tom);
    }

    private async oppdaterOppdrag(t: TestController) {
        const fom = moment()
            .subtract(5, 'weeks')
            .toDate();
        const tom = moment(fom)
            .add(1, 'weeks')
            .toDate();
        const frilansDialog = new FrilandsOppdragDialog();
        await t.click(this.bolk.find('.interactiveListElement__editButton'));
        await frilansDialog.fyllUt(t, 'Nuupo', fom, tom);
    }

    private async slettOppdrag(t: TestController) {
        await t.click(this.bolk.find('.interactiveListElement__deleteButton').nth(0));
    }

    private async fjernAlleOppdrag(t: TestController, list: Selector) {
        let opphold = await list.find('.interactiveListElement');
        let cnt = 0;
        while ((await opphold.count) > 0 && cnt < 5) {
            await t.click(Selector('button.interactiveListElement__deleteButton'));
            opphold = await list.find('.interactiveListElement');
        }
    }

    async fyllUtHarJobbetFrilans(t: TestController) {
        await TestUtils.selectRadio(t, 'harJobbetSomFrilansSiste10Mnd', 'ja');
        await TestUtils.setDato(
            t,
            this.startetDato,
            moment()
                .subtract(2, 'months')
                .toDate()
        );
        await TestUtils.selectRadio(t, 'jobberFremdelesSomFrilans', 'ja');
        await TestUtils.selectRadio(t, 'harJobbetForNærVennEllerFamilieSiste12Mnd', 'ja');

        await this.fjernAlleOppdrag(t, this.bolk);
        await t.expect(this.oppdrag.count).eql(0);

        await this.leggTilOppdrag(t);
        await t.expect(this.oppdrag.count).eql(1);

        await this.oppdaterOppdrag(t);
        await t.expect(this.oppdrag.count).eql(1);

        await this.slettOppdrag(t);
        await t.expect(this.oppdrag.count).eql(0);

        await this.leggTilOppdrag(t);
        await t.expect(this.oppdrag.count).eql(1);

        await TestUtils.selectRadio(t, 'driverFosterhjem', 'ja');
    }
}

export default FrilansBolk;
