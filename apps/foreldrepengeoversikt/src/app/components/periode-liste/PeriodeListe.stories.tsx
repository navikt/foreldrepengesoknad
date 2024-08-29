import { Meta, StoryObj } from '@storybook/react/*';

import PeriodeListe from './PeriodeListe';

const meta = {
    title: 'PeriodeListe',
    component: PeriodeListe,
} satisfies Meta<typeof PeriodeListe>;
export default meta;

type Story = StoryObj<typeof PeriodeListe>;

export const Default: Story = {
    args: {
        erAleneOmOmsorg: true,
        erFarEllerMedmor: true,
        navnPåForeldre: {
            farMedmor: 'Espen Utvikler',
            mor: 'Olga Utvikler',
        },
        periodeListe: [],
        tittel: 'Dette er en tittel',
    },
};
