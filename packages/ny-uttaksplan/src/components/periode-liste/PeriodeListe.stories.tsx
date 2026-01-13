import { Meta, StoryObj } from '@storybook/react-vite';
import { ComponentProps } from 'react';

import { BarnType } from '@navikt/fp-constants';
import { Barn } from '@navikt/fp-types';

import { UttaksplanDataProvider } from '../../context/UttaksplanDataContext';
import { PeriodeListe } from './PeriodeListe';

type StoryArgs = {
    familiehendelsedato: string;
    barn: Barn;
    erFarEllerMedmor: boolean;
    erAleneOmOmsorg: boolean;
} & ComponentProps<typeof PeriodeListe>;

const customRenderer = ({
    saksperioderInkludertHull,
    barn,
    erFarEllerMedmor,
    erAleneOmOmsorg,
    handleAddPeriode,
    handleUpdatePeriode,
    handleDeletePerioder,
    isReadOnly,
}: StoryArgs) => {
    return (
        <UttaksplanDataProvider
            foreldreInfo={{
                rettighetType: erAleneOmOmsorg ? 'ALENEOMSORG' : 'BEGGE_RETT',
                søker: erFarEllerMedmor ? 'FAR_ELLER_MEDMOR' : 'MOR',
                navnPåForeldre: {
                    farMedmor: 'Far',
                    mor: 'Mor',
                },
                erMedmorDelAvSøknaden: true,
            }}
            barn={barn}
            //eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            valgtStønadskonto={{} as any}
            harAktivitetskravIPeriodeUtenUttak={false}
            saksperioder={[]}
        >
            <div style={{ maxWidth: '704px', margin: '2rem 4rem' }}>
                <PeriodeListe
                    isReadOnly={isReadOnly}
                    handleAddPeriode={handleAddPeriode}
                    handleUpdatePeriode={handleUpdatePeriode}
                    handleDeletePerioder={handleDeletePerioder}
                    saksperioderInkludertHull={saksperioderInkludertHull}
                />
            </div>
        </UttaksplanDataProvider>
    );
};

