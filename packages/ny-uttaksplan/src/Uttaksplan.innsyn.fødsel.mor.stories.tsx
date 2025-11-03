import { Meta, StoryObj } from '@storybook/react-vite';

import { BarnType, Forelder } from '@navikt/fp-constants';

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
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                resultat: {
                    innvilget: true,
                    trekkerMinsterett: true,
                    trekkerDager: true,
                    årsak: 'ANNET',
                },
                flerbarnsdager: false,
                forelder: Forelder.mor,
            },
            {
                fom: '2025-09-30',
                tom: '2026-01-19',
                kontoType: 'FORELDREPENGER',
                resultat: {
                    innvilget: true,
                    trekkerMinsterett: true,
                    trekkerDager: true,
                    årsak: 'ANNET',
                },
                flerbarnsdager: false,
                forelder: Forelder.mor,
            },
            {
                fom: '2026-02-24',
                tom: '2026-06-15',
                kontoType: 'FORELDREPENGER',
                resultat: {
                    innvilget: true,
                    trekkerMinsterett: true,
                    trekkerDager: true,
                    årsak: 'ANNET',
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
                kontoType: 'FELLESPERIODE',
                resultat: {
                    innvilget: false,
                    trekkerMinsterett: true,
                    trekkerDager: true,
                    årsak: 'AVSLAG_FRATREKK_PLEIEPENGER',
                },
                utsettelseÅrsak: 'BARN_INNLAGT',
                flerbarnsdager: false,
                forelder: Forelder.mor,
            },
            {
                fom: '2025-10-11',
                tom: '2025-11-25',
                kontoType: 'MØDREKVOTE',
                resultat: {
                    innvilget: true,
                    trekkerMinsterett: true,
                    trekkerDager: true,
                    årsak: 'ANNET',
                },
                flerbarnsdager: false,
                forelder: Forelder.mor,
            },
        ],
        valgtStønadskonto: {} as any,
    },
};
