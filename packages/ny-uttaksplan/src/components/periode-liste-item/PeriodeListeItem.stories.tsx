import { Meta, StoryObj } from '@storybook/react-vite';
import { ComponentProps } from 'react';

import { Accordion } from '@navikt/ds-react';

import { BarnType } from '@navikt/fp-constants';
import { Barn, KontoBeregningDto } from '@navikt/fp-types';

import { UttaksplanDataProvider } from '../../context/UttaksplanDataContext';
import { PeriodeHullType } from '../../types/Planperiode';
import { PeriodeListeItem } from './PeriodeListeItem';

const kontoNårBeggeHarRett = {
    kontoer: [
        {
            konto: 'FELLESPERIODE',
            dager: 80,
        },
        {
            konto: 'MØDREKVOTE',
            dager: 75,
        },
        {
            konto: 'FEDREKVOTE',
            dager: 75,
        },
        {
            konto: 'FORELDREPENGER_FØR_FØDSEL',
            dager: 15,
        },
    ],
    minsteretter: {
        farRundtFødsel: 0,
        toTette: 0,
    },
    tillegg: {
        flerbarn: 0,
        prematur: 0,
    },
} satisfies KontoBeregningDto;

type StoryArgs = {
    erFarEllerMedmor: boolean;
    familiehendelsedato: string;
    barn: Barn;
    erAleneOmOmsorg: boolean;
} & ComponentProps<typeof PeriodeListeItem>;

const customRenderer = ({
    erFarEllerMedmor,
    erFamiliehendelse,
    permisjonsperiode,
    erAleneOmOmsorg,
    handleAddPeriode,
    handleUpdatePeriode,
    handleDeletePeriode,
    handleDeletePerioder,
    barn,
}: StoryArgs) => {
    return (
        <UttaksplanDataProvider
            erFarEllerMedmor={erFarEllerMedmor}
            barn={barn}
            aleneOmOmsorg={erAleneOmOmsorg}
            modus="planlegger"
            navnPåForeldre={{
                farMedmor: 'Far',
                mor: 'Mor',
            }}
            valgtStønadskonto={kontoNårBeggeHarRett}
            erMedmorDelAvSøknaden
            bareFarMedmorHarRett={false}
            harAktivitetskravIPeriodeUtenUttak={false}
            erDeltUttak
            saksperioder={[]}
            erFlereUttaksplanversjoner={false}
        >
            <div style={{ maxWidth: '704px', margin: '2rem 4rem' }}>
                <Accordion>
                    <PeriodeListeItem
                        handleAddPeriode={handleAddPeriode}
                        handleUpdatePeriode={handleUpdatePeriode}
                        handleDeletePeriode={handleDeletePeriode}
                        handleDeletePerioder={handleDeletePerioder}
                        erFamiliehendelse={erFamiliehendelse}
                        permisjonsperiode={permisjonsperiode}
                    />
                </Accordion>
            </div>
        </UttaksplanDataProvider>
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
        handleAddPeriode: () => null,
        handleUpdatePeriode: () => null,
        handleDeletePeriode: () => null,
        handleDeletePerioder: () => null,
        barn: {
            antallBarn: 1,
            fødselsdatoer: ['2024-06-01'],
            type: BarnType.FØDT,
            termindato: '2024-06-01',
        },
        erAleneOmOmsorg: false,
        erFarEllerMedmor: false,
        familiehendelsedato: '2024-06-01',
        permisjonsperiode: {
            tidsperiode: {
                fom: '2024-06-01',
                tom: '2024-06-30',
            },
            forelder: 'MOR',
            perioder: [
                {
                    erAnnenPartEøs: false,
                    id: '88638814-3912-1440-03308-2381934996836',
                    fom: '2024-06-01',
                    tom: '2024-06-30',
                    forelder: 'MOR',
                    kontoType: 'MØDREKVOTE',
                    readOnly: false,
                },
            ],
        },
    },
};

