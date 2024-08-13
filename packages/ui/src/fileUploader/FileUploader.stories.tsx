import { StoryFn } from '@storybook/react';

import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { Attachment } from '@navikt/fp-types';

import ContentWrapper from '../contentWrapper/ContentWrapper';
import FileUploader from './FileUploader';

export default {
    title: 'FileUploader',
    component: FileUploader,
};

const Template: StoryFn<{
    saveAttachment: () => Promise<any>;
    existingAttachments?: Attachment[];
    skjemanummerTextMap?: Record<Skjemanummer, string>;
}> = ({ saveAttachment, existingAttachments, skjemanummerTextMap }) => {
    return (
        <ContentWrapper>
            <FileUploader
                label="Last opp fil"
                attachmentType={AttachmentType.OMSORGSOVERTAKELSE}
                skjemanummer={Skjemanummer.OMSORGSOVERTAKELSE}
                saveAttachment={saveAttachment}
                existingAttachments={existingAttachments}
                updateAttachments={() => undefined}
                skjemanummerTextMap={skjemanummerTextMap}
            />
        </ContentWrapper>
    );
};

const file1 = new File(['abc'.repeat(100000)], 'Filnavn1.jpg');
const file2 = new File(['abc'.repeat(500000)], 'Filnavn2.jpg');

export const VisEksisterendeVedlegg = Template.bind({});
VisEksisterendeVedlegg.args = {
    existingAttachments: [
        {
            id: '1',
            filename: file1.name,
            filesize: file1.size,
            file: file1,
            pending: false,
            uploaded: true,
            type: AttachmentType.TERMINBEKREFTELSE,
            skjemanummer: Skjemanummer.TERMINBEKREFTELSE,
        },
        {
            id: '2',
            filename: file2.name,
            filesize: file2.size,
            file: file2,
            pending: true,
            uploaded: false,
            type: AttachmentType.TERMINBEKREFTELSE,
            skjemanummer: Skjemanummer.TERMINBEKREFTELSE,
        },
    ],
};

export const VisEksisterendeVedleggGruppert = Template.bind({});
VisEksisterendeVedleggGruppert.args = {
    existingAttachments: [
        {
            id: '1',
            filename: file1.name,
            filesize: file1.size,
            file: file1,
            pending: false,
            uploaded: true,
            type: AttachmentType.TERMINBEKREFTELSE,
            skjemanummer: Skjemanummer.TERMINBEKREFTELSE,
        },
        {
            id: '2',
            filename: file2.name,
            filesize: file2.size,
            file: file2,
            pending: true,
            uploaded: false,
            type: AttachmentType.ALENEOMSORG,
            skjemanummer: Skjemanummer.DOK_AV_ALENEOMSORG,
        },
    ],
    //@ts-ignore
    skjemanummerTextMap: {
        [Skjemanummer.TERMINBEKREFTELSE]: 'Terminbekreftelse',
        [Skjemanummer.DOK_AV_ALENEOMSORG]: 'Aleneomsorg',
    },
};

export const OpplastingOk = Template.bind({});
OpplastingOk.args = {
    saveAttachment: () =>
        Promise.resolve({
            headers: {
                location: '',
            },
            data: 'test',
        }),
};

export const OpplastingFeiler = Template.bind({});
