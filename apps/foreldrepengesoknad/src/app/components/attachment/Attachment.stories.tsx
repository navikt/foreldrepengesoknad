import { StoryFn } from '@storybook/react';

import { Attachment as AttachmentType } from '@navikt/fp-common';
import Attachment, { Props } from './Attachment';

export default {
    title: 'components/Attachment',
    component: Attachment,
};

const Template: StoryFn<Props> = (args) => <Attachment {...args} />;

export const PendingVedleggUtenUrl = Template.bind({});
PendingVedleggUtenUrl.args = {
    attachment: {
        id: '1',
        pending: true,
        filename: 'Dette er et filnavn',
    } as AttachmentType,
};

export const VedleggMedUrl = Template.bind({});
VedleggMedUrl.args = {
    attachment: {
        id: '1',
        pending: false,
        url: 'www.test.no',
        filename: 'Dette er et filnavn',
    } as AttachmentType,
};

export const Filstørrelse = Template.bind({});
Filstørrelse.args = {
    attachment: {
        id: '1',
        pending: false,
        url: 'www.test.no',
        filename: 'Dette er et filnavn',
        filesize: 100,
    } as AttachmentType,
};

export const SlettKnapp = Template.bind({});
SlettKnapp.args = {
    attachment: {
        id: '1',
        pending: false,
        url: 'www.test.no',
        filename: 'Dette er et filnavn',
        filesize: 100,
    } as AttachmentType,
};
