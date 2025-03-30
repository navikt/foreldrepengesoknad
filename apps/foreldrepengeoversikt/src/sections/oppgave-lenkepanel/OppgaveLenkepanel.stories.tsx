import { Meta, StoryObj } from '@storybook/react';
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
            dialogId: '1',
            opprettet: '2024-01-01',
            saksnr: '1',
        },
    },
};
