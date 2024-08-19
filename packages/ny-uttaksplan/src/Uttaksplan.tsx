import { FunctionComponent } from 'react';

import '@navikt/ds-css';

import { AnnenForelder, NavnPåForeldre, Periode } from '@navikt/fp-common';

import { Barn } from '../../types';
import PeriodeListe from './components/periode-liste/PeriodeListe';
import { UttaksplanDataContext } from './context/UttaksplanDataContext';

interface Props {
    uttaksplan: Periode[];
    familiehendelsedato: string;
    erFarEllerMedmor: boolean;
    navnPåForeldre: NavnPåForeldre;
    annenForelder: AnnenForelder;
    barn: Barn;
}

const UttaksplanNy: FunctionComponent<Props> = ({
    uttaksplan,
    familiehendelsedato,
    erFarEllerMedmor,
    navnPåForeldre,
    annenForelder,
    barn,
}) => {
    return (
        <UttaksplanDataContext
            initialState={{
                ANNEN_FORELDER: annenForelder,
                BARN: barn,
                ER_FAR_ELLER_MEDMOR: erFarEllerMedmor,
                FAMILIEHENDELSEDATO: familiehendelsedato,
                NAVN_PÅ_FORELDRE: navnPåForeldre,
                UTTAKSPLAN: uttaksplan,
            }}
        >
            <div style={{ padding: '2rem 0' }}>
                <PeriodeListe perioder={uttaksplan} familiehendelsedato={familiehendelsedato} barn={barn} />
            </div>
        </UttaksplanDataContext>
    );
};

export default UttaksplanNy;
