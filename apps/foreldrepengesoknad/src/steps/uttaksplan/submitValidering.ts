import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import { useIntl } from 'react-intl';
import { isAnnenForelderOppgitt } from 'types/AnnenForelder';
import { getErSøkerFarEllerMedmor } from 'utils/personUtils';

import {
    RettighetType_fpoversikt,
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
} from '@navikt/fp-types';
import { Uttaksperioden } from '@navikt/fp-utils';
import {
    erPerioderEkslFomTomLike,
    harPeriodeDerMorsAktivitetIkkeErValgt,
    harPeriodeMedUkjentGraderingsaktivitet,
    useErAntallDagerOvertrukketIUttaksplan,
} from '@navikt/fp-uttaksplan';
import { notEmpty } from '@navikt/fp-validation';

export type UttaksplanPerioder = Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>;

type SubmitValideringsregel = {
    gjelder: (planForValidering: UttaksplanPerioder) => boolean;
    message: string;
};

interface UseFinnFørsteSubmitFeilmeldingProps {
    opprinneligPlan: UttaksplanPerioder | undefined;
    erEndringssøknad: boolean;
}

export const useFinnFørsteSubmitFeilmelding = ({
    opprinneligPlan,
    erEndringssøknad,
}: UseFinnFørsteSubmitFeilmeldingProps) => {
    const intl = useIntl();
    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));
    const uttaksplan = useContextGetData(ContextDataType.UTTAKSPLAN);
    const erAntallDagerOvertrukket = useErAntallDagerOvertrukketIUttaksplan();

    const erSøkerFarEllerMedmor = getErSøkerFarEllerMedmor(søkersituasjon.rolle);
    const oppgittAnnenForelder = isAnnenForelderOppgitt(annenForelder) ? annenForelder : undefined;
    const erDeltUttak =
        oppgittAnnenForelder?.harRettPåForeldrepengerINorge === true ||
        oppgittAnnenForelder?.harRettPåForeldrepengerIEØS === true;
    const erAleneOmOmsorg = oppgittAnnenForelder ? oppgittAnnenForelder.erAleneOmOmsorg : true;

    const manglerPerioderEtterValg = (perioder: UttaksplanPerioder) =>
        perioder.length === 0 && !harBrukerKunSlettetPerioder(uttaksplan, opprinneligPlan);

    const manglerUttaksperioderForNySøknad = (perioder: UttaksplanPerioder) =>
        !erEndringssøknad && !perioder.some((periode) => Uttaksperioden.erUttaksperiode(periode));

    const harOvertrukketDager = () => erAntallDagerOvertrukket;

    const manglerMorsAktivitetDerPåkrevd = (perioder: UttaksplanPerioder) =>
        harPeriodeDerMorsAktivitetIkkeErValgt(utledRettighet(erAleneOmOmsorg, erDeltUttak), perioder);

    const manglerGraderingsaktivitet = (perioder: UttaksplanPerioder) => {
        const søkersForelder = erSøkerFarEllerMedmor ? 'FAR_MEDMOR' : 'MOR';
        const søkersPerioder = perioder.filter(
            (periode) => Uttaksperioden.erIkkeEøsPeriode(periode) && periode.forelder === søkersForelder,
        );
        return harPeriodeMedUkjentGraderingsaktivitet(søkersPerioder, søkersForelder);
    };

    const harKunPerioderForDenAndreForelderen = (perioder: UttaksplanPerioder) =>
        harKunPerioderForAnnenForelder(erSøkerFarEllerMedmor, erAleneOmOmsorg, perioder);

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
            gjelder: manglerGraderingsaktivitet,
            message: intl.formatMessage({ id: 'UttaksplanSteg.GraderingsaktivitetIkkeValgt' }),
        },
        {
            gjelder: harKunPerioderForDenAndreForelderen,
            message: intl.formatMessage({ id: 'UttaksplanSteg.KunPerioderForAnnenForelder' }),
        },
        {
            gjelder: erKunUtsettelser,
            message: intl.formatMessage({ id: 'UttaksplanSteg.KunUtsettelser' }),
        },
    ];

    return (planForValidering: UttaksplanPerioder): string | undefined => {
        const valideringsfeil = submitValideringsregler.find((regel) => regel.gjelder(planForValidering));
        return valideringsfeil?.message;
    };
};

export const harBrukerKunSlettetPerioder = (
    perioder: UttaksplanPerioder | undefined,
    opprinneligPlan: UttaksplanPerioder | undefined,
) => {
    if (!opprinneligPlan) {
        return false;
    }

    const erKunSaksperioder = perioder?.every(
        (periode) => Uttaksperioden.erEøsPeriode(periode) || periode.resultat !== undefined,
    );

    if (erKunSaksperioder) {
        // Samanlikn på verdi, ikkje referanse: opprinneligPlan blir rekna ut på nytt (nye objekt)
        // ved kvar render via prosesserPerioderForVisning, så referanselikheit held ikkje i praksis.
        const harSlettetPeriode = perioder
            ? perioder.length < opprinneligPlan.length &&
              perioder.every((periode) =>
                  opprinneligPlan.some((opprinnelig) => erSammePeriodeInkludertDatoer(periode, opprinnelig)),
              )
            : false;
        return harSlettetPeriode;
    }

    return false;
};

const erSammePeriodeInkludertDatoer = (a: UttaksplanPerioder[number], b: UttaksplanPerioder[number]) =>
    a.fom === b.fom && a.tom === b.tom && erPerioderEkslFomTomLike(a, b);

export const harKunPerioderForAnnenForelder = (
    erSøkerFarEllerMedmor: boolean,
    erAleneOmOmsorg: boolean,
    perioder?: UttaksplanPerioder,
) => {
    if (!perioder || perioder.length === 0 || erAleneOmOmsorg) {
        return false;
    }

    const søkersForelder = erSøkerFarEllerMedmor ? 'FAR_MEDMOR' : 'MOR';

    return perioder.every((periode) => Uttaksperioden.erEøsPeriode(periode) || periode.forelder !== søkersForelder);
};

export const erKunUtsettelser = (perioder: UttaksplanPerioder) => {
    if (perioder.length === 0) {
        return false;
    }

    // Ferie er ein utsettelse som legg dagar tilbake i beholdninga, og er ein gyldig søknad åleine.
    const harFerie = perioder.some(
        (periode) => Uttaksperioden.erIkkeEøsPeriode(periode) && periode.utsettelseÅrsak === 'LOVBESTEMT_FERIE',
    );
    if (harFerie) {
        return false;
    }

    return perioder.every((periode) => Uttaksperioden.erUtsettelsesperiode(periode));
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
