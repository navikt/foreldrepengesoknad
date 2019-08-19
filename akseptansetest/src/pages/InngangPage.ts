import TestUtils from '../utils/testutils';

export default class InngangPageModel {
    constructor() {}

    async selectSøkersituasjon(t: TestController, situasjon: string) {
        await TestUtils.selectRadio(t, 'søkersituasjon', situasjon);
    }

    async selectSøkerrolle(t: TestController, rolle: string) {
        await TestUtils.selectRadio(t, 'søkerrolle', rolle);
    }

    async fødselMor(t: TestController) {
        await this.selectSøkersituasjon(t, 'fødsel');
        await this.selectSøkerrolle(t, 'MOR');
    }

    async fødselFar(t: TestController) {
        await this.selectSøkersituasjon(t, 'fødsel');
    }

    async adopsjonMor(t: TestController) {
        await this.selectSøkersituasjon(t, 'adopsjon');
    }
}
