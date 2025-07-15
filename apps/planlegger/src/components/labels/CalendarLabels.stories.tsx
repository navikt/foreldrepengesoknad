import { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';

import { BarnType, Forelder, StønadskontoType } from '@navikt/fp-constants';
import { SaksperiodeNy, UtsettelseÅrsakType } from '@navikt/fp-types';
import { UttaksplanKalender } from '@navikt/fp-uttaksplan-kalender-ny';

const meta = {
    title: 'UttaksplanKalender',
    component: UttaksplanKalender,
} satisfies Meta<typeof UttaksplanKalender>;
export default meta;

type Story = StoryObj<typeof meta>;

// Todo: Kalle: Her må man sette opp slik at helgedatoer blir tatt høyde for

export const MorSøkerMedTapteDager: Story = {
    args: {
        søkersPerioder: [
            {
                fom: dayjs().subtract(1, 'day').subtract(3, 'weeks').format('YYYY-MM-DD'), // 3 uker før fødsel
                tom: dayjs().subtract(1, 'day').subtract(1, 'day').format('YYYY-MM-DD'), // til dagen før fødsel
                forelder: Forelder.mor,
                kontoType: StønadskontoType.ForeldrepengerFørFødsel,
            },
            {
                fom: dayjs().subtract(1, 'day').add(2, 'days').format('YYYY-MM-DD'), // 2 dager etter fødsel
                tom: dayjs().subtract(1, 'day').add(15, 'weeks').format('YYYY-MM-DD'), // 15 uker senere
                forelder: Forelder.mor,
                kontoType: StønadskontoType.Mødrekvote,
            },
            {
                fom: dayjs().subtract(1, 'day').add(15, 'weeks').add(3, 'days').format('YYYY-MM-DD'), // 3 dager etter mødrekvote
                tom: dayjs().subtract(1, 'day').add(32, 'weeks').format('YYYY-MM-DD'), // 17 uker senere
                forelder: Forelder.mor,
                kontoType: StønadskontoType.Fellesperiode,
            },
            {
                fom: dayjs().subtract(1, 'day').add(32, 'weeks').add(3, 'days').format('YYYY-MM-DD'), // 3 dager etter fellesperiode
                tom: dayjs().subtract(1, 'day').add(46, 'weeks').format('YYYY-MM-DD'), // 14 uker senere
                forelder: Forelder.farMedmor,
                kontoType: StønadskontoType.Fedrekvote,
            },
        ] satisfies SaksperiodeNy[],
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: [dayjs().subtract(1, 'day').format('YYYY-MM-DD')], // I dag minus 1
            antallBarn: 1,
        },
        erFarEllerMedmor: false,
        harAktivitetskravIPeriodeUtenUttak: false,
        bareFarMedmorHarRett: false,
        navnAnnenPart: 'Hanne',
    },
};
// lag en story, standard uttaksplan men uten tapte dager
export const MorSøkerUtenTapteDager: Story = {
    args: {
        søkersPerioder: [
            {
                fom: dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
                tom: dayjs().add(14, 'days').format('YYYY-MM-DD'),
                forelder: Forelder.mor,
                kontoType: StønadskontoType.Foreldrepenger,
            },
        ] satisfies SaksperiodeNy[],
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: [dayjs().subtract(1, 'day').format('YYYY-MM-DD')], // I dag minus 1
            antallBarn: 1,
        },
        erFarEllerMedmor: false,
        harAktivitetskravIPeriodeUtenUttak: false,
        bareFarMedmorHarRett: false,
        navnAnnenPart: 'Hanne',
    },
};
