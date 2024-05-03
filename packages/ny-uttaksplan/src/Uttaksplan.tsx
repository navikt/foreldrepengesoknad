import { FunctionComponent } from 'react';

import '@navikt/ds-css';

import { Forelder, Periode, Periodetype, StønadskontoType } from '@navikt/fp-common';

import PeriodeListe from './components/periode-liste/PeriodeListe';

const UttaksplanNy: FunctionComponent = () => {
    // const perioder: Periode[] = [
    //     {
    //         id: '1',
    //         forelder: Forelder.mor,
    //         tidsperiode: {
    //             fom: new Date(),
    //             tom: new Date('2024-05-20'),
    //         },
    //         type: Periodetype.Uttak,
    //         konto: StønadskontoType.ForeldrepengerFørFødsel,
    //     },
    //     {
    //         id: '2',
    //         forelder: Forelder.farMedmor,
    //         tidsperiode: {
    //             fom: new Date('2024-05-22'),
    //             tom: new Date('2024-05-31'),
    //         },
    //         type: Periodetype.Uttak,
    //         konto: StønadskontoType.Fedrekvote,
    //     },
    //     {
    //         id: '3',
    //         forelder: Forelder.mor,
    //         tidsperiode: {
    //             fom: new Date('2024-05-22'),
    //             tom: new Date('2024-05-31'),
    //         },
    //         type: Periodetype.Uttak,
    //         konto: StønadskontoType.Fellesperiode,
    //     },
    //     {
    //         id: '4',
    //         forelder: Forelder.mor,
    //         tidsperiode: {
    //             fom: new Date('2024-06-01'),
    //             tom: new Date('2024-06-20'),
    //         },
    //         type: Periodetype.Uttak,
    //         konto: StønadskontoType.Mødrekvote,
    //     },
    // ];

    const perioder: Periode[] = [
        {
            id: '1791107651-23530-4156-5672-8510082949258',
            type: Periodetype.Uttak,
            forelder: Forelder.mor,
            konto: StønadskontoType.ForeldrepengerFørFødsel,
            tidsperiode: {
                fom: new Date('2024-04-12T00:00:00.000Z'),
                tom: new Date('2024-05-02T00:00:00.000Z'),
            },
        },
        {
            id: '09238903-7649-00572-15237-195982427421289',
            type: Periodetype.Uttak,
            forelder: Forelder.mor,
            konto: StønadskontoType.Mødrekvote,
            tidsperiode: {
                fom: new Date('2024-05-03T00:00:00.000Z'),
                tom: new Date('2024-08-15T00:00:00.000Z'),
            },
            ønskerSamtidigUttak: false,
            gradert: false,
        },
        {
            id: '089661209-7068-02331-5876-8543970929124',
            type: Periodetype.Uttak,
            forelder: Forelder.mor,
            konto: StønadskontoType.Fellesperiode,
            tidsperiode: {
                fom: new Date('2024-08-16T00:00:00.000Z'),
                tom: new Date('2024-09-26T00:00:00.000Z'),
            },
            erArbeidstaker: false,
            gradert: false,
            orgnumre: [],
            ønskerSamtidigUttak: false,
        },
        {
            id: '111936683-3265-22855-8575-1519220835469',
            type: Periodetype.PeriodeUtenUttak,
            tidsperiode: {
                fom: new Date('2024-09-27T00:00:00.000Z'),
                tom: new Date('2024-10-10T00:00:00.000Z'),
            },
        },
        {
            id: '19249909-1513-07778-7453-3721234202253',
            type: Periodetype.Uttak,
            forelder: Forelder.mor,
            konto: StønadskontoType.Fellesperiode,
            tidsperiode: {
                fom: new Date('2024-10-11T00:00:00.000Z'),
                tom: new Date('2024-10-24T00:00:00.000Z'),
            },
            erArbeidstaker: false,
            gradert: false,
            orgnumre: [],
            ønskerSamtidigUttak: false,
        },
    ];

    return (
        <div style={{ padding: '2rem' }}>
            <PeriodeListe perioder={perioder} />
        </div>
    );
};

export default UttaksplanNy;
