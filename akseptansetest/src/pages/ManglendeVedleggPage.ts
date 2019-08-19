import { Selector } from 'testcafe';
import TestUtils from '../utils/testutils';

export default class ManglendeVedleggPage {
    uploadBtn: Selector;
    terminbekreftelseDato: Selector;

    constructor() {
        this.uploadBtn = Selector('.attachmentButton');
        this.terminbekreftelseDato = Selector('#terminbekreftelseDato');
    }

    async uploadVedlegg(t: TestController) {
        await t.setFilesToUpload('input[type=file]', ['../uploads/doc.pdf']);
    }

    async setTerminbekreftelseDato(t: TestController, dato: Date) {
        await TestUtils.setDato(t, this.terminbekreftelseDato, dato || new Date());
    }
}
