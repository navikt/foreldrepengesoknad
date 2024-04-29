import { FunctionComponent } from 'react';

import '@navikt/ds-css';

import { Forelder, Periode, Periodetype, StønadskontoType } from '@navikt/fp-common';

import PeriodeListe from './components/periode-liste/PeriodeListe';

const UttaksplanNy: FunctionComponent = () => {
    const perioder: Periode[] = [
        {
            id: '1',
            forelder: Forelder.mor,
            tidsperiode: {
                fom: new Date(),
                tom: new Date('2024-05-20'),
            },
            type: Periodetype.Uttak,
            konto: StønadskontoType.ForeldrepengerFørFødsel,
        },
        {
            id: '2',
            forelder: Forelder.farMedmor,
            tidsperiode: {
                fom: new Date('2024-05-22'),
                tom: new Date('2024-05-31'),
            },
            type: Periodetype.Uttak,
            konto: StønadskontoType.Fedrekvote,
        },
        {
            id: '3',
            tidsperiode: {
                fom: new Date('2024-05-22'),
                tom: new Date('2024-05-31'),
            },
            type: Periodetype.PeriodeUtenUttak,
        },
        {
            id: '4',
            forelder: Forelder.mor,
            tidsperiode: {
                fom: new Date('2024-06-01'),
                tom: new Date('2024-06-20'),
            },
            type: Periodetype.Uttak,
            konto: StønadskontoType.Mødrekvote,
        },
    ];

    return (
        <div style={{ padding: '2rem' }}>
            <PeriodeListe perioder={perioder} />
        </div>
    );
};

export default UttaksplanNy;
