import {
    createAttachmentCorrelationID,
    SKJEMANUMMER_FOR_TERMINBEKREFTELSE
} from 'common/storage/attachment/components/util';
import { AttachmentType } from '../../../../../app/types/søknad/Søknad';

describe('attachment utils', () => {
    describe('createAttachmentCorrelationID', () => {
        it('returns skjemmanummer for terminbekreftelse in case of terminbekreftelse', () => {
            const id = createAttachmentCorrelationID(
                AttachmentType.TERMINBEKREFTELSE
            );
            expect(id).toBe(SKJEMANUMMER_FOR_TERMINBEKREFTELSE);
        });

        it('should return an ID with only numeric characters for other attachment types', () => {
            const regex = /^\d+$/;
            expect(
                createAttachmentCorrelationID(AttachmentType.ADOPSJONSVEDTAK)
            ).toMatch(regex);

            expect(
                createAttachmentCorrelationID(AttachmentType.OMSROGSOVERTAKELSE)
            ).toMatch(regex);

            expect(
                createAttachmentCorrelationID(AttachmentType.FØDSELSATTEST)
            ).toMatch(regex);

            expect(
                createAttachmentCorrelationID(
                    AttachmentType.ANNEN_INNTEKT_DOKUMENTASJON
                )
            ).toMatch(regex);
        });
    });
});
