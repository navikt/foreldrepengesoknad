import { Meta, StoryObj } from '@storybook/react-vite';
import { HvorMyeRoutes } from 'appData/routes';
import { MemoryRouter } from 'react-router-dom';

import { DEFAULT_SATSER } from '@navikt/fp-constants';

import { ArbeidssituasjonSide } from './ArbeidssituasjonSide';

const meta = {
    title: 'hvorMye/ArbeidssituasjonSide',
    component: ArbeidssituasjonSide,
    render: (props) => {
        return (
            <MemoryRouter initialEntries={[HvorMyeRoutes.ARBEIDSSITUASJON]}>
                <ArbeidssituasjonSide {...props} />
            </MemoryRouter>
        );
    },
} satisfies Meta<typeof ArbeidssituasjonSide>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        setArbeidssituasjon: () => undefined,
        arbeidssituasjon: undefined,
        satser: DEFAULT_SATSER,
    },
};
