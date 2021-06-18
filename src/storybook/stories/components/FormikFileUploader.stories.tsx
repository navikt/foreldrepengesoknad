import React from 'react';

import withIntlProvider from '../../decorators/withIntl';
import FormikFileUploader from '../../../app/components/formik-file-uploader/FormikFileUploader';
import { Attachment } from '../../../app/types/Attachment';
import { Skjemanummer } from '../../../app/types/Skjemanummer';

export default {
    title: 'components/FormikFileUploader',
    component: FormikFileUploader,
    decorators: [withIntlProvider],
};

export const visFileOpplaster = () => (
    <FormikFileUploader
        attachments={[]}
        name="test"
        label="Dette er en label"
        attachmentType={{} as Attachment}
        skjemanummer={Skjemanummer.ANNET}
    />
);
