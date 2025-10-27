import { Meta, StoryObj } from '@storybook/react-vite';

import { Forelder } from '@navikt/fp-constants';
import { HvemPlanleggerType, SaksperiodeNy } from '@navikt/fp-types';

import { CalendarLabels } from './CalendarLabels';

const meta = {
    title: 'CalendarLabels',
    component: CalendarLabels,
} satisfies Meta<typeof CalendarLabels>;
export default meta;

type Story = StoryObj<typeof meta>;

export const MorSøkerMedTapteDager: Story = {
    args: {
        uttaksplan: [
            {
                fom: '2025-07-14',
                tom: '2025-08-02',
                forelder: Forelder.mor,
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
            },
            // legger inn tapt dag mellom termindato og første dag av mødrekvote
            {
                fom: '2025-08-05',
                tom: '2025-11-17',
                forelder: Forelder.mor,
                kontoType: 'MØDREKVOTE',
            },
            {
                fom: '2025-11-18',
                tom: '2026-03-10',
                forelder: Forelder.mor,
                kontoType: 'FELLESPERIODE',
            },
            {
                fom: '2026-03-11',
                tom: '2026-06-24',
                forelder: Forelder.farMedmor,
                kontoType: 'FEDREKVOTE',
            },
        ] satisfies SaksperiodeNy[],
        barnet: {
            erFødsel: true,
            antallBarn: '1',
            erBarnetFødt: true,
            fødselsdato: '2025-08-03',
            termindato: '2025-08-03',
        },
        hvemHarRett: 'beggeHarRett',
        hvemPlanlegger: {
            type: HvemPlanleggerType.MOR_OG_FAR,
            navnPåMor: 'Kari',
            navnPåFar: 'Ola',
        },
        inneholderTapteDager: true,
    },
};

export const MorSøkerUtenTapteDager: Story = {
    args: {
        uttaksplan: [
            {
                fom: '2025-07-14',
                tom: '2025-08-02',
                forelder: Forelder.mor,
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
            },
            {
                fom: '2025-08-04',
                tom: '2025-11-17',
                forelder: Forelder.mor,
                kontoType: 'MØDREKVOTE',
            },
            {
                fom: '2025-11-18',
                tom: '2026-03-10',
                forelder: Forelder.mor,
                kontoType: 'FELLESPERIODE',
            },
            {
                fom: '2026-03-11',
                tom: '2026-06-24',
                forelder: Forelder.farMedmor,
                kontoType: 'FEDREKVOTE',
            },
        ] satisfies SaksperiodeNy[],
        barnet: {
            erFødsel: true,
            antallBarn: '1',
            erBarnetFødt: true,
            fødselsdato: '2025-08-04',
            termindato: '2025-08-04',
        },
        hvemHarRett: 'beggeHarRett',
        hvemPlanlegger: {
            type: HvemPlanleggerType.MOR_OG_FAR,
            navnPåMor: 'Kari',
            navnPåFar: 'Ola',
        },
        inneholderTapteDager: false,
    },
};
