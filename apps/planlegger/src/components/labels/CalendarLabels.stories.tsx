import { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';

import { BarnType, Forelder, StønadskontoType } from '@navikt/fp-constants';
import { SaksperiodeNy } from '@navikt/fp-types';
import { UttaksplanKalender } from '@navikt/fp-uttaksplan-kalender-ny';

const meta = {
    title: 'UttaksplanKalender',
    component: UttaksplanKalender,
} satisfies Meta<typeof UttaksplanKalender>;
export default meta;

type Story = StoryObj<typeof meta>;

// Beregn fødselsdato og juster for helgedager
const fødselsdato = dayjs().subtract(1, 'day');
const erHelgedag = fødselsdato.day() === 0 || fødselsdato.day() === 6; // Søndag eller lørdag

// Beregn startdatoer basert på om fødselsdato er helgedag
const startForeldrepengerFørFødsel = erHelgedag
    ? fødselsdato.subtract(3, 'weeks').day(1) // Mandag 3 uker før hvis helgedag
    : fødselsdato.subtract(3, 'weeks');

const startMødrekvote = erHelgedag
    ? fødselsdato.add(1, 'week').day(1) // Mandag etter fødsel hvis helgedag
    : fødselsdato.add(1, 'day'); // Dagen etter fødsel hvis ukedag

const startFellesperiode = startMødrekvote.add(15, 'weeks').add(1, 'day');
const startFedrekvote = startFellesperiode.add(16, 'weeks').add(1, 'day');

export const MorSøkerMedTapteDager: Story = {
    args: {
        søkersPerioder: [
            {
                fom: startForeldrepengerFørFødsel.format('YYYY-MM-DD'),
                tom: fødselsdato.subtract(1, 'day').format('YYYY-MM-DD'),
                forelder: Forelder.mor,
                kontoType: StønadskontoType.ForeldrepengerFørFødsel,
            },
            {
                // legger inn en tapt dag mellom fødsel og mødrekvote
                fom: startMødrekvote.add(1, 'day').format('YYYY-MM-DD'),
                tom: startMødrekvote.add(15, 'weeks').format('YYYY-MM-DD'),
                forelder: Forelder.mor,
                kontoType: StønadskontoType.Mødrekvote,
            },
            {
                fom: startFellesperiode.format('YYYY-MM-DD'),
                tom: startFellesperiode.add(16, 'weeks').format('YYYY-MM-DD'),
                forelder: Forelder.mor,
                kontoType: StønadskontoType.Fellesperiode,
            },
            {
                fom: startFedrekvote.format('YYYY-MM-DD'),
                tom: startFedrekvote.add(15, 'weeks').format('YYYY-MM-DD'),
                forelder: Forelder.farMedmor,
                kontoType: StønadskontoType.Fedrekvote,
            },
        ] satisfies SaksperiodeNy[],
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: [fødselsdato.format('YYYY-MM-DD')],
            antallBarn: 1,
        },
        erFarEllerMedmor: false,
        harAktivitetskravIPeriodeUtenUttak: false,
        bareFarMedmorHarRett: false,
        navnAnnenPart: 'Ola',
    },
};

export const MorSøkerUtenTapteDager: Story = {
    args: {
        søkersPerioder: [
            {
                fom: startForeldrepengerFørFødsel.format('YYYY-MM-DD'),
                tom: fødselsdato.subtract(1, 'day').format('YYYY-MM-DD'),
                forelder: Forelder.mor,
                kontoType: StønadskontoType.ForeldrepengerFørFødsel,
            },
            {
                fom: startMødrekvote.format('YYYY-MM-DD'),
                tom: startMødrekvote.add(15, 'weeks').format('YYYY-MM-DD'),
                forelder: Forelder.mor,
                kontoType: StønadskontoType.Mødrekvote,
            },
            {
                fom: startFellesperiode.format('YYYY-MM-DD'),
                tom: startFellesperiode.add(16, 'weeks').format('YYYY-MM-DD'),
                forelder: Forelder.mor,
                kontoType: StønadskontoType.Fellesperiode,
            },
            {
                fom: startFedrekvote.format('YYYY-MM-DD'),
                tom: startFedrekvote.add(15, 'weeks').format('YYYY-MM-DD'),
                forelder: Forelder.farMedmor,
                kontoType: StønadskontoType.Fedrekvote,
            },
        ] satisfies SaksperiodeNy[],
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: [fødselsdato.format('YYYY-MM-DD')],
            antallBarn: 1,
        },
        erFarEllerMedmor: false,
        harAktivitetskravIPeriodeUtenUttak: false,
        bareFarMedmorHarRett: false,
        navnAnnenPart: 'Ola',
    },
};
