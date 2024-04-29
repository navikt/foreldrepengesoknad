import { Preview } from '@storybook/react';

import '@navikt/ds-css';

import { getIntlDecorator } from '@navikt/fp-utils-test';

const withIntlProvider = getIntlDecorator({});

const preview: Preview = {
    decorators: [withIntlProvider],
};

export default preview;
