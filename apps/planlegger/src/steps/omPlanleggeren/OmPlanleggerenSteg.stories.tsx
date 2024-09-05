import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { Action, PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { initAmplitude } from '@navikt/fp-metrics';

import OmPlanleggerenSteg from './OmPlanleggerenSteg';

const meta = {
    title: 'steg/OmPlanleggerenSteg',
    component: OmPlanleggerenSteg,
    render: ({ gåTilNesteSide = action('button-click'), locale, changeLocale }) => {
        initAmplitude();
        return (
            <MemoryRouter initialEntries={[PlanleggerRoutes.OM_PLANLEGGEREN]}>
                <PlanleggerDataContext onDispatch={gåTilNesteSide}>
                    <OmPlanleggerenSteg locale={locale} changeLocale={changeLocale} />
                </PlanleggerDataContext>
            </MemoryRouter>
        );
    },
} satisfies Meta<
    ComponentProps<typeof OmPlanleggerenSteg> & {
        gåTilNesteSide?: (action: Action) => void;
    }
>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        locale: 'nb',
        changeLocale: () => undefined,
    },
};
