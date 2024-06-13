import { Preview } from '@storybook/react';

import '@navikt/ds-css';

import { uiMessages } from '@navikt/fp-ui';
import { getIntlDecorator } from '@navikt/fp-utils-test';

import nbMessages from '../src/app/intl/nb_NO.json';
import '../src/app/styles/app.css';

const withIntlProvider = getIntlDecorator({
    nb: { ...nbMessages, ...uiMessages.nb },
});

const preview: Preview = {
    decorators: [withIntlProvider],
};

export default preview;
