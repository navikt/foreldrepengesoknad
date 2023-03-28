import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import Fieldset from './Fieldset';

export default {
    title: 'components/Fieldset',
    component: Fieldset,
} as ComponentMeta<typeof Fieldset>;

export const Default: ComponentStory<typeof Fieldset> = () => (
    <Fieldset legend="Dette er header">
        <div>Dette er innhold</div>
    </Fieldset>
);
