import React from 'react';
import withFormik from 'storybook-formik';
import { AttachmentType } from 'app/types/AttachmentType';
import withIntlProvider from '../../decorators/withIntl';
import FormikFileUploader, { Props } from '../../../app/components/formik-file-uploader/FormikFileUploader';
import { Attachment } from '../../../app/types/Attachment';
import { Skjemanummer } from '../../../app/types/Skjemanummer';

export default {
    title: 'components/FormikFileUploader',
    component: FormikFileUploader,
    decorators: [withIntlProvider, withFormik],
};

const Template = (args: Props) => <FormikFileUploader {...args} />;

export const FilOpplaster = Template.bind({});
FilOpplaster.args = {
    attachments: [],
    name: 'field_name',
    label: 'Last opp vedlegg',
    attachmentType: AttachmentType.ADOPSJONSVEDTAK,
    skjemanummer: Skjemanummer.ANNET,
};

export const FilSomErLastetOpp = Template.bind({});
FilSomErLastetOpp.args = {
    attachments: [
        {
            id: '1',
            pending: false,
            filename: 'Fil som er lastet opp',
        },
    ] as Attachment[],
    name: 'field_name',
    label: 'Last opp vedlegg',
    attachmentType: AttachmentType.ADOPSJONSVEDTAK,
    skjemanummer: Skjemanummer.ANNET,
};
