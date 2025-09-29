import { Meta, StoryObj } from '@storybook/react-vite';

import { StønadskontoType } from '@navikt/fp-constants';

import { UttaksplanContextDataType } from '../../context/UttaksplanDataContext';
import { withUttaksplanContextDecorator } from '../../storybook/decorators/withUttaksplanContextDecorator';
import { LeggTilPeriodePanel } from './LeggTilPeriodePanel';

const meta = {
    title: 'components/LeggTilPeriodePanel',
    component: LeggTilPeriodePanel,
    decorators: [withUttaksplanContextDecorator],
    args: {
        onCancel: () => undefined,
        handleAddPeriode: () => undefined,
    },
    parameters: {
        context: {
            [UttaksplanContextDataType.UTTAKSPLAN]: [],
            [UttaksplanContextDataType.VALGT_STØNADSKONTO]: {
                kontoer: [
                    {
                        konto: StønadskontoType.Mødrekvote,
                        dager: 75,
                    },
                    {
                        konto: StønadskontoType.Fedrekvote,
                        dager: 75,
                    },
                    {
                        konto: StønadskontoType.Fellesperiode,
                        dager: 80,
                    },
                    {
                        konto: StønadskontoType.ForeldrepengerFørFødsel,
                        dager: 15,
                    },
                ],
                minsteretter: {
                    farRundtFødsel: 10,
                    toTette: 0,
                },
            },
        },
    },
} satisfies Meta<typeof LeggTilPeriodePanel>;
export default meta;

type Story = StoryObj<typeof meta>;

export const LeggTilMødrekvote: Story = {
    args: {
        erBarnetFødt: true,
        gjelderAdopsjon: false,
        erMedmorDelAvSøknaden: false,
    },
};
