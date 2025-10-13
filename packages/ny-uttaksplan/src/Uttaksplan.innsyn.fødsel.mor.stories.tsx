import { Meta, StoryObj } from '@storybook/react-vite';

import { BarnType, Forelder, StønadskontoType } from '@navikt/fp-constants';
import { PeriodeResultatÅrsak, UtsettelseÅrsakType } from '@navikt/fp-types';

import { UttaksplanNy } from './Uttaksplan';
import { withUttaksplanContextDecorator } from './storybook/decorators/withUttaksplanContextDecorator';

const meta = {
    title: 'Uttaksplan - Innsyn',
    component: UttaksplanNy,
    decorators: [withUttaksplanContextDecorator],
    args: {
        handleOnPlanChange: () => null,
    },
} satisfies Meta<typeof UttaksplanNy>;
export default meta;

type Story = StoryObj<typeof meta>;

export const MorAleneOmOmsorg: Story = {
    name: 'Mor er alene om omsorg',
    args: {
        bareFarMedmorHarRett: false,
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2025-09-30'],
            termindato: '2025-10-07',
            antallBarn: 1,
        },
        erAleneOmOmsorg: true,
        erFarEllerMedmor: false,
        familiehendelsedato: '2025-09-30',
        familiesituasjon: 'fødsel',
        førsteUttaksdagNesteBarnsSak: undefined,
        gjelderAdopsjon: false,

        harAktivitetskravIPeriodeUtenUttak: false,
        modus: 'innsyn',
        navnPåForeldre: {
            farMedmor: 'Annen forelder',
            mor: 'Iris',
        },
        søkersPerioder: [
            {
                fom: '2025-09-16',
                tom: '2025-09-29',
                kontoType: StønadskontoType.ForeldrepengerFørFødsel,
                resultat: {
                    innvilget: true,
                    trekkerMinsterett: true,
                    trekkerDager: true,
                    årsak: PeriodeResultatÅrsak.ANNET,
                },
                flerbarnsdager: false,
                forelder: Forelder.mor,
            },
            {
                fom: '2025-09-30',
                tom: '2026-01-19',
                kontoType: StønadskontoType.Foreldrepenger,
                resultat: {
                    innvilget: true,
                    trekkerMinsterett: true,
                    trekkerDager: true,
                    årsak: PeriodeResultatÅrsak.ANNET,
                },
                flerbarnsdager: false,
                forelder: Forelder.mor,
            },
            {
                fom: '2026-02-24',
                tom: '2026-06-15',
                kontoType: StønadskontoType.Foreldrepenger,
                resultat: {
                    innvilget: true,
                    trekkerMinsterett: true,
                    trekkerDager: true,
                    årsak: PeriodeResultatÅrsak.ANNET,
                },
                flerbarnsdager: false,
                forelder: Forelder.mor,
            },
        ],
        valgtStønadskonto: {} as any,
    },
};

export const PrematurUker: Story = {
    name: 'Mor har prematuruker',
    args: {
        bareFarMedmorHarRett: false,
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2025-08-13'],
            termindato: '2025-10-19',
            antallBarn: 1,
        },
        erAleneOmOmsorg: false,
        erFarEllerMedmor: false,
        familiehendelsedato: '2025-08-13',
        familiesituasjon: 'fødsel',
        førsteUttaksdagNesteBarnsSak: undefined,
        gjelderAdopsjon: false,
        harAktivitetskravIPeriodeUtenUttak: false,
        modus: 'innsyn',
        navnPåForeldre: {
            farMedmor: 'Annen forelder',
            mor: 'Avansert',
        },
        søkersPerioder: [
            {
                fom: '2025-08-13',
                tom: '2025-10-10',
                kontoType: StønadskontoType.Fellesperiode,
                resultat: {
                    innvilget: false,
                    trekkerMinsterett: true,
                    trekkerDager: true,
                    årsak: PeriodeResultatÅrsak.AVSLAG_FRATREKK_PLEIEPENGER,
                },
                utsettelseÅrsak: UtsettelseÅrsakType.InstitusjonBarnet,
                flerbarnsdager: false,
                forelder: Forelder.mor,
            },
            {
                fom: '2025-10-11',
                tom: '2025-11-25',
                kontoType: StønadskontoType.Mødrekvote,
                resultat: {
                    innvilget: true,
                    trekkerMinsterett: true,
                    trekkerDager: true,
                    årsak: PeriodeResultatÅrsak.ANNET,
                },
                flerbarnsdager: false,
                forelder: Forelder.mor,
            },
        ],
        valgtStønadskonto: {} as any,
    },
};
