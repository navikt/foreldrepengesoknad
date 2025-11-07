import { Meta, StoryObj } from '@storybook/react-vite';

import { KontoBeregningDto } from '@navikt/fp-types';

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
            [UttaksplanContextDataType.ALENE_OM_OMSORG]: false,
            [UttaksplanContextDataType.VALGT_STØNADSKONTO]: {
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

export const LeggTilMødrekvote: Story = {
    args: {
        erBarnetFødt: true,
        gjelderAdopsjon: false,
    },
};