export const UttaksperiodeMorFlerePerioder: Story = {
    args: {
        handleAddPeriode: () => null,
        handleUpdatePeriode: () => null,
        handleDeletePeriode: () => null,
        handleDeletePerioder: () => null,
        barn: {
            antallBarn: 1,
            fødselsdatoer: ['2024-06-01'],
            type: BarnType.FØDT,
            termindato: '2024-06-01',
        },
        erAleneOmOmsorg: false,
        erFarEllerMedmor: false,
        familiehendelsedato: '2024-06-01',
        permisjonsperiode: {
            tidsperiode: {
                fom: '2024-06-01',
                tom: '2024-07-26',
            },
            forelder: 'MOR',
            perioder: [
                {
                    erAnnenPartEøs: false,
                    id: '88638814-3912-1440-03308-2381934996836',
                    fom: '2024-06-01',
                    tom: '2024-06-28',
                    forelder: 'MOR',
                    kontoType: 'MØDREKVOTE',
                    readOnly: false,
                },
                {
                    erAnnenPartEøs: false,
                    id: '88638814-3912-1440-03308-2381934996836',
                    fom: '2024-07-01',
                    tom: '2024-07-26',
                    forelder: 'MOR',
                    kontoType: 'FELLESPERIODE',
                    readOnly: false,
                },
            ],
        },
    },
};

export const UttaksperiodeMorFlerePerioderInkludererGradering: Story = {
    args: {
        handleAddPeriode: () => null,
        handleUpdatePeriode: () => null,
        handleDeletePeriode: () => null,
        handleDeletePerioder: () => null,
        barn: {
            antallBarn: 1,
            fødselsdatoer: ['2024-06-01'],
            type: BarnType.FØDT,
            termindato: '2024-06-01',
        },
        erAleneOmOmsorg: false,
        erFarEllerMedmor: false,
        familiehendelsedato: '2024-06-01',
        permisjonsperiode: {
            tidsperiode: {
                fom: '2024-06-01',
                tom: '2024-07-26',
            },
            forelder: 'MOR',
            perioder: [
                {
                    erAnnenPartEøs: false,
                    id: '88638814-3912-1440-03308-2381934996836',
                    fom: '2024-06-01',
                    tom: '2024-06-28',
                    kontoType: 'MØDREKVOTE',
                    readOnly: false,
                },
                {
                    erAnnenPartEøs: false,
                    id: '88638814-3912-1440-03308-2381934996836',
                    fom: '2024-07-01',
                    tom: '2024-07-26',
                    forelder: 'MOR',
                    kontoType: 'FELLESPERIODE',
                    readOnly: false,
                },
                {
                    erAnnenPartEøs: false,
                    id: '88638814-3912-1440-03308-2381934996836',
                    fom: '2024-07-29',
                    tom: '2024-08-23',
                    forelder: 'MOR',
                    kontoType: 'FELLESPERIODE',
                    gradering: {
                        aktivitet: {
                            type: 'ORDINÆRT_ARBEID',
                            arbeidsgiver: {
                                id: '1',
                                type: 'ORGANISASJON',
                            },
                        },
                        arbeidstidprosent: 50,
                    },
                    readOnly: false,
                },
            ],
        },
    },
};

export const UttaksperiodeFar: Story = {
    args: {
        handleAddPeriode: () => null,
        handleUpdatePeriode: () => null,
        handleDeletePeriode: () => null,
        handleDeletePerioder: () => null,
        barn: {
            antallBarn: 1,
            fødselsdatoer: ['2024-06-01'],
            type: BarnType.FØDT,
            termindato: '2024-06-01',
        },
        erAleneOmOmsorg: false,
        erFarEllerMedmor: true,
        familiehendelsedato: '2024-06-01',
        permisjonsperiode: {
            tidsperiode: {
                fom: '2024-06-01',
                tom: '2024-06-28',
            },
            forelder: 'FAR_MEDMOR',
            perioder: [
                {
                    erAnnenPartEøs: false,
                    id: '88638814-3912-1440-03308-2381934996836',
                    fom: '2024-06-01',
                    tom: '2024-06-28',
                    forelder: 'FAR_MEDMOR',
                    kontoType: 'FEDREKVOTE',
                    readOnly: false,
                },
            ],
        },
    },
};

export const PeriodeUtenUttak: Story = {
    args: {
        handleAddPeriode: () => null,
        handleUpdatePeriode: () => null,
        handleDeletePeriode: () => null,
        handleDeletePerioder: () => null,
        barn: {
            antallBarn: 1,
            fødselsdatoer: ['2024-08-01'],
            type: BarnType.FØDT,
            termindato: '2024-08-01',
        },
        erAleneOmOmsorg: false,
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
                    erAnnenPartEøs: false,
                    id: '88638814-3912-1440-03308-2381934996836',
                    fom: '2024-08-01',
                    tom: '2024-08-31',
                    readOnly: false,
                    periodeHullÅrsak: PeriodeHullType.PERIODE_UTEN_UTTAK,
                },
            ],
        },
    },
};
