import { StoryFn } from '@storybook/react';
import { AttachmentType } from 'app/types/AttachmentType';
import withIntlProvider from 'storybook/decorators/withIntl';
import { Formik, Form } from 'formik';
import FormikFileUploader, { Props } from './FormikFileUploader';
import { Attachment } from '../../../app/types/Attachment';
import { Skjemanummer } from '../../../app/types/Skjemanummer';

export default {
    title: 'components/FormikFileUploader',
    component: FormikFileUploader,
    decorators: [withIntlProvider],
};

const Template: StoryFn<Props> = (args) => (
    <Formik initialValues={{}} onSubmit={() => undefined}>
        <Form>
            <FormikFileUploader {...args} />;
        </Form>
    </Formik>
);

export const Default = Template.bind({});
Default.args = {
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
