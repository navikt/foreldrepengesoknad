import React from 'react';
import withFormik from 'storybook-formik';

import withIntlProvider from '../../decorators/withIntl';
import FormikFileUploader from '../../../app/components/formik-file-uploader/FormikFileUploader';
import { Attachment } from '../../../app/types/Attachment';
import { Skjemanummer } from '../../../app/types/Skjemanummer';

export default {
    title: 'components/FormikFileUploader',
    component: FormikFileUploader,
    decorators: [withIntlProvider, withFormik],
};

export const visFilOpplaster = () => (
    <FormikFileUploader
        attachments={[]}
        name="field_name"
        label="Last opp vedlegg"
        attachmentType={{} as Attachment}
        skjemanummer={Skjemanummer.ANNET}
    />
);

export const visFilSomErLastetOpp = () => (
    <FormikFileUploader
        attachments={
            [
                {
                    id: '1',
                    pending: false,
                    filename: 'Fil som er lastet opp',
                },
            ] as Attachment[]
        }
        name="field_name"
        label="Last opp vedlegg"
        attachmentType={
            {
                id: '1',
                pending: false,
                filename: 'Fil som er lastet opp',
            } as Attachment
        }
        skjemanummer={Skjemanummer.ANNET}
    />
);
