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
        valgtStønadskonto: {
            kontoer: [
                { konto: 'MØDREKVOTE', dager: 95 },
                { konto: 'FEDREKVOTE', dager: 95 },
                { konto: 'FELLESPERIODE', dager: 101 },
                { konto: 'FORELDREPENGER_FØR_FØDSEL', dager: 15 },
            ],
            minsteretter: MINSTERETTER,
        },
        children: null,
        selectLegend: action('select-legend'),
        skjulTekstSomDefault: false,
    },
    render: (args) => {
        return (
            <UttaksplanDataProvider
                foreldreInfo={args.foreldreInfo}
                barn={args.barn}
                valgtStønadskonto={args.valgtStønadskonto}
                harAktivitetskravIPeriodeUtenUttak={false}
                uttakPerioder={args.uttakPerioder}
                erPeriodeneTilAnnenPartLåst={false}
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
                srText: 'Termindato',
            },
            {
                fom: '2024-04-04',
                tom: '2024-04-18',
                color: 'BLUE',
                srText: 'Mors del',
            },
            {
                fom: '2024-05-17',
                tom: '2024-05-23',
                color: 'GREEN',
                srText: 'Fars del',
            },
            {
                fom: '2024-05-31',
                tom: '2024-06-13',
                color: 'LIGHTGREENBLUE',
                srText: 'Samtidig uttak',
            },
            {
                fom: '2024-04-19',
                tom: '2024-05-15',
                color: 'BLACK',
                srText: 'Tapte dager',
            },
            {
                fom: '2024-06-14',
                tom: '2024-06-27',
                color: 'BLACK',
                srText: 'Tapte dager',
            },
            {
                fom: '2024-06-28',
                tom: '2024-07-02',
                color: 'GREENOUTLINE',
                srText: 'Mors del, gradert',
            },
            {
                fom: '2024-06-28',
                tom: '2024-07-02',
                color: 'BLUEOUTLINE',
                srText: 'Utsettelse',
            },
            {
                fom: '2024-07-03',
                tom: '2024-07-15',
                color: 'GREENSTRIPED',
                srText: 'Fars del, aktivitetsfri',
            },
        ],
        uttakPerioder: [
            {
                fom: '2024-04-04',
                tom: '2024-04-18',
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
            },
            {
                fom: '2024-05-17',
                tom: '2024-05-23',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
            },
            {
                fom: '2024-05-31',
                tom: '2024-06-13',
                kontoType: 'FELLESPERIODE',
                forelder: 'MOR',
                samtidigUttak: 50,
            },
            {
                fom: '2024-05-31',
                tom: '2024-06-13',
                kontoType: 'FELLESPERIODE',
                forelder: 'FAR_MEDMOR',
                samtidigUttak: 50,
            },
            {
                fom: '2024-06-28',
                tom: '2024-07-02',
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                gradering: { arbeidstidprosent: 80, aktivitet: { type: 'ANNET' } },
            },
            {
                fom: '2024-06-28',
                tom: '2024-07-02',
                forelder: 'FAR_MEDMOR',
                utsettelseÅrsak: 'LOVBESTEMT_FERIE',
            },
            {
                fom: '2024-07-03',
                tom: '2024-07-15',
                forelder: 'FAR_MEDMOR',
                morsAktivitet: 'IKKE_OPPGITT',
                kontoType: 'FORELDREPENGER',
            },
        ],
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2024-04-04'],
            antallBarn: 1,
        },
        foreldreInfo: {
            søker: 'MOR',
            navnPåForeldre: {
                mor: 'Hanne',
                farMedmor: 'Hans',
            },
            rettighetType: 'BEGGE_RETT',
            erMedmorDelAvSøknaden: false,
        },
        harAktivitetskravIPeriodeUtenUttak: false,
        readOnly: false,
        erPeriodeneTilAnnenPartLåst: false,
    },
};
export const VisAlleUtenTekst: Story = {
    args: {
        ...VisAlleMedTekst.args,
        skjulTekstSomDefault: true,
        readOnly: true,
    },
};
