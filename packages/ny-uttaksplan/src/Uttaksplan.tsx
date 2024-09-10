import { FunctionComponent } from 'react';

import '@navikt/ds-css';

import { AnnenForelder, NavnPåForeldre } from '@navikt/fp-common';
import { Barn, SaksperiodeNy } from '@navikt/fp-types';

import { slåSammenLikePerioder } from './builder/uttaksplanbuilderUtils';
import PeriodeListe from './components/periode-liste/PeriodeListe';
import { UttaksplanDataContext } from './context/UttaksplanDataContext';
import { getForelderForPeriode, mapSaksperiodeTilPlanperiode } from './utils/periodeUtils';

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
    let søkersPlan = slåSammenLikePerioder(
        mapSaksperiodeTilPlanperiode(søkersPerioder, getForelderForPeriode(erFarEllerMedmor, false), false),
        familiehendelsedato,
        undefined,
        annenPartsPerioder
            ? mapSaksperiodeTilPlanperiode(annenPartsPerioder, getForelderForPeriode(erFarEllerMedmor, true), true)
            : undefined,
    );

    return (
        <UttaksplanDataContext
            initialState={{
                ANNEN_FORELDER: annenForelder,
                BARN: barn,
                ER_FAR_ELLER_MEDMOR: erFarEllerMedmor,
                FAMILIEHENDELSEDATO: familiehendelsedato,
                NAVN_PÅ_FORELDRE: navnPåForeldre,
                UTTAKSPLAN: søkersPlan,
            }}
        >
            <div style={{ padding: '2rem 0' }}>
                <PeriodeListe perioder={søkersPlan} familiehendelsedato={familiehendelsedato} barn={barn} />
            </div>
        </UttaksplanDataContext>
    );
};

export default UttaksplanNy;
