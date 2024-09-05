import { FunctionComponent } from 'react';

import '@navikt/ds-css';

import { AnnenForelder, NavnPåForeldre, Periode } from '@navikt/fp-common';
import { Barn, SaksperiodeNy } from '@navikt/fp-types';

import { slåSammenLikePerioder } from './builder/uttaksplanbuilderUtils';
import PeriodeListe from './components/periode-liste/PeriodeListe';
import { UttaksplanDataContext } from './context/UttaksplanDataContext';
import { PlanPeriode } from './types/Planperiode';

interface Props {
    familiehendelsedato: string;
    erFarEllerMedmor: boolean;
    navnPåForeldre: NavnPåForeldre;
    annenForelder: AnnenForelder;
    barn: Barn;
    søkersPerioder: SaksperiodeNy[];
    annenPartsPerioder?: SaksperiodeNy[];
}

const UttaksplanNy: FunctionComponent<Props> = ({
    familiehendelsedato,
    erFarEllerMedmor,
    navnPåForeldre,
    annenForelder,
    barn,
    søkersPerioder,
    annenPartsPerioder,
}) => {
    let kombinertUttaksplan: PlanPeriode[] = [];
    let søkersPlan = slåSammenLikePerioder(
        søkersPerioder,
        new Date(familiehendelsedato),
        undefined,
        annenPartsPerioder,
    );

    if (annenPartsPerioder !== undefined) {
    } else {
        kombinertUttaksplan = søkersPerioder;
    }

    return (
        <UttaksplanDataContext
            initialState={{
                ANNEN_FORELDER: annenForelder,
                BARN: barn,
                ER_FAR_ELLER_MEDMOR: erFarEllerMedmor,
                FAMILIEHENDELSEDATO: familiehendelsedato,
                NAVN_PÅ_FORELDRE: navnPåForeldre,
                UTTAKSPLAN: kombinertUttaksplan,
            }}
        >
            <div style={{ padding: '2rem 0' }}>
                <PeriodeListe perioder={kombinertUttaksplan} familiehendelsedato={familiehendelsedato} barn={barn} />
            </div>
        </UttaksplanDataContext>
    );
};

export default UttaksplanNy;
