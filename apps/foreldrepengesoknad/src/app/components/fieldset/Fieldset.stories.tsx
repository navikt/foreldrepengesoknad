import { StoryFn } from '@storybook/react';
import React from 'react';

import Fieldset from './Fieldset';

export const Default: StoryFn<typeof Fieldset> = () => (
    <Fieldset legend="Dette er header">
        <div>Dette er innhold</div>
    </Fieldset>
);
