import { StoryFn } from '@storybook/react';
import { Formik, Form } from 'formik';
import FormikFileUploader, { Props } from './FormikFileUploader';
import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { Attachment } from '@navikt/fp-types';

export default {
    title: 'components/FormikFileUploader',
    component: FormikFileUploader,
};

const Template: StoryFn<Props> = (args) => (
    <Formik initialValues={{}} onSubmit={() => undefined}>
        <Form>
            <FormikFileUploader {...args} />
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
