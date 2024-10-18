import { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';

import { Accordion } from '@navikt/ds-react';

import { Forelder } from '@navikt/fp-common';
import { BarnType, StønadskontoType } from '@navikt/fp-constants';
import { ArbeidsgiverInfoType, Barn, UttakArbeidType } from '@navikt/fp-types';

import { UttaksplanContextDataType, UttaksplanDataContext } from '../../context/UttaksplanDataContext';
import { PeriodeHullType } from '../../types/Planperiode';
import PeriodeListeItem from './PeriodeListeItem';

type StoryArgs = { erFarEllerMedmor: boolean; familiehendelsedato: string; barn: Barn } & ComponentProps<
    typeof PeriodeListeItem
>;

const customRenderer = ({
    erFarEllerMedmor,
    erFamiliehendelse,
    permisjonsperiode,
    familiehendelsedato,
    barn,
}: StoryArgs) => {
    return (
        <UttaksplanDataContext
            initialState={{
                [UttaksplanContextDataType.ER_FAR_ELLER_MEDMOR]: erFarEllerMedmor,
                [UttaksplanContextDataType.BARN]: barn,
                [UttaksplanContextDataType.FAMILIEHENDELSEDATO]: familiehendelsedato,
                [UttaksplanContextDataType.NAVN_PÅ_FORELDRE]: {
                    farMedmor: 'Far',
                    mor: 'Mor',
                },
            }}
        >
            <div style={{ maxWidth: '704px', margin: '2rem 4rem' }}>
                <Accordion>
                    <PeriodeListeItem erFamiliehendelse={erFamiliehendelse} permisjonsperiode={permisjonsperiode} />
                </Accordion>
            </div>
        </UttaksplanDataContext>
    );
};

const meta = {
    title: 'components/PeriodeListeItem',
    component: PeriodeListeItem,
    render: customRenderer,
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const UttaksperiodeMor: Story = {
    args: {
        barn: {
            antallBarn: 1,
            fødselsdatoer: ['2024-06-01'],
            type: BarnType.FØDT,
            termindato: '2024-06-01',
        },
        erFarEllerMedmor: false,
        familiehendelsedato: '2024-06-01',
        permisjonsperiode: {
            tidsperiode: {
                fom: '2024-06-01',
                tom: '2024-06-30',
            },
            forelder: Forelder.mor,
            perioder: [
                {
                    id: '88638814-3912-1440-03308-2381934996836',
                    fom: '2024-06-01',
                    tom: '2024-06-30',
                    forelder: Forelder.mor,
                    kontoType: StønadskontoType.Mødrekvote,
                    gjelderAnnenPart: false,
                },
            ],
        },
    },
};

export const UttaksperiodeMorFlerePerioder: Story = {
    args: {
        barn: {
            antallBarn: 1,
            fødselsdatoer: ['2024-06-01'],
            type: BarnType.FØDT,
            termindato: '2024-06-01',
        },
        erFarEllerMedmor: false,
        familiehendelsedato: '2024-06-01',
        permisjonsperiode: {
            tidsperiode: {
                fom: '2024-06-01',
                tom: '2024-07-26',
            },
            forelder: Forelder.mor,
            perioder: [
                {
                    id: '88638814-3912-1440-03308-2381934996836',
                    fom: '2024-06-01',
                    tom: '2024-06-28',
                    forelder: Forelder.mor,
                    kontoType: StønadskontoType.Mødrekvote,
                    gjelderAnnenPart: false,
                },
                {
                    id: '88638814-3912-1440-03308-2381934996836',
                    fom: '2024-07-01',
                    tom: '2024-07-26',
                    forelder: Forelder.mor,
                    kontoType: StønadskontoType.Fellesperiode,
                    gjelderAnnenPart: false,
                },
            ],
        },
    },
};

export const UttaksperiodeMorFlerePerioderInkludererGradering: Story = {
    args: {
        barn: {
            antallBarn: 1,
            fødselsdatoer: ['2024-06-01'],
            type: BarnType.FØDT,
            termindato: '2024-06-01',
        },
        erFarEllerMedmor: false,
        familiehendelsedato: '2024-06-01',
        permisjonsperiode: {
            tidsperiode: {
                fom: '2024-06-01',
                tom: '2024-07-26',
            },
            forelder: Forelder.mor,
            perioder: [
                {
                    id: '88638814-3912-1440-03308-2381934996836',
                    fom: '2024-06-01',
                    tom: '2024-06-28',
                    kontoType: StønadskontoType.Mødrekvote,
                    gjelderAnnenPart: false,
                },
                {
                    id: '88638814-3912-1440-03308-2381934996836',
                    fom: '2024-07-01',
                    tom: '2024-07-26',
                    forelder: Forelder.mor,
                    kontoType: StønadskontoType.Fellesperiode,
                    gjelderAnnenPart: false,
                },
                {
                    id: '88638814-3912-1440-03308-2381934996836',
                    fom: '2024-07-29',
                    tom: '2024-08-23',
                    forelder: Forelder.mor,
                    kontoType: StønadskontoType.Fellesperiode,
                    gradering: {
                        aktivitet: {
                            type: UttakArbeidType.ORDINÆRT_ARBEID,
                            arbeidsgiver: {
                                id: '1',
                                navn: 'TESTY TEST',
                                type: ArbeidsgiverInfoType.ORGANISASJON,
                            },
                        },
                        arbeidstidprosent: 50,
                    },
                    gjelderAnnenPart: false,
                },
            ],
        },
    },
};

export const UttaksperiodeFar: Story = {
    args: {
        barn: {
            antallBarn: 1,
            fødselsdatoer: ['2024-06-01'],
            type: BarnType.FØDT,
            termindato: '2024-06-01',
        },
        erFarEllerMedmor: true,
        familiehendelsedato: '2024-06-01',
        permisjonsperiode: {
            tidsperiode: {
                fom: '2024-06-01',
                tom: '2024-06-28',
            },
            forelder: Forelder.farMedmor,
            perioder: [
                {
                    id: '88638814-3912-1440-03308-2381934996836',
                    fom: '2024-06-01',
                    tom: '2024-06-28',
                    forelder: Forelder.farMedmor,
                    kontoType: StønadskontoType.Fedrekvote,
                    gjelderAnnenPart: false,
                },
            ],
        },
    },
};

export const PeriodeUtenUttak: Story = {
    args: {
        barn: {
            antallBarn: 1,
            fødselsdatoer: ['2024-08-01'],
            type: BarnType.FØDT,
            termindato: '2024-08-01',
        },
        erFarEllerMedmor: false,
        familiehendelsedato: '2024-08-01',
        permisjonsperiode: {
            erPeriodeUtenUttak: true,
            tidsperiode: {
                fom: '2024-08-01',
                tom: '2024-08-31',
            },
            perioder: [
                {
                    id: '88638814-3912-1440-03308-2381934996836',
                    fom: '2024-08-01',
                    tom: '2024-08-31',
                    gjelderAnnenPart: false,
                    periodeHullÅrsak: PeriodeHullType.PERIODE_UTEN_UTTAK,
                },
            ],
        },
    },
};
