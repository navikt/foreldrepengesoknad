import { Meta, StoryObj } from '@storybook/react-vite';

import { KontoBeregningDto } from '@navikt/fp-types';

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
            aleneOmOmsorg: false,
            barn: {
                fødselsdato: '2024-06-01',
            },
            valgtStønadskonto: {
                kontoer: [
                    {
                        konto: 'MØDREKVOTE',
                        dager: 75,
                    },
                    {
                        konto: 'FEDREKVOTE',
                        dager: 75,
                    },
                    {
                        konto: 'FELLESPERIODE',
                        dager: 80,
                    },
                    {
                        konto: 'FORELDREPENGER_FØR_FØDSEL',
                        dager: 15,
                    },
                ],
                minsteretter: {
                    farRundtFødsel: 10,
                    toTette: 0,
                },
            } satisfies KontoBeregningDto,
        },
    },
} satisfies Meta<typeof LeggTilPeriodePanel>;
export default meta;

type Story = StoryObj<typeof meta>;

export const LeggTilMødrekvote: Story = {};
