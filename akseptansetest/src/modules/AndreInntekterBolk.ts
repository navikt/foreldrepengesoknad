import StegSelectors from '../utils/stegSelectors';
import { Selector } from 'testcafe';
import AndreInntekterDialog from './AndreInntekterDialog';

class AndreInntekterBolk {
    harHattAndreInntekterJaRb: Selector;
    harHattAndreInntekterNeiRb: Selector;
    leggTilBt: Selector;

    constructor() {
        this.harHattAndreInntekterJaRb = StegSelectors.radioPanelElement('annenInntekt', 'ja');
        this.harHattAndreInntekterNeiRb = StegSelectors.radioPanelElement('annenInntekt', 'ja');
        this.leggTilBt = Selector('button[data-name="leggTilAnnenInntekt"]');
    }

    async fyllUtJobbIUtlandet(t: TestController) {
        const dialog = new AndreInntekterDialog();
        await t.click(this.harHattAndreInntekterJaRb.parent()).click(this.leggTilBt);
        await dialog.fyllUt(t);
    }
}

export default AndreInntekterBolk;
