import React from 'react';

import withIntlProvider from '../../decorators/withIntl';
import DinePlikter from '../../../app/components/dine-plikter/DinePlikter';

export default {
    title: 'components/DinePlikter',
    component: DinePlikter,
    decorators: [withIntlProvider],
};

export const Default = () => <DinePlikter />;
