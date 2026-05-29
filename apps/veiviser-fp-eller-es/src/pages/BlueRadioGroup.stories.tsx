/* eslint-disable */
// @ts-nocheck
import { type ComponentProps } from 'react';
import { useForm } from 'react-hook-form';
import { expect } from 'storybook/test';

import { Radio } from '@navikt/ds-react';

import { RhfForm } from '@navikt/fp-form-hooks';

import preview from '../../.storybook/preview';
import { BlueRadioGroup } from './BlueRadioGroup';

const FormWithGreenRadioGroup = (args: Partial<ComponentProps<typeof BlueRadioGroup>>) => {
    const formMethods = useForm();
    return (
        <RhfForm formMethods={formMethods}>
            <BlueRadioGroup name="test" control={formMethods.control} {...args}>
                <Radio value="1">test 1</Radio>
                <Radio value="2">test 2</Radio>
            </BlueRadioGroup>
        </RhfForm>
    );
};

const meta = preview.meta({
    title: 'components/BlueRadioGroup',
    component: BlueRadioGroup,
    render: (args) => <FormWithGreenRadioGroup {...args} />,
});
export default meta;

export const Default = meta.story({
    args: {
        label: 'Dette er en radioknapp som blir lysere når du trykker på den',
    },
    test: async ({ canvas }) => {
        await expect(canvas.findByText('Dette er en radioknapp som blir lysere når du trykker på den')).resolves.toBeInTheDocument();
    },
});
