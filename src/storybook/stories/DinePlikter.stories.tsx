import React from 'react';

import IntlProvider from '../../app/intl/IntlProvider';
import DinePlikter from '../../app/components/dine-plikter/DinePlikter';

export default {
    title: 'DinePlikter',
    component: DinePlikter,
};

export const visDinePlikter = () => (
    <IntlProvider locale="nb">
        <DinePlikter />
    </IntlProvider>
);