const meta = {
    title: 'components/PeriodeListe',
    component: PeriodeListe,
    render: customRenderer,
    args: {
        isReadOnly: false,
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const UttaksperioderMor: Story = {
    name: 'Mor søker',
    args: {
        handleAddPeriode: () => null,
        handleUpdatePeriode: () => null,
        handleDeletePerioder: () => null,
        erFarEllerMedmor: false,
        familiehendelsedato: '2024-04-22',
        erAleneOmOmsorg: false,
        barn: {
            type: BarnType.FØDT,
            antallBarn: 1,
            fødselsdatoer: ['2024-04-20'],
            fnr: ['19482356071'],
        },
        saksperioderInkludertHull: [
            {
                fom: '2024-04-01',
                tom: '2024-04-19',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                forelder: 'MOR',
            },
            {
                fom: '2024-04-20',
                tom: '2024-04-21',
                hullType: 'TAPTE_DAGER',
            },
            {
                fom: '2024-04-22',
                tom: '2024-05-31',
                kontoType: 'MØDREKVOTE',
                forelder: 'MOR',
            },
            {
                fom: '2024-06-03',
                tom: '2024-06-10',
                hullType: 'PERIODE_UTEN_UTTAK',
            },
            {
                fom: '2024-06-11',
                tom: '2024-06-28',
                kontoType: 'FELLESPERIODE',
                forelder: 'MOR',
                samtidigUttak: 50,
            },
            {
                fom: '2024-07-01',
                tom: '2024-07-02',
                kontoType: 'FEDREKVOTE',
                forelder: 'FAR_MEDMOR',
            },
            {
                fom: '2024-07-03',
                tom: '2024-07-10',
                kontoType: 'MØDREKVOTE',
                forelder: 'MOR',
                gradering: {
                    aktivitet: {
                        type: 'ORDINÆRT_ARBEID',
                        arbeidsgiver: {
                            id: '1',
                            type: 'ORGANISASJON',
                        },
                    },
                    arbeidstidprosent: 20,
                },
            },
        ],
    },
};

export const UttaksperioderMorOgFar: Story = {
    name: 'Mor og far med samtidig uttak',
    args: {
        handleAddPeriode: () => null,
        handleUpdatePeriode: () => null,
        handleDeletePerioder: () => null,
        erFarEllerMedmor: false,
        familiehendelsedato: '2024-04-22',
        erAleneOmOmsorg: false,
        barn: {
            type: BarnType.FØDT,
            antallBarn: 1,
            fødselsdatoer: ['2023-08-19'],
            termindato: '2023-08-15',
            fnr: ['19482356071'],
        },
        saksperioderInkludertHull: [
            {
                fom: '2024-04-01',
                tom: '2024-04-19',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                forelder: 'MOR',
            },
            {
                fom: '2024-04-22',
                tom: '2024-05-03',
                kontoType: 'MØDREKVOTE',
                forelder: 'MOR',
                samtidigUttak: 100,
            },
            {
                fom: '2024-04-22',
                tom: '2024-05-03',
                kontoType: 'FEDREKVOTE',
                forelder: 'FAR_MEDMOR',
                samtidigUttak: 100,
            },
            {
                fom: '2024-05-06',
                tom: '2024-05-31',
                kontoType: 'MØDREKVOTE',
                forelder: 'MOR',
            },
            {
                fom: '2024-06-03',
                tom: '2024-06-28',
                kontoType: 'FEDREKVOTE',
                forelder: 'FAR_MEDMOR',
            },
            {
                fom: '2024-07-01',
                tom: '2024-07-08',
                kontoType: 'FELLESPERIODE',
                forelder: 'FAR_MEDMOR',
            },
        ],
    },
};

export const UttaksperioderFarMorIkkeRett: Story = {
    name: 'Far søker og mor har ikke rett',
    args: {
        handleAddPeriode: () => null,
        handleUpdatePeriode: () => null,
        handleDeletePerioder: () => null,
        erFarEllerMedmor: true,
        familiehendelsedato: '2024-05-01',
        erAleneOmOmsorg: true,
        barn: {
            type: BarnType.FØDT,
            antallBarn: 1,
            fødselsdatoer: ['2023-08-19'],
            termindato: '2023-08-15',
            fnr: ['19482356071'],
        },
        saksperioderInkludertHull: [
            {
                fom: '2024-05-01',
                tom: '2024-08-21',
                kontoType: 'FORELDREPENGER',
                forelder: 'FAR_MEDMOR',
            },
            {
                fom: '2024-08-22',
                tom: '2024-08-29',
                kontoType: 'FORELDREPENGER',
                morsAktivitet: 'IKKE_OPPGITT',
                forelder: 'FAR_MEDMOR',
            },
            {
                fom: '2024-08-30',
                tom: '2024-09-13',
                hullType: 'PERIODE_UTEN_UTTAK',
            },
            {
                fom: '2024-09-16',
                tom: '2024-09-23',
                kontoType: 'FORELDREPENGER',
                forelder: 'FAR_MEDMOR',
                gradering: {
                    aktivitet: {
                        type: 'ORDINÆRT_ARBEID',
                        arbeidsgiver: {
                            id: '1',
                            type: 'ORGANISASJON',
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
        handleAddPeriode: () => null,
        handleUpdatePeriode: () => null,
        handleDeletePerioder: () => null,
        erFarEllerMedmor: false,
        familiehendelsedato: '2024-04-22',
        erAleneOmOmsorg: false,
        barn: {
            type: BarnType.FØDT,
            antallBarn: 1,
            fødselsdatoer: ['2023-08-19'],
            termindato: '2023-08-15',
            fnr: ['19482356071'],
        },
        saksperioderInkludertHull: [
            {
                fom: '2024-04-01',
                tom: '2024-04-19',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                forelder: 'MOR',
            },
            {
                fom: '2024-04-22',
                tom: '2024-05-31',
                kontoType: 'MØDREKVOTE',
                forelder: 'MOR',
                flerbarnsdager: true,
                samtidigUttak: 100,
            },
            {
                fom: '2024-04-22',
                tom: '2024-05-31',
                kontoType: 'FEDREKVOTE',
                forelder: 'FAR_MEDMOR',
                flerbarnsdager: true,
                samtidigUttak: 100,
            },
        ],
    },
};

export const UttaksperioderMorIkkeSøktFørsteSeksUker: Story = {
    name: 'Mor har ikke lagt inn uttak første seks uker',
    args: {
        handleAddPeriode: () => null,
        handleUpdatePeriode: () => null,
        handleDeletePerioder: () => null,
        erFarEllerMedmor: false,
        familiehendelsedato: '2024-04-22',
        erAleneOmOmsorg: false,
        barn: {
            type: BarnType.FØDT,
            antallBarn: 1,
            fødselsdatoer: ['2023-08-19'],
            termindato: '2023-08-15',
            fnr: ['19482356071'],
        },
        saksperioderInkludertHull: [
            {
                fom: '2024-04-01',
                tom: '2024-04-19',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                forelder: 'MOR',
            },
            {
                fom: '2024-04-22',
                tom: '2024-05-31',
                hullType: 'PERIODE_UTEN_UTTAK',
            },
            {
                fom: '2024-06-03',
                tom: '2024-06-28',
                kontoType: 'MØDREKVOTE',
                forelder: 'MOR',
            },
        ],
    },
};

export const UttaksperioderMorInnlagtFørsteSeksUker: Story = {
    name: 'Mor er innlagt første seks uker',
    args: {
        handleAddPeriode: () => null,
        handleUpdatePeriode: () => null,
        handleDeletePerioder: () => null,
        erFarEllerMedmor: false,
        familiehendelsedato: '2024-04-22',
        erAleneOmOmsorg: false,
        barn: {
            type: BarnType.FØDT,
            antallBarn: 1,
            fødselsdatoer: ['2023-08-19'],
            termindato: '2023-08-15',
            fnr: ['19482356071'],
        },
        saksperioderInkludertHull: [
            {
                fom: '2024-04-01',
                tom: '2024-04-19',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                forelder: 'MOR',
            },
            {
                fom: '2024-04-22',
                tom: '2024-05-31',
                utsettelseÅrsak: 'SØKER_INNLAGT',
                forelder: 'MOR',
            },
            {
                fom: '2024-06-03',
                tom: '2024-06-28',
                kontoType: 'MØDREKVOTE',
                forelder: 'MOR',
            },
        ],
    },
};
