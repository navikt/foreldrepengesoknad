import { FunctionComponent } from 'react';

import '@navikt/ds-css';

import { NavnPåForeldre } from '@navikt/fp-common';
import { Barn, SaksperiodeNy } from '@navikt/fp-types';

import { finnOgSettInnHull, slåSammenLikePerioder } from './builder/uttaksplanbuilderUtils';
import PeriodeListe from './components/periode-liste/PeriodeListe';
import { UttaksplanDataContext } from './context/UttaksplanDataContext';
import { getForelderForPeriode, mapSaksperiodeTilPlanperiode } from './utils/periodeUtils';

interface Props {
    familiehendelsedato: string;
    erFarEllerMedmor: boolean;
    navnPåForeldre: NavnPåForeldre;
    barn: Barn;
    søkersPerioder: SaksperiodeNy[];
    annenPartsPerioder?: SaksperiodeNy[];
    gjelderAdopsjon: boolean;
    bareFarHarRett: boolean;
    harAktivitetskravIPeriodeUtenUttak: boolean;
    førsteUttaksdagNesteBarnsSak: string | undefined;
}

const UttaksplanNy: FunctionComponent<Props> = ({
    familiehendelsedato,
    erFarEllerMedmor,
    navnPåForeldre,
    barn,
    søkersPerioder,
    annenPartsPerioder,
    gjelderAdopsjon,
    bareFarHarRett,
    harAktivitetskravIPeriodeUtenUttak,
    førsteUttaksdagNesteBarnsSak,
}) => {
    let komplettPlan = finnOgSettInnHull(
        slåSammenLikePerioder(
            mapSaksperiodeTilPlanperiode(søkersPerioder, getForelderForPeriode(erFarEllerMedmor, false), false),
            familiehendelsedato,
            førsteUttaksdagNesteBarnsSak,
            annenPartsPerioder
                ? mapSaksperiodeTilPlanperiode(annenPartsPerioder, getForelderForPeriode(erFarEllerMedmor, true), true)
                : undefined,
        ),
        harAktivitetskravIPeriodeUtenUttak,
        familiehendelsedato,
        gjelderAdopsjon,
        bareFarHarRett,
        erFarEllerMedmor,
        førsteUttaksdagNesteBarnsSak,
    );

    return (
        <UttaksplanDataContext
            initialState={{
                BARN: barn,
                ER_FAR_ELLER_MEDMOR: erFarEllerMedmor,
                FAMILIEHENDELSEDATO: familiehendelsedato,
                NAVN_PÅ_FORELDRE: navnPåForeldre,
                UTTAKSPLAN: komplettPlan,
            }}
        >
            <div style={{ padding: '2rem 0' }}>
                <PeriodeListe perioder={komplettPlan} />
            </div>
        </UttaksplanDataContext>
    );
};

export default UttaksplanNy;
