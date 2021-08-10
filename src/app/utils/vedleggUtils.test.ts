import { mapFilTilVedlegg, isAttachmentWithError, lagSendSenereDokumentNårIngenAndreFinnes } from './vedleggUtils';
import { AttachmentType } from 'app/types/AttachmentType';
import { Skjemanummer } from 'app/types/Skjemanummer';
import { Attachment, InnsendingsType } from 'app/types/Attachment';

describe('vedleggUtils', () => {
    it('skal mappe fil til vedlegg', () => {
        const file = { name: 'filnavn', size: 1234 } as any;
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

    it('skal lage "send senere" vedlegg som markerer at dette må sendes inn senere når ingen vedlegg er lastet opp', () => {
        const alleVedlegg = [] as Attachment[];

        const behandledeVedlegg = lagSendSenereDokumentNårIngenAndreFinnes(
            alleVedlegg,
            AttachmentType.ALENEOMSORG,
            Skjemanummer.DOK_AV_ALENEOMSORG
        );

        expect(behandledeVedlegg).toHaveLength(1);
        const sendSenereDokument = behandledeVedlegg[0];
        expect(sendSenereDokument.innsendingsType).toBe(InnsendingsType.SEND_SENERE);
        expect(sendSenereDokument.type).toBe(AttachmentType.ALENEOMSORG);
        expect(sendSenereDokument.skjemanummer).toBe(Skjemanummer.DOK_AV_ALENEOMSORG);
        expect(sendSenereDokument.filename).toBe('');
        expect(sendSenereDokument.filesize).toBe('');
    });

    it('skal returnere samme vedlegg når det kun er ett i listen (Da er det enten lastet opp frå før eller "send senere" dok er laget)', () => {
        const alleVedlegg = [
            {
                filename: 'test',
                filesize: 123,
            },
        ] as Attachment[];

        const behandledeVedlegg = lagSendSenereDokumentNårIngenAndreFinnes(
            alleVedlegg,
            AttachmentType.ALENEOMSORG,
            Skjemanummer.DOK_AV_ALENEOMSORG
        );

        expect(behandledeVedlegg).toHaveLength(1);
        const dokument = behandledeVedlegg[0];
        expect(dokument.innsendingsType).toBeUndefined();
        expect(dokument.filename).toBe('test');
        expect(dokument.filesize).toBe(123);
    });

    it('skal filtrere bort "send senere" vedlegg om dette finnes sammen med andre opplastede vedlegg', () => {
        const alleVedlegg = [
            {
                filename: 'test',
                filesize: 123,
            },
            {
                filename: 'test2',
                filesize: 433,
                innsendingsType: InnsendingsType.SEND_SENERE,
            },
        ] as Attachment[];

        const behandledeVedlegg = lagSendSenereDokumentNårIngenAndreFinnes(
            alleVedlegg,
            AttachmentType.ALENEOMSORG,
            Skjemanummer.DOK_AV_ALENEOMSORG
        );

        expect(behandledeVedlegg).toHaveLength(1);
        const dokument = behandledeVedlegg[0];
        expect(dokument.innsendingsType).toBeUndefined();
        expect(dokument.filename).toBe('test');
        expect(dokument.filesize).toBe(123);
    });
});
