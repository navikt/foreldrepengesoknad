import { Meta, StoryFn } from '@storybook/react';

import Fieldset from './Fieldset';

const defaultExport: Meta = {
    title: 'components/Fieldset',
    component: Fieldset,
};

export default defaultExport;

export const Default: StoryFn<typeof Fieldset> = () => (
    <Fieldset legend="Dette er header">
        <div>Dette er innhold</div>
    </Fieldset>
);
