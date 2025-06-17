import { Meta, StoryObj } from '@storybook/react-vite';

import CheckmarkIkon from '../../common/checkmark-ikon/CheckmarkIkon';
import Personkort from './Personkort';

const meta = {
    title: 'components/Personkort',
    component: Personkort,
} satisfies Meta<typeof Personkort>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        tittel: 'Dette er en tittel',
        children: <div>Dette er innholdet</div>,
    },
};

export const PersonkortMedIkon: Story = {
    args: {
        ...Default.args,
        ikon: <CheckmarkIkon />,
    },
};

export const PersonkortMedInvertertTekst: Story = {
    args: {
        ...Default.args,
        invertert: true,
    },
};

export const PersonkortMedTextAlignBottom: Story = {
    args: {
        ...Default.args,
        textValign: 'bottom',
    },
};
