import { Periode, Periodetype } from '../../../types/uttaksplan/periodetyper';
import {
    removeDuplicateAttachmentIds,
    removeDuplicateAttachments,
    removePeriodetypeHullFromUttaksplan
} from '../cleanupSøknad';
import { Skjemanummer } from '../../../types/søknad/Søknad';
import { AttachmentType } from 'common/storage/attachment/types/AttachmentType';

const uttaksplan: Periode[] = [
    {
        id: 'asd',
        type: Periodetype.Utsettelse
    },
    {
        id: 'asd',
        type: Periodetype.Uttak
    },
    {
        id: 'asd',
        type: Periodetype.Opphold
    },
    {
        id: 'asd',
        type: Periodetype.Overføring
    }
] as Periode[];

const uttaksplanMedHull: Periode[] = [
    ...uttaksplan,
    {
        id: 'asd',
        type: Periodetype.Hull
    }
] as Periode[];

const uttaksplanMedLikeVedlegg: Periode[] = [
    ...uttaksplan,
    {
        id: 'asd',
        type: Periodetype.Utsettelse,
        vedlegg: [
            {
                id: 'v123',
                file: new File([''], 'mock.pdf'),
                filesize: 1024,
                filename: 'mockFile.pdf',
                pending: false,
                uploaded: true,
                url: undefined,
                skjemanummer: Skjemanummer.ANNET,
                type: AttachmentType.OVERFØRING_KVOTE
            }
        ]
    },
    {
        id: 'asd',
        type: Periodetype.Utsettelse,
        vedlegg: [
            {
                id: 'v123',
                file: new File([''], 'mock.pdf'),
                filesize: 1024,
                filename: 'mockFile.pdf',
                pending: false,
                uploaded: true,
                url: undefined,
                skjemanummer: Skjemanummer.ANNET,
                type: AttachmentType.OVERFØRING_KVOTE
            },
            {
                id: 'v321',
                file: new File([''], 'mock.pdf'),
                filesize: 1024,
                filename: 'mockFile.pdf',
                pending: false,
                uploaded: true,
                url: undefined,
                skjemanummer: Skjemanummer.ANNET,
                type: AttachmentType.OVERFØRING_KVOTE
            }
        ]
    }
] as Periode[];

describe('cleanupSøknad', () => {
    it('cleans uttaksplan', () => {
        const cleandUttaksplan = removePeriodetypeHullFromUttaksplan(uttaksplanMedHull);
        expect(JSON.stringify(cleandUttaksplan)).toEqual(JSON.stringify(uttaksplan));
    });

    it('Removes duplicate ids refs from perioder', () => {
        removeDuplicateAttachments(uttaksplanMedLikeVedlegg);
        expect(uttaksplanMedLikeVedlegg[uttaksplanMedLikeVedlegg.length - 1].vedlegg!.length).toEqual(1);
    });
});
