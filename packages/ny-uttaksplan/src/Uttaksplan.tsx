import { FunctionComponent } from 'react';

import '@navikt/ds-css';

import { NavnPåForeldre } from '@navikt/fp-common';
import { Barn, Familiesituasjon, SaksperiodeNy } from '@navikt/fp-types';

import Uttaksplanbuilder from './builder/Uttaksplanbuilder';
import { finnOgSettInnHull, settInnAnnenPartsUttak, slåSammenLikePerioder } from './builder/uttaksplanbuilderUtils';
import PeriodeListe from './components/periode-liste/PeriodeListe';
import { UttaksplanDataContext } from './context/UttaksplanDataContext';
import { Planperiode } from './types/Planperiode';
import { mapSaksperiodeTilPlanperiode } from './utils/periodeUtils';

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
    familiesituasjon: Familiesituasjon;
    handleOnPlanChange: (perioder: SaksperiodeNy[]) => void;
    planleggerModus: boolean;
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
    familiesituasjon,
    handleOnPlanChange,
    planleggerModus,
}) => {
    const søkersPlanperioder = finnOgSettInnHull(
        mapSaksperiodeTilPlanperiode(søkersPerioder, erFarEllerMedmor, false, familiehendelsedato, planleggerModus),
        harAktivitetskravIPeriodeUtenUttak,
        familiehendelsedato,
        gjelderAdopsjon,
        bareFarHarRett,
        erFarEllerMedmor,
        førsteUttaksdagNesteBarnsSak,
    );
    const annenPartsPlanperioder = annenPartsPerioder
        ? mapSaksperiodeTilPlanperiode(annenPartsPerioder, erFarEllerMedmor, true, familiehendelsedato, planleggerModus)
        : undefined;

    const planMedLikePerioderSlåttSammen = slåSammenLikePerioder(
        søkersPlanperioder,
        familiehendelsedato,
        førsteUttaksdagNesteBarnsSak,
        annenPartsPlanperioder,
    );

    const komplettPlan = finnOgSettInnHull(
        annenPartsPlanperioder
            ? settInnAnnenPartsUttak(
                  søkersPlanperioder,
                  annenPartsPlanperioder,
                  familiehendelsedato,
                  førsteUttaksdagNesteBarnsSak,
                  true,
              )
            : planMedLikePerioderSlåttSammen,
        harAktivitetskravIPeriodeUtenUttak,
        familiehendelsedato,
        gjelderAdopsjon,
        bareFarHarRett,
        erFarEllerMedmor,
        førsteUttaksdagNesteBarnsSak,
    );

    const builder = Uttaksplanbuilder(
        komplettPlan,
        familiehendelsedato,
        harAktivitetskravIPeriodeUtenUttak,
        gjelderAdopsjon,
        bareFarHarRett,
        erFarEllerMedmor,
        førsteUttaksdagNesteBarnsSak,
        annenPartsPlanperioder,
    );

    const handleUpdatePeriode = (oppdatertPeriode: Planperiode) => {
        const result = builder.oppdaterPeriode(oppdatertPeriode);

        const saksPerioder = result.map((r) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars -- greit for spreading
            const { id, periodeHullÅrsak, readOnly: gjelderAnnenPart, skalIkkeHaUttakFørTermin, ...saksPeriodeNy } = r;
            return saksPeriodeNy;
        });

        handleOnPlanChange(saksPerioder);
    };

    return (
        <UttaksplanDataContext
            initialState={{
                BARN: barn,
                ER_FAR_ELLER_MEDMOR: erFarEllerMedmor,
                FAMILIEHENDELSEDATO: familiehendelsedato,
                NAVN_PÅ_FORELDRE: navnPåForeldre,
                UTTAKSPLAN: komplettPlan,
                FAMILIESITUASJON: familiesituasjon,
            }}
        >
            <PeriodeListe perioder={komplettPlan} handleUpdatePeriode={handleUpdatePeriode} />
        </UttaksplanDataContext>
    );
};

export default UttaksplanNy;
