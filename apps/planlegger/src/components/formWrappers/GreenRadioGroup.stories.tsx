import { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';

import { Radio } from '@navikt/ds-react';

import { Form } from '@navikt/fp-form-hooks';

import GreenRadioGroup from './GreenRadioGroup';

const meta: Meta<typeof GreenRadioGroup> = {
    title: 'components/GreenRadioGroup',
    component: GreenRadioGroup,
};
export default meta;

type Story = StoryObj<typeof GreenRadioGroup>;

const FormWithGreenRadioGroup = (args: Story) => {
    const formMethods = useForm();
    return (
        <Form formMethods={formMethods}>
            <GreenRadioGroup name="test" {...args}>
                <Radio value="1">test 1</Radio>
                <Radio value="2">test 2</Radio>
            </GreenRadioGroup>
        </Form>
    );
};

export const Default: Story = {
    render: (args) => <FormWithGreenRadioGroup {...args} />,
    args: {
        label: 'Dette er en radioknapp som blir lysere når du trykker på den',
    },
};
