import { Meta, StoryObj } from '@storybook/react-vite';
import { ComponentProps } from 'react';
import { action } from 'storybook/actions';

import { BarnType } from '@navikt/fp-constants';

import { UttaksplanDataProvider } from '../../context/UttaksplanDataContext';
import { UttaksplanLegend } from './UttaksplanLegend';

const MINSTERETTER = {
    farRundtFødsel: 10,
    toTette: 0,
};

const meta = {
    title: 'UttaksplanLegend',
    component: UttaksplanLegend,
    args: {
        modus: 'søknad',

        valgtStønadskonto: {
            kontoer: [
                { konto: 'MØDREKVOTE', dager: 95 },
                { konto: 'FEDREKVOTE', dager: 95 },
                { konto: 'FELLESPERIODE', dager: 101 },
                { konto: 'FORELDREPENGER_FØR_FØDSEL', dager: 15 },
            ],
            minsteretter: MINSTERETTER,
        },
        aleneOmOmsorg: false,
        erMedmorDelAvSøknaden: false,
        navnPåForeldre: { mor: 'Hanne', farMedmor: 'Hans' },
        saksperioder: [],
        children: null,
        selectLegend: action('select-legend'),
        skjulTekstSomDefault: false,
    },
    render: (args) => {
        return (
            <UttaksplanDataProvider
                barn={args.barn}
                erFarEllerMedmor={args.erFarEllerMedmor}
                navnPåForeldre={args.navnPåForeldre}
                modus={args.modus}
                valgtStønadskonto={args.valgtStønadskonto}
                aleneOmOmsorg={args.aleneOmOmsorg || false}
                erMedmorDelAvSøknaden={args.erMedmorDelAvSøknaden || false}
                bareFarMedmorHarRett={args.bareFarMedmorHarRett || false}
                harAktivitetskravIPeriodeUtenUttak={false}
                erDeltUttak={args.erDeltUttak || false}
                saksperioder={args.saksperioder}
            >
                <UttaksplanLegend
                    perioderForKalendervisning={args.perioderForKalendervisning}
                    selectLegend={args.selectLegend}
                    readOnly={args.readOnly}
                    skjulTekstSomDefault={args.skjulTekstSomDefault}
                />
            </UttaksplanDataProvider>
        );
    },
} satisfies Meta<ComponentProps<typeof UttaksplanDataProvider> & ComponentProps<typeof UttaksplanLegend>>;
export default meta;

type Story = StoryObj<typeof meta>;

export const VisAlleMedTekst: Story = {
    args: {
        perioderForKalendervisning: [
            {
                fom: '2024-03-14',
                tom: '2024-04-03',
                color: 'PINK',
                legendLabel: 'ADOPSJON',
            },
            {
                fom: '2024-04-04',
                tom: '2024-04-18',
                color: 'BLUE',
                legendLabel: 'MORS_DEL',
            },
            {
                fom: '2024-05-17',
                tom: '2024-05-23',
                color: 'GREEN',
                legendLabel: 'FARS_DEL',
            },
            {
                fom: '2024-05-31',
                tom: '2024-06-13',
                color: 'LIGHTGREENBLUE',
                legendLabel: 'SAMTIDIG_UTTAK',
            },
            {
                fom: '2024-06-14',
                tom: '2024-06-27',
                color: 'BLACK',
                legendLabel: 'TAPTE_DAGER',
            },
            {
                fom: '2024-06-28',
                tom: '2024-07-02',
                color: 'GREENOUTLINE',
                legendLabel: 'MORS_DEL_GRADERT',
            },
            {
                fom: '2024-06-28',
                tom: '2024-07-02',
                color: 'BLUEOUTLINE',
                legendLabel: 'UTSETTELSE',
            },
            {
                fom: '2024-07-03',
                tom: '2024-07-15',
                color: 'GREENSTRIPED',
                legendLabel: 'FARS_DEL_AKTIVITETSFRI',
            },
        ],
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2024-04-04'],
            antallBarn: 1,
        },
        erDeltUttak: true,
        erFarEllerMedmor: false,
        harAktivitetskravIPeriodeUtenUttak: false,
        bareFarMedmorHarRett: false,
        readOnly: false,
    },
};
export const VisAlleUtenTekst: Story = {
    args: {
        ...VisAlleMedTekst.args,
        skjulTekstSomDefault: true,
        readOnly: true,
    },
};
