import { StoryFn } from '@storybook/react';
import { RawIntlProvider, createIntl } from 'react-intl';
import FileUploader from './FileUploader';
import { Attachment, AttachmentType, Skjemanummer } from '@navikt/fp-types';

export default {
    title: 'FileUploader',
    component: FileUploader,
};

const Template: StoryFn<{
    saveAttachment: () => Promise<any>;
    existingAttachments?: Attachment[];
}> = ({ saveAttachment, existingAttachments }) => {
    return (
        <RawIntlProvider value={createIntl({ locale: 'nb', messages: {} })}>
            <FileUploader
                attachmentType={AttachmentType.OMSORGSOVERTAKELSE}
                saveAttachment={saveAttachment}
                skjemanummber={Skjemanummer.OMSORGSOVERTAKELSE}
                existingAttachments={existingAttachments}
                updateAttachments={() => undefined}
            />
        </RawIntlProvider>
    );
};

export const VisEksisterendeVedlegg = Template.bind({});
VisEksisterendeVedlegg.args = {
    existingAttachments: [
        {
            id: '1',
            filename: 'Dette er en fil som er lastet opp.jpg',
            filesize: 234,
            file: {} as File,
            pending: false,
            uploaded: true,
            type: AttachmentType.TERMINBEKREFTELSE,
            skjemanummer: Skjemanummer.TERMINBEKREFTELSE,
        },
        {
            id: '2',
            filename: 'Dette er en fil som holder på å bli lastet opp.jpg',
            filesize: 2344,
            file: {} as File,
            pending: true,
            uploaded: false,
            type: AttachmentType.TERMINBEKREFTELSE,
            skjemanummer: Skjemanummer.TERMINBEKREFTELSE,
        },
    ],
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
