import { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';

import { OppgaveLenkepanel } from './OppgaveLenkepanel';

const meta = {
    title: 'OppgaveLenkepanel',
    component: OppgaveLenkepanel,
    render: (props) => {
        return (
            <MemoryRouter>
                <OppgaveLenkepanel {...props} />
            </MemoryRouter>
        );
    },
} satisfies Meta<typeof OppgaveLenkepanel>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        tittel: 'Tittel',
        minidialogInnslag: {
            opprettet: '2024-01-01',
            saksnummer: '1',
        },
    },
};
