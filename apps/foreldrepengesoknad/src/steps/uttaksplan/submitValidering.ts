import { IntlShape } from 'react-intl';

import {
    RettighetType_fpoversikt,
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
} from '@navikt/fp-types';
import { Uttaksperioden } from '@navikt/fp-utils';
import { harPeriodeDerMorsAktivitetIkkeErValgt } from '@navikt/fp-uttaksplan';

export type UttaksplanPerioder = Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>;

type SubmitValideringsregel = {
    gjelder: (planForValidering: UttaksplanPerioder) => boolean;
    message: string;
};

interface FinnFørsteSubmitFeilmeldingProps {
    planForValidering: UttaksplanPerioder;
    erEndringssøknad: boolean;
    uttaksplan: UttaksplanPerioder | undefined;
    opprinneligPlan: UttaksplanPerioder | undefined;
    erAntallDagerOvertrukket: boolean;
    erAleneOmOmsorg: boolean;
    erDeltUttak: boolean;
    erSøkerFarEllerMedmor: boolean;
    intl: IntlShape;
}

export const finnFørsteSubmitFeilmelding = ({
    planForValidering,
    erEndringssøknad,
    uttaksplan,
    opprinneligPlan,
    erAntallDagerOvertrukket,
    erAleneOmOmsorg,
    erDeltUttak,
    erSøkerFarEllerMedmor,
    intl,
}: FinnFørsteSubmitFeilmeldingProps): string | undefined => {
    const manglerPerioderEtterValg = (perioder: UttaksplanPerioder) =>
        perioder.length === 0 && !harBrukerKunSlettetPerioder(uttaksplan, opprinneligPlan);

    const manglerUttaksperioderForNySøknad = (perioder: UttaksplanPerioder) =>
        !erEndringssøknad && !perioder.some((periode) => Uttaksperioden.erUttaksperiode(periode));

    const harOvertrukketDager = () => erAntallDagerOvertrukket;

    const manglerMorsAktivitetDerPåkrevd = (perioder: UttaksplanPerioder) =>
        harPeriodeDerMorsAktivitetIkkeErValgt(utledRettighet(erAleneOmOmsorg, erDeltUttak), perioder);

    const harKunPerioderForDenAndreForelderen = (perioder: UttaksplanPerioder) =>
        harKunPerioderForAnnenForelder(erSøkerFarEllerMedmor, perioder);

    const submitValideringsregler: SubmitValideringsregel[] = [
        {
            gjelder: manglerPerioderEtterValg,
            message: erEndringssøknad
                ? intl.formatMessage({ id: 'UttaksplanSteg.IngenNyePerioder' })
                : intl.formatMessage({ id: 'UttaksplanSteg.IngenPerioder' }),
        },
        {
            gjelder: manglerUttaksperioderForNySøknad,
            message: intl.formatMessage({ id: 'UttaksplanSteg.IngenUttaksperioder' }),
        },
        {
            gjelder: harOvertrukketDager,
            message: intl.formatMessage({ id: 'UttaksplanSteg.OvertrukketDager' }),
        },
        {
            gjelder: manglerMorsAktivitetDerPåkrevd,
            message: intl.formatMessage({ id: 'UttaksplanSteg.MorsAktivitetIkkeValgt' }),
        },
        {
            gjelder: harKunPerioderForDenAndreForelderen,
            message: intl.formatMessage({ id: 'UttaksplanSteg.KunPerioderForAnnenForelder' }),
        },
    ];

    const valideringsfeil = submitValideringsregler.find((regel) => regel.gjelder(planForValidering));
    return valideringsfeil?.message;
};

const harBrukerKunSlettetPerioder = (perioder: UttaksplanPerioder | undefined, opprinneligPlan: UttaksplanPerioder | undefined) => {
    if (!opprinneligPlan) {
        return false;
    }

    const erKunSaksperioder = perioder?.every(
        (periode) => Uttaksperioden.erEøsPeriode(periode) || periode.resultat !== undefined,
    );

    if (erKunSaksperioder) {
        const harSlettetPeriode = perioder ? !perioder.every((periode, index) => periode === opprinneligPlan[index]) : false;
        return harSlettetPeriode;
    }

    return false;
};

const harKunPerioderForAnnenForelder = (erSøkerFarEllerMedmor: boolean, perioder?: UttaksplanPerioder) => {
    if (!perioder || perioder.length === 0) {
        return false;
    }

    const søkersForelder = erSøkerFarEllerMedmor ? 'FAR_MEDMOR' : 'MOR';

    return perioder.every((periode) => Uttaksperioden.erEøsPeriode(periode) || periode.forelder !== søkersForelder);
};

const utledRettighet = (erAleneOmOmsorg: boolean, erDeltUttak: boolean): RettighetType_fpoversikt => {
    if (erAleneOmOmsorg) {
        return 'ALENEOMSORG';
    }
    if (erDeltUttak) {
        return 'BEGGE_RETT';
    }
    return 'BARE_SØKER_RETT';
};
