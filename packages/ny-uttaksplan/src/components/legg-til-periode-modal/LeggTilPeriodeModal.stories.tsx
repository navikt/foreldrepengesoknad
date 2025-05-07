import { Meta, StoryObj } from '@storybook/react';

import { StønadskontoType } from '@navikt/fp-constants';

import { UttaksplanContextDataType } from '../../context/UttaksplanDataContext';
import { withUttaksplanContextDecorator } from '../../storybook/decorators/withUttaksplanContextDecorator';
import { LeggTilPeriodeModal } from './LeggTilPeriodeModal';

const meta = {
    title: 'components/LeggTilPeriodeModal',
    component: LeggTilPeriodeModal,
    decorators: [withUttaksplanContextDecorator],
    args: {
        closeModal: () => undefined,
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
} satisfies Meta<typeof LeggTilPeriodeModal>;
export default meta;

type Story = StoryObj<typeof meta>;

export const LeggTilMødrekvote: Story = {
    args: {
        erBarnetFødt: true,
        gjelderAdopsjon: false,
        isModalOpen: true,
    },
};
