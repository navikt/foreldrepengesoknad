import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import { Preview } from '@storybook/react';
import dayjs from 'dayjs';
import 'dayjs/locale/nb.js';
import 'dayjs/locale/nn.js';

import '@navikt/ds-css';

import { fpCommonMessages } from '@navikt/fp-common';
import { getIntlDecorator } from '@navikt/fp-utils-test';

import nbMessages from './../src/intl/nb_NO.json';
import nnMessages from './../src/intl/nn_NO.json';

dayjs.locale('nb');

const withIntlProvider = getIntlDecorator({
    nb: { ...nbMessages, ...fpCommonMessages.nb },
    nn: { ...nnMessages, ...fpCommonMessages.nb },
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
