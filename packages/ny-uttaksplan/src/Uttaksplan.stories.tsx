import { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { BarnType, Forelder, StønadskontoType } from '@navikt/fp-constants';

import { UttaksplanNy } from './Uttaksplan';

const MINSTERETTER = {
    farRundtFødsel: 10,
    toTette: 0,
};

const meta = {
    component: UttaksplanNy,
    args: {
        handleOnPlanChange: action('button-click'),
    },
} satisfies Meta<typeof UttaksplanNy>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        familiehendelsedato: '2025-05-09',
        erFarEllerMedmor: false,
        navnPåForeldre: {
            mor: 'Olga Utvikler',
            farMedmor: 'Espen Utvikler',
        },
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2025-05-09'],
            antallBarn: 1,
            termindato: '2025-05-09',
        },
        søkersPerioder: [
            {
                forelder: Forelder.mor,
                kontoType: StønadskontoType.ForeldrepengerFørFødsel,
                fom: '2025-04-18',
                tom: '2025-05-08',
            },
            {
                forelder: Forelder.mor,
                kontoType: StønadskontoType.Mødrekvote,
                fom: '2025-05-09',
                tom: '2025-08-21',
            },
            {
                forelder: Forelder.mor,
                kontoType: StønadskontoType.Fellesperiode,
                fom: '2025-08-22',
                tom: '2025-12-11',
            },
            {
                forelder: Forelder.farMedmor,
                kontoType: StønadskontoType.Fedrekvote,
                fom: '2025-12-12',
                tom: '2026-03-26',
            },
        ],
        gjelderAdopsjon: false,
        bareFarMedmorHarRett: false,
        harAktivitetskravIPeriodeUtenUttak: false,
        førsteUttaksdagNesteBarnsSak: undefined,
        familiesituasjon: 'fødsel',
        modus: 'planlegger',
        valgtStønadskonto: {
            kontoer: [
                { konto: StønadskontoType.Mødrekvote, dager: 95 },
                { konto: StønadskontoType.Fedrekvote, dager: 95 },
                { konto: StønadskontoType.Fellesperiode, dager: 101 },
                { konto: StønadskontoType.ForeldrepengerFørFødsel, dager: 15 },
            ],
            minsteretter: MINSTERETTER,
        },
        erAleneOmOmsorg: false,
    },
};
