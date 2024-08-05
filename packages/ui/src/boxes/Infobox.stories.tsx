import { TasklistStartIcon } from '@navikt/aksel-icons';
import { Meta, StoryObj } from '@storybook/react';

import Infobox from './Infobox';

const meta = {
    title: 'components/Infobox',
    component: Infobox,
} satisfies Meta<typeof Infobox>;
export default meta;

type Story = StoryObj<typeof Infobox>;

export const Default: Story = {
    args: {
        header: <div>Dette er en header</div>,
        children: <div>Dette er et barn</div>,
    },
};

export const GråttPanel: Story = {
    args: {
        header: <div>Dette er en header</div>,
        children: <div>Dette er et barn</div>,
        color: 'gray',
    },
};

export const MedIkon: Story = {
    args: {
        header: <div>Dette er en header</div>,
        children: <div>Dette er et barn</div>,
        icon: <TasklistStartIcon height={28} width={28} color="#236B7D" aria-hidden />,
    },
};
export const UtenHeaderMedIkon: Story = {
    args: {
        children: <div>Dette er et barn</div>,
        icon: <TasklistStartIcon height={28} width={28} color="#236B7D" aria-hidden />,
    },
};

export const UtenHeaderUtenIkon: Story = {
    args: {
        children: <div>Dette er et barn</div>,
    },
};
