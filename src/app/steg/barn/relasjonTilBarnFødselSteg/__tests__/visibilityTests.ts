import { dateToISOString } from '@navikt/sif-common-formik/lib';
import { Attachment } from 'app/components/storage/attachment/types/Attachment';
import { AttachmentType } from 'app/components/storage/attachment/types/AttachmentType';
import { Kjønn } from '../../../../types/common';
import { RegistrertBarn } from '../../../../types/Person';
import { Skjemanummer } from '../../../../types/søknad/Søknad';
import visibility from '../visibility/visibilityFunctions';

const registrertBarn: RegistrertBarn = {
    fnr: '01010101010',
    fornavn: 'fornavn',
    etternavn: 'etternavn',
    kjønn: Kjønn.MANN,
    fødselsdato: new Date(),
};

const attachment: Attachment = {
    id: '123',
    filename: '123.jpg',
    filesize: 1,
    file: new File([''], 'filename'),
    pending: false,
    uploaded: true,
    type: AttachmentType.TERMINBEKREFTELSE,
    skjemanummer: Skjemanummer.TERMINBEKREFTELSE,
};

describe('RelasjonTilBarnFødselSteg visbility tester', () => {
    describe('HvilkeBarnGjelderSøknadenBolk', () => {
        it('HvilkeBarnGjelderSøknadenBolk should render when applicant have registered children', () => {
            expect(visibility.hvilkeBarnGjelderSøknadenBolk([registrertBarn])).toBeTruthy();
        });

        it('HvilkeBarnGjelderSøknadenBolk should not render when applicant has no registered children', () => {
            expect(visibility.hvilkeBarnGjelderSøknadenBolk([])).toBeFalsy();
        });
    });

    describe('ErBarnetFødtSpørsmåVisibility', () => {
        it('ErBarnetFødtSpørsmål should render if registered children does not exist or gjelderAnnetBarn equals true', () => {
            expect(visibility.erBarnetFødtSpørsmål(false, false)).toBeTruthy();
            expect(visibility.erBarnetFødtSpørsmål(true, true)).toBeTruthy();
        });
    });

    describe('FødtBarnPartialVisibility', () => {
        it('FødtBarnPartialVisibility should not render if ErBarnetFødtSpørsmål  not rendered', () => {
            expect(visibility.fødtBarnPartial(false, { erBarnetFødt: undefined })).toBeFalsy();
            expect(visibility.fødtBarnPartial(false, { erBarnetFødt: true })).toBeFalsy();
            expect(visibility.fødtBarnPartial(false, { erBarnetFødt: false })).toBeFalsy();
        });

        it('FødtBarnPartialVisibility should render if ErBarnetFødtSpørsmål renders and answer is true', () => {
            expect(visibility.fødtBarnPartial(true, { erBarnetFødt: true })).toBeTruthy();
        });

        it('FødtBarnPartialVisibility should not render if ErBarnetFødtSpørsmål is rendered but unanswered', () => {
            expect(visibility.fødtBarnPartial(true, { erBarnetFødt: undefined })).toBeFalsy();
        });

        it('FødtBarnPartialVisibility should not render if ErBarnetFødtSpørsmål and answer is false', () => {
            expect(visibility.fødtBarnPartial(true, { erBarnetFødt: false })).toBeFalsy();
        });
    });

    describe('FødeslsdatoerSpørsmålVisible', () => {
        it('fødeslsdatoerSpørsmål should not render if UfødtBarnPartial is not rendered', () => {
            expect(visibility.fødselsdatoerSpørsmål(false, { antallBarn: undefined })).toBeFalsy();
            expect(visibility.fødselsdatoerSpørsmål(false, { antallBarn: 1 })).toBeFalsy();
        });

        it('FødeslsdatoerSpørsmål should render if UfødtBarnPartial renders and  antallBarn is answered', () => {
            expect(visibility.fødselsdatoerSpørsmål(true, { antallBarn: 1 })).toBeTruthy();
        });

        it('FødeslsdatoerSpørsmål should not render if UfødtBarnPartial is rendered but antallBarn is unanswered', () => {
            expect(visibility.fødselsdatoerSpørsmål(true, { antallBarn: undefined })).toBeFalsy();
        });
    });

    describe('FødselsattestUploaderVisibility', () => {
        it('FødselsattestUploader should not render if FødeslsdatoerSpørsmål is not rendered', () => {
            expect(visibility.fødselsattestUploader(false, { fødselsdatoer: undefined })).toBeFalsy();
            expect(visibility.fødselsattestUploader(false, { fødselsdatoer: [] })).toBeFalsy();
            expect(
                visibility.fødselsattestUploader(false, { fødselsdatoer: [dateToISOString(new Date())] })
            ).toBeFalsy();
        });

        it('FødselsattestUploader should render if FødeslsdatoerSpørsmål renders and is answered', () => {
            expect(
                visibility.fødselsattestUploader(true, { fødselsdatoer: [dateToISOString(new Date())] })
            ).toBeTruthy();
        });

        it('FødselsattestUploader should not render if FødeslsdatoerSpørsmål is rendered but is unanswered', () => {
            expect(visibility.fødselsattestUploader(true, { fødselsdatoer: undefined })).toBeFalsy();
            expect(visibility.fødselsattestUploader(true, { fødselsdatoer: [] })).toBeFalsy();
        });
    });

    describe('UFødtBarnPartialVisibility', () => {
        it('UFødtBarnPartial should not render if ErBarnetFødtSpørsmål is not rendered', () => {
            expect(visibility.ufødtBarnPartial(false, { erBarnetFødt: undefined })).toBeFalsy();
            expect(visibility.ufødtBarnPartial(false, { erBarnetFødt: true })).toBeFalsy();
            expect(visibility.ufødtBarnPartial(false, { erBarnetFødt: false })).toBeFalsy();
        });

        it('UFødtBarnPartial should render if ErBarnetFødtSpørsmål renders and answer is false', () => {
            expect(visibility.ufødtBarnPartial(true, { erBarnetFødt: false })).toBeTruthy();
        });

        it('UFødtBarnPartial should not render if ErBarnetFødtSpørsmål is rendered but unanswered', () => {
            expect(visibility.ufødtBarnPartial(true, { erBarnetFødt: undefined })).toBeFalsy();
        });

        it('UFødtBarnPartial should not render if ErBarnetFødtSpørsmål and asnwer is true', () => {
            expect(visibility.ufødtBarnPartial(true, { erBarnetFødt: true })).toBeFalsy();
        });
    });

    describe('TermindatoVisibility', () => {
        it('Termindato should not render if UfødtBarnPartial is not rendered', () => {
            expect(visibility.termindato(false, { antallBarn: undefined })).toBeFalsy();
            expect(visibility.termindato(false, { antallBarn: 1 })).toBeFalsy();
        });

        it('Termindato should render if UfødtBarnPartial renders and antallBarn is set', () => {
            expect(visibility.termindato(true, { antallBarn: 1 })).toBeTruthy();
        });

        it('Termindato should not render if UfødtBarnPartial is rendered but antallBarn is unanswered', () => {
            expect(visibility.termindato(true, { antallBarn: undefined })).toBeFalsy();
        });
    });

    describe('TerminbekreftelseVisibility', () => {
        it('Terminbekreftelse should not render if Termindato is not rendered', () => {
            expect(visibility.terminbekreftelse(false, { termindato: undefined }, true)).toBeFalsy();
            expect(visibility.terminbekreftelse(false, { termindato: undefined }, false)).toBeFalsy();
            expect(visibility.terminbekreftelse(false, { termindato: dateToISOString(new Date()) }, true)).toBeFalsy();
            expect(visibility.terminbekreftelse(false, { termindato: dateToISOString(new Date()) }, false)).toBeFalsy();
        });

        it('Terminbekreftelse should render if Termindato renders and is answered', () => {
            expect(visibility.terminbekreftelse(true, { termindato: dateToISOString(new Date()) }, true)).toBeTruthy();
        });

        it('Terminbekreftelse should not render if Termindato is rendered but is unanswered', () => {
            expect(visibility.terminbekreftelse(true, { termindato: undefined }, true)).toBeFalsy();
        });
    });

    describe('TerminbekreftelseDatoVisibility', () => {
        it('TerminbekreftelseDato should not render if ErBarnetFødtSpørsmål is not rendered', () => {
            expect(
                visibility.terminbekreftelseDato(false, { terminbekreftelse: undefined, termindato: undefined })
            ).toBeFalsy();
            expect(
                visibility.terminbekreftelseDato(false, { terminbekreftelse: [attachment], termindato: undefined })
            ).toBeFalsy();
            expect(
                visibility.terminbekreftelseDato(false, {
                    terminbekreftelse: [],
                    termindato: dateToISOString(new Date()),
                })
            ).toBeFalsy();
        });

        it('TerminbekreftelseDato should render if Terminbekreftelse renders and is uploaded', () => {
            expect(
                visibility.terminbekreftelseDato(true, {
                    terminbekreftelse: [attachment],
                    termindato: dateToISOString(new Date()),
                })
            ).toBeTruthy();
        });

        it('TerminbekreftelseDato should not render if ErBarnetFødtSpørsmål is rendered but is not uploaded', () => {
            expect(
                visibility.terminbekreftelseDato(true, {
                    terminbekreftelse: undefined,
                    termindato: dateToISOString(new Date()),
                })
            ).toBeFalsy();
        });
    });
});
