import TestUtils from '../utils/testutils';
import FrilandsBolk from '../modules/FrilansBolk';
import SelvstendigNæringsdrivendeBolk from '../modules/SelvstendigN\u00E6ringsdrivendeBolk';
import AndreInntekterBolk from '../modules/AndreInntekterBolk';

export default class ArbeidsforholdOgInntektPage {
    async standard(t: TestController) {
        TestUtils.selectRadio(t, 'harJobbetSomFrilansSiste10Mnd', 'nei');
        TestUtils.selectRadio(t, 'harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd', 'nei');
        TestUtils.selectRadio(t, 'annenInntekt', 'nei');
    }

    async fyllUtFrilans(t: TestController) {
        const frilansBolk = new FrilandsBolk();
        await frilansBolk.fyllUtHarJobbetFrilans(t);
    }

    async fyllUtSelvstendigNæringsdrivende(t: TestController) {
        const bolk = new SelvstendigNæringsdrivendeBolk();
        await bolk.fyllUtNorskregistrert(t);
    }

    async fyllUtAnnenInntektJobbIUtlandet(t: TestController) {
        const bolk = new AndreInntekterBolk();
        await bolk.fyllUtJobbIUtlandet(t);
    }
}
