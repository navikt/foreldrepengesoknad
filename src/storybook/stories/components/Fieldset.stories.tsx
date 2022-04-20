import React from 'react';

import Fieldset from '../../../app/components/fieldset/Fieldset';

export default {
    title: 'components/Fieldset',
    component: Fieldset,
};

export const Default = () => (
    <Fieldset legend="Dette er header">
        <div>Dette er innhold</div>
    </Fieldset>
);
