import { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';

import { Forelder } from '@navikt/fp-common';
import { BarnType, StønadskontoType } from '@navikt/fp-constants';
import { ArbeidsgiverInfoType, Barn, UtsettelseÅrsakType, UttakArbeidType } from '@navikt/fp-types';

import { UttaksplanContextDataType, UttaksplanDataContext } from '../../context/UttaksplanDataContext';
import { PeriodeHullType } from '../../types/Planperiode';
import { PeriodeListe } from './PeriodeListe';

type StoryArgs = { familiehendelsedato: string; barn: Barn; erFarEllerMedmor: boolean } & ComponentProps<
    typeof PeriodeListe
>;

const customRenderer = ({
    perioder,
    familiehendelsedato,
    barn,
    erFarEllerMedmor,
    handleUpdatePeriode,
    handleDeletePeriode,
    handleDeletePerioder,
}: StoryArgs) => {
    return (
        <UttaksplanDataContext
            initialState={{
                [UttaksplanContextDataType.ER_FAR_ELLER_MEDMOR]: erFarEllerMedmor,
                [UttaksplanContextDataType.FAMILIEHENDELSEDATO]: familiehendelsedato,
                [UttaksplanContextDataType.BARN]: barn,
                [UttaksplanContextDataType.NAVN_PÅ_FORELDRE]: {
                    farMedmor: 'Far',
                    mor: 'Mor',
                },
            }}
        >
            <div style={{ maxWidth: '704px', margin: '2rem 4rem' }}>
                <PeriodeListe
                    perioder={perioder}
                    handleUpdatePeriode={handleUpdatePeriode}
                    handleDeletePeriode={handleDeletePeriode}
                    handleDeletePerioder={handleDeletePerioder}
                />
            </div>
        </UttaksplanDataContext>
    );
};

const meta = {
    title: 'components/PeriodeListe',
    component: PeriodeListe,
    render: customRenderer,
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const UttaksperioderMor: Story = {
    name: 'Mor søker',
    args: {
        handleUpdatePeriode: () => null,
        handleDeletePeriode: () => null,
        handleDeletePerioder: () => null,
        erFarEllerMedmor: false,
        familiehendelsedato: '2024-04-22',
        barn: {
            type: BarnType.FØDT,
            antallBarn: 1,
            fødselsdatoer: ['2023-08-19'],
            termindato: '2023-08-15',
            fnr: ['19482356071'],
        },
        perioder: [
            {
                id: '1',
                fom: '2024-04-01',
                tom: '2024-04-19',
                kontoType: StønadskontoType.ForeldrepengerFørFødsel,
                forelder: Forelder.mor,
                readOnly: false,
            },
            {
                id: '2',
                fom: '2024-04-22',
                tom: '2024-05-31',
                kontoType: StønadskontoType.Mødrekvote,
                forelder: Forelder.mor,
                readOnly: false,
            },
            {
                id: '3',
                fom: '2024-06-03',
                tom: '2024-06-10',
                periodeHullÅrsak: PeriodeHullType.PERIODE_UTEN_UTTAK,
                readOnly: false,
            },
            {
                id: '4',
                fom: '2024-06-11',
                tom: '2024-06-28',
                kontoType: StønadskontoType.Fellesperiode,
                forelder: Forelder.mor,
                samtidigUttak: 50,
                readOnly: false,
            },
            {
                id: '5',
                fom: '2024-07-01',
                tom: '2024-07-02',
                kontoType: StønadskontoType.Fedrekvote,
                forelder: Forelder.mor,
                readOnly: false,
            },
            {
                id: '6',
                fom: '2024-07-03',
                tom: '2024-07-10',
                kontoType: StønadskontoType.Mødrekvote,
                forelder: Forelder.mor,
                gradering: {
                    aktivitet: {
                        type: UttakArbeidType.ORDINÆRT_ARBEID,
                        arbeidsgiver: {
                            id: '1',
                            navn: 'TESTY TEST',
                            type: ArbeidsgiverInfoType.ORGANISASJON,
                        },
                    },
                    arbeidstidprosent: 20,
                },
                readOnly: false,
            },
        ],
    },
};

export const UttaksperioderMorOgFar: Story = {
    name: 'Mor og far med samtidig uttak',
    args: {
        handleUpdatePeriode: () => null,
        handleDeletePeriode: () => null,
        handleDeletePerioder: () => null,
        erFarEllerMedmor: false,
        familiehendelsedato: '2024-04-22',
        barn: {
            type: BarnType.FØDT,
            antallBarn: 1,
            fødselsdatoer: ['2023-08-19'],
            termindato: '2023-08-15',
            fnr: ['19482356071'],
        },
        perioder: [
            {
                id: '1',
                fom: '2024-04-01',
                tom: '2024-04-19',
                kontoType: StønadskontoType.ForeldrepengerFørFødsel,
                forelder: Forelder.mor,
                readOnly: false,
            },
            {
                id: '2',
                fom: '2024-04-22',
                tom: '2024-05-03',
                kontoType: StønadskontoType.Mødrekvote,
                forelder: Forelder.mor,
                samtidigUttak: 100,
                readOnly: false,
            },
            {
                id: '3',
                fom: '2024-04-22',
                tom: '2024-05-03',
                kontoType: StønadskontoType.Fedrekvote,
                forelder: Forelder.farMedmor,
                samtidigUttak: 100,
                readOnly: true,
            },
            {
                id: '4',
                fom: '2024-05-06',
                tom: '2024-05-31',
                kontoType: StønadskontoType.Mødrekvote,
                forelder: Forelder.mor,
                readOnly: false,
            },
            {
                id: '5',
                fom: '2024-06-03',
                tom: '2024-06-28',
                kontoType: StønadskontoType.Fedrekvote,
                forelder: Forelder.farMedmor,
                readOnly: true,
            },
            {
                id: '6',
                fom: '2024-07-01',
                tom: '2024-07-08',
                kontoType: StønadskontoType.Fellesperiode,
                forelder: Forelder.farMedmor,
                readOnly: true,
            },
        ],
    },
};

export const UttaksperioderFarMorIkkeRett: Story = {
    name: 'Far søker og mor har ikke rett',
    args: {
        handleUpdatePeriode: () => null,
        handleDeletePeriode: () => null,
        handleDeletePerioder: () => null,
        erFarEllerMedmor: true,
        familiehendelsedato: '2024-05-01',
        barn: {
            type: BarnType.FØDT,
            antallBarn: 1,
            fødselsdatoer: ['2023-08-19'],
            termindato: '2023-08-15',
            fnr: ['19482356071'],
        },
        perioder: [
            {
                id: '1',
                fom: '2024-05-01',
                tom: '2024-08-21',
                kontoType: StønadskontoType.Foreldrepenger,
                forelder: Forelder.farMedmor,
                readOnly: false,
            },
            {
                id: '2',
                fom: '2024-08-22',
                tom: '2024-08-29',
                kontoType: StønadskontoType.AktivitetsfriKvote,
                forelder: Forelder.farMedmor,
                readOnly: false,
            },
            {
                id: '2',
                fom: '2024-08-30',
                tom: '2024-09-13',
                periodeHullÅrsak: PeriodeHullType.PERIODE_UTEN_UTTAK,
                readOnly: false,
            },
            {
                id: '2',
                fom: '2024-09-16',
                tom: '2024-09-23',
                kontoType: StønadskontoType.Foreldrepenger,
                forelder: Forelder.farMedmor,
                readOnly: false,
                gradering: {
                    aktivitet: {
                        type: UttakArbeidType.ORDINÆRT_ARBEID,
                        arbeidsgiver: {
                            id: '1',
                            navn: 'TESTY TEST',
                            type: ArbeidsgiverInfoType.ORGANISASJON,
                        },
                    },
                    arbeidstidprosent: 80,
                },
            },
        ],
    },
};

export const UttaksperioderMorOgFarFlerbarnsdager: Story = {
    name: 'Mor og far med flerbarnsdager og samtidig uttak',
    args: {
        handleUpdatePeriode: () => null,
        handleDeletePeriode: () => null,
        handleDeletePerioder: () => null,
        erFarEllerMedmor: false,
        familiehendelsedato: '2024-04-22',
        barn: {
            type: BarnType.FØDT,
            antallBarn: 1,
            fødselsdatoer: ['2023-08-19'],
            termindato: '2023-08-15',
            fnr: ['19482356071'],
        },
        perioder: [
            {
                id: '1',
                fom: '2024-04-01',
                tom: '2024-04-19',
                kontoType: StønadskontoType.ForeldrepengerFørFødsel,
                forelder: Forelder.mor,
                readOnly: false,
            },
            {
                id: '2',
                fom: '2024-04-22',
                tom: '2024-05-31',
                kontoType: StønadskontoType.Mødrekvote,
                forelder: Forelder.mor,
                flerbarnsdager: true,
                samtidigUttak: 100,
                readOnly: false,
            },
            {
                id: '3',
                fom: '2024-04-22',
                tom: '2024-05-31',
                kontoType: StønadskontoType.Fedrekvote,
                forelder: Forelder.farMedmor,
                flerbarnsdager: true,
                samtidigUttak: 100,
                readOnly: true,
            },
        ],
    },
};

export const UttaksperioderMorIkkeSøktFørsteSeksUker: Story = {
    name: 'Mor har ikke lagt inn uttak første seks uker',
    args: {
        handleUpdatePeriode: () => null,
        handleDeletePeriode: () => null,
        handleDeletePerioder: () => null,
        erFarEllerMedmor: false,
        familiehendelsedato: '2024-04-22',
        barn: {
            type: BarnType.FØDT,
            antallBarn: 1,
            fødselsdatoer: ['2023-08-19'],
            termindato: '2023-08-15',
            fnr: ['19482356071'],
        },
        perioder: [
            {
                id: '1',
                fom: '2024-04-01',
                tom: '2024-04-19',
                kontoType: StønadskontoType.ForeldrepengerFørFødsel,
                forelder: Forelder.mor,
                readOnly: false,
            },
            {
                id: '2',
                fom: '2024-04-22',
                tom: '2024-05-31',
                periodeHullÅrsak: PeriodeHullType.PERIODE_UTEN_UTTAK,
                readOnly: false,
            },
            {
                id: '3',
                fom: '2024-06-03',
                tom: '2024-06-28',
                kontoType: StønadskontoType.Mødrekvote,
                forelder: Forelder.mor,
                readOnly: false,
            },
        ],
    },
};

export const UttaksperioderMorInnlagtFørsteSeksUker: Story = {
    name: 'Mor er innlagt første seks uker',
    args: {
        handleUpdatePeriode: () => null,
        handleDeletePeriode: () => null,
        handleDeletePerioder: () => null,
        erFarEllerMedmor: false,
        familiehendelsedato: '2024-04-22',
        barn: {
            type: BarnType.FØDT,
            antallBarn: 1,
            fødselsdatoer: ['2023-08-19'],
            termindato: '2023-08-15',
            fnr: ['19482356071'],
        },
        perioder: [
            {
                id: '1',
                fom: '2024-04-01',
                tom: '2024-04-19',
                kontoType: StønadskontoType.ForeldrepengerFørFødsel,
                forelder: Forelder.mor,
                readOnly: false,
            },
            {
                id: '2',
                fom: '2024-04-22',
                tom: '2024-05-31',
                utsettelseÅrsak: UtsettelseÅrsakType.InstitusjonSøker,
                forelder: Forelder.mor,
                readOnly: false,
            },
            {
                id: '3',
                fom: '2024-06-03',
                tom: '2024-06-28',
                kontoType: StønadskontoType.Mødrekvote,
                forelder: Forelder.mor,
                readOnly: false,
            },
        ],
    },
};
