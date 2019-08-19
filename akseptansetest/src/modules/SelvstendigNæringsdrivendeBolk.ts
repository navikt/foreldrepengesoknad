import StegSelectors from '../utils/stegSelectors';
import { Selector } from 'testcafe';
import SelvstendigNæringsdrivendeDialog from './SelvstendigN\u00E6ringsdrivendeDialog';

class SelvstendigNæringsdrivendeBolk {
    harJobbetJaRb: Selector;
    leggTilBt: Selector;

    constructor() {
        this.harJobbetJaRb = StegSelectors.radioPanelElement('harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd', 'ja');
        this.leggTilBt = Selector('button[data-name="leggTilNæring"]');
    }

    async fyllUtNorskregistrert(t: TestController) {
        const dialog = new SelvstendigNæringsdrivendeDialog();
        await t.click(this.harJobbetJaRb.parent('label')).click(this.leggTilBt);
        await dialog.fyllUt(t);
    }
}

export default SelvstendigNæringsdrivendeBolk;
