import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import { Preview } from '@storybook/react';

import '@navikt/ds-css';

import { fpCommonMessages } from '@navikt/fp-common';
import { getIntlDecorator } from '@navikt/fp-utils-test';

const withIntlProvider = getIntlDecorator({
    nb: fpCommonMessages.nb,
    nn: fpCommonMessages.nn,
    en: fpCommonMessages.en,
});

const preview: Preview = {
    decorators: [withIntlProvider],
    parameters: {
        viewport: {
            viewports: {
                ...INITIAL_VIEWPORTS,
                ...MINIMAL_VIEWPORTS,
            },
        },
    },
};

export default preview;
