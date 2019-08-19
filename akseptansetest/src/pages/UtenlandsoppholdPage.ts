import { Selector } from 'testcafe';
import TestUtils from '../utils/testutils';
import UtenlandsoppholdModal from '../modules/UtenlandsoppholdModal';
import * as moment from 'moment';

export default class UtenlandsoppholdPage {
    tidligereOpphold: Selector;
    tidligereOppholdList: Selector;
    senereOpphold: Selector;
    senereOppholdList: Selector;
    leggTilLandTidligereBt: Selector;
    leggTilLandSenereBt: Selector;

    constructor() {
        this.tidligereOpphold = Selector('[data-type="utenlandsoppholdBolk--tidligereOpphold"]');
        this.senereOpphold = Selector('[data-type="utenlandsoppholdBolk--senereOpphold"]');
        this.tidligereOppholdList = this.tidligereOpphold.find('ul.list');
        this.senereOppholdList = this.senereOpphold.find('ul.list');
        this.leggTilLandTidligereBt = this.tidligereOpphold.find('button[data-name="leggTilUtenlandsopphold"]');
        this.leggTilLandSenereBt = this.senereOpphold.find('button[data-name="leggTilUtenlandsopphold"]');
    }

    async fyllUtDialog(t: TestController, fom: Date, tom: Date) {
        const tidligereOpphold = new UtenlandsoppholdModal();
        await tidligereOpphold.velgLand(t);
        await tidligereOpphold.velgTidsperiode(t, fom, tom);
        await tidligereOpphold.leggTil(t);
    }

    private async fjernOpphold(t: TestController, list: Selector) {
        let opphold = await list.find('.interactiveListElement');
        let cnt = 0;
        while ((await opphold.count) > 0 && cnt < 5) {
            await t.click(Selector('button.interactiveListElement__deleteButton'));
            opphold = await list.find('.interactiveListElement');
        }
    }

    private async leggTilTidligereUtenlandsoppholdPart(t: TestController) {
        const fom = moment()
            .subtract(4, 'months')
            .toDate();
        const tom = moment(fom)
            .add(3, 'weeks')
            .toDate();
        await this.fjernOpphold(t, this.tidligereOppholdList);
        await TestUtils.selectRadio(t, 'boddINorgeSiste12Mnd', 'nei');
        await t.click(this.leggTilLandTidligereBt);
        await this.fyllUtDialog(t, fom, tom);
    }

    private async leggTilSenereUtenlandsoppholdPart(t: TestController) {
        const fom = moment()
            .add(4, 'months')
            .toDate();
        const tom = moment(fom)
            .add(3, 'weeks')
            .toDate();
        await this.fjernOpphold(t, this.senereOppholdList);
        await TestUtils.selectRadio(t, 'iNorgeNeste12Mnd', 'nei');
        await t.click(this.leggTilLandSenereBt);
        await this.fyllUtDialog(t, fom, tom);
    }

    async ingenUtenlandsopphold(t: TestController) {
        await TestUtils.selectRadio(t, 'boddINorgeSiste12Mnd', 'ja');
        await TestUtils.selectRadio(t, 'iNorgeNeste12Mnd', 'ja');
    }

    async medUtenlandsopphold(t: TestController) {
        await this.leggTilTidligereUtenlandsoppholdPart(t);
        await this.leggTilSenereUtenlandsoppholdPart(t);
    }
}
