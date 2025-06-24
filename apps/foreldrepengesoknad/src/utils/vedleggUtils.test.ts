import { AttachmentType, InnsendingsType, Skjemanummer } from '@navikt/fp-constants';
import { Attachment } from '@navikt/fp-types';

import { isAttachmentWithError, mapFilTilVedlegg } from './vedleggUtils';

describe('vedleggUtils', () => {
    it('skal mappe fil til vedlegg', () => {
        const file = { name: 'filnavn', size: 1234 } as File;
        const type = AttachmentType.ALENEOMSORG;
        const skjemanummer = Skjemanummer.DOK_AV_ALENEOMSORG;
        const innsendingsType = InnsendingsType.SEND_SENERE;

        const vedlegg = mapFilTilVedlegg(file, type, skjemanummer, innsendingsType);

        expect(vedlegg.filename).toBe('filnavn');
        expect(vedlegg.filesize).toBe(1234);
        expect(vedlegg.uploaded).toBe(false);
        expect(vedlegg.pending).toBe(false);
        expect(vedlegg.type).toBe(type);
        expect(vedlegg.skjemanummer).toBe(skjemanummer);
        expect(vedlegg.innsendingsType).toBe(innsendingsType);
    });

    it('skal ikke ha feil i vedlegg når den er opplastet og har størrelse over 0', () => {
        const vedlegg = {
            pending: false,
            uploaded: true,
            filesize: 1234,
        } as Attachment;

        const harFeil = isAttachmentWithError(vedlegg);

        expect(harFeil).toBe(false);
    });

    it('skal ha feil i vedlegg når den er forsøkt laster opp men ikke markert som opplastet', () => {
        const vedlegg = {
            pending: false,
            uploaded: false,
            filesize: 1234,
        } as Attachment;

        const harFeil = isAttachmentWithError(vedlegg);

        expect(harFeil).toBe(true);
    });

    it('skal ha feil i vedlegg når den er opplastet men har størrelse 0', () => {
        const vedlegg = {
            pending: false,
            uploaded: true,
            filesize: 0,
        } as Attachment;

        const harFeil = isAttachmentWithError(vedlegg);

        expect(harFeil).toBe(true);
    });
});
