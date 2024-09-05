import { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';

import { Radio } from '@navikt/ds-react';

import { Form } from '@navikt/fp-form-hooks';

import BlueRadioGroup from './BlueRadioGroup';

const meta = {
    title: 'components/BlueRadioGroup',
    component: BlueRadioGroup,
    render: (args) => <FormWithBlueRadioGroup {...args} />,
} satisfies Meta<typeof BlueRadioGroup>;
export default meta;

type Story = StoryObj<typeof BlueRadioGroup>;

const FormWithBlueRadioGroup = (args: Story) => {
    const formMethods = useForm();
    return (
        <Form formMethods={formMethods}>
            <BlueRadioGroup name="test" {...args}>
                <Radio value="1">test 1</Radio>
                <Radio value="2">test 2</Radio>
            </BlueRadioGroup>
        </Form>
    );
};

export const Default: Story = {
    args: {
        label: 'Dette er en radioknapp som blir lysere når du trykker på den',
    },
};
