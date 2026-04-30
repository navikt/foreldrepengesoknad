import { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';

import { UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';
import { Uttaksperioden } from '@navikt/fp-utils';
import { harPeriodeDerMorsAktivitetIkkeErValgt } from '@navikt/fp-uttaksplan';

import { utledRettighet } from '../../../utils/rettighetUtils';

type AlleUttakPerioder = UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt;

type ValideringsArgs = {
    planForValidering: AlleUttakPerioder[];
    mellomlagretPlan: AlleUttakPerioder[] | undefined;
    planFraEksisterendeSak: AlleUttakPerioder[] | undefined;
    erEndringssøknad: boolean;
    erAntallDagerOvertrukket: boolean;
    erAleneOmOmsorg: boolean;
    erDeltUttak: boolean;
    erSøkerFarEllerMedmor: boolean;
};

/**
 * Validerer at ein uttaksplan er klar til innsending.
 * Returnerer eit feilmelding-element som skal visast til brukar, eller null om planen er gyldig.
 */
export const validerUttaksplanForInnsending = ({
    planForValidering,
    mellomlagretPlan,
    planFraEksisterendeSak,
    erEndringssøknad,
    erAntallDagerOvertrukket,
    erAleneOmOmsorg,
    erDeltUttak,
    erSøkerFarEllerMedmor,
}: ValideringsArgs): ReactNode | null => {
    if (planForValidering.length === 0 && !harBrukerKunSlettetPerioder(mellomlagretPlan, planFraEksisterendeSak)) {
        return erEndringssøknad ? (
            <FormattedMessage id="UttaksplanSteg.IngenNyePerioder" />
        ) : (
            <FormattedMessage id="UttaksplanSteg.IngenPerioder" />
        );
    }

    if (erAntallDagerOvertrukket) {
        return <FormattedMessage id="UttaksplanSteg.OvertrukketDager" />;
    }

    if (harPeriodeDerMorsAktivitetIkkeErValgt(utledRettighet(erAleneOmOmsorg, erDeltUttak), planForValidering)) {
        return <FormattedMessage id="UttaksplanSteg.MorsAktivitetIkkeValgt" />;
    }

    if (harKunPerioderForAnnenForelder(erSøkerFarEllerMedmor, planForValidering)) {
        return <FormattedMessage id="UttaksplanSteg.KunPerioderForAnnenForelder" />;
    }

    return null;
};

const harBrukerKunSlettetPerioder = (
    perioder: AlleUttakPerioder[] | undefined,
    opprinneligPlan: AlleUttakPerioder[] | undefined,
): boolean => {
    if (!opprinneligPlan) {
        return false;
    }

    const erKunSaksperioder = perioder?.every(
        (periode) => Uttaksperioden.erEøsPeriode(periode) || periode.resultat !== undefined,
    );

    if (erKunSaksperioder) {
        return perioder ? !perioder.every((p, index) => p === opprinneligPlan[index]) : false;
    }

    return false;
};

const harKunPerioderForAnnenForelder = (erSøkerFarEllerMedmor: boolean, perioder: AlleUttakPerioder[]): boolean => {
    if (perioder.length === 0) {
        return false;
    }

    const søkersForelder = erSøkerFarEllerMedmor ? 'FAR_MEDMOR' : 'MOR';
    return perioder.every((periode) => Uttaksperioden.erEøsPeriode(periode) || periode.forelder !== søkersForelder);
};
