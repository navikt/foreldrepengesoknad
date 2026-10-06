import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import { useIntl } from 'react-intl';
import { isAnnenForelderOppgitt } from 'types/AnnenForelder';
import { getErSøkerFarEllerMedmor } from 'utils/personUtils';

import { RettighetType_fpoversikt, UttakPeriodeDto_fpoversikt } from '@navikt/fp-types';
import { Uttaksperioden } from '@navikt/fp-utils';
import {
    erPerioderEkslFomTomLike,
    harPeriodeDerMorsAktivitetIkkeErValgt,
    harPeriodeMedUkjentGraderingsaktivitet,
    useErAntallDagerOvertrukketIUttaksplan,
} from '@navikt/fp-uttaksplan';
import { notEmpty } from '@navikt/fp-validation';

export type UttaksplanPerioder = UttakPeriodeDto_fpoversikt[];

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

    const søkersForelder = erSøkerFarEllerMedmor ? 'FAR_MEDMOR' : 'MOR';

    // .søker representerer alltid søkjaren sjølv (uavhengig av MOR/FAR_MEDMOR-rolle), så det held å
    // filtrere på at sida finst.
    const finnSøkersPerioder = (perioder: UttaksplanPerioder) =>
        perioder.filter((periode) => periode.søker !== undefined);

    const manglerPerioderEtterValg = (perioder: UttaksplanPerioder) =>
        perioder.length === 0 && !harBrukerKunSlettetPerioder(uttaksplan, opprinneligPlan);

    // Innsendinga inneheld berre søkjaren sine eigne perioder (sjå filtrerUtAnnenPartsPerioder i apiUtils),
    // så valideringa må sjå på dei same periodane. Ser ein på heile planen, kan annen part sine perioder
    // "dekke over" at søkjaren ikkje har eigne perioder, og backend svarar då at uttaksplanen er tom.
    const manglerUttaksperioderForNySøknad = (perioder: UttaksplanPerioder) =>
        !erEndringssøknad && !harMinstEnUttaksEllerOverføringsperiode(finnSøkersPerioder(perioder));

    const harOvertrukketDager = () => erAntallDagerOvertrukket;

    const manglerMorsAktivitetDerPåkrevd = (perioder: UttaksplanPerioder) =>
        harPeriodeDerMorsAktivitetIkkeErValgt(
            utledRettighet(erAleneOmOmsorg, erDeltUttak),
            erSøkerFarEllerMedmor ? 'FAR_MEDMOR' : 'MOR',
            false,
            perioder,
        );

    const manglerGraderingsaktivitet = (perioder: UttaksplanPerioder) =>
        harPeriodeMedUkjentGraderingsaktivitet(finnSøkersPerioder(perioder), søkersForelder);

    const harKunPerioderForDenAndreForelderen = (perioder: UttaksplanPerioder) =>
        harKunPerioderForAnnenForelder(erAleneOmOmsorg, perioder);

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

// Søkjaren si side og annan part si side i same intervall må vurderast kvar for seg: slettar søkjaren
// berre si eiga side av eit samtidig uttak, står annan part si uendra side att i eit intervall som
// elles ikkje finst i den opprinnelege planen.
const finnSøkersSide = (perioder: UttaksplanPerioder): UttaksplanPerioder =>
    perioder.flatMap(({ fom, tom, søker }) => (søker ? [{ fom, tom, søker }] : []));

const erSøkersSideNyEllerEndra = (periode: UttaksplanPerioder[number], opprinneligPlan: UttaksplanPerioder) => {
    const { fom, tom, søker } = periode;
    return (
        søker !== undefined &&
        (søker.resultat === undefined ||
            finnSøkersSide(opprinneligPlan).every(
                (opprinnelig) => !erSammePeriodeInkludertDatoer({ fom, tom, søker }, opprinnelig),
            ))
    );
};

// Annan part si side kan bli delt opp når søkjaren endrar si side av eit samtidig uttak, så her held
// det at eit opprinneleg intervall med lik annan part dekkjer heile perioden.
const erAnnenPartsSideNyEllerEndra = (periode: UttaksplanPerioder[number], opprinneligPlan: UttaksplanPerioder) => {
    const { fom, tom, annenPart } = periode;
    return (
        annenPart !== undefined &&
        opprinneligPlan.every(
            (opprinnelig) =>
                opprinnelig.fom > fom ||
                opprinnelig.tom < tom ||
                !erPerioderEkslFomTomLike({ fom, tom, annenPart }, { fom, tom, annenPart: opprinnelig.annenPart }),
        )
    );
};

export const finnNyeEllerEndraPerioder = (
    perioder: UttaksplanPerioder | undefined,
    opprinneligPlan: UttaksplanPerioder | undefined,
): UttaksplanPerioder => {
    if (!opprinneligPlan) {
        return perioder?.filter((periode) => periode.søker !== undefined && periode.søker.resultat === undefined) ?? [];
    }
    return (
        perioder?.filter(
            (periode) =>
                erSøkersSideNyEllerEndra(periode, opprinneligPlan) ||
                erAnnenPartsSideNyEllerEndra(periode, opprinneligPlan),
        ) ?? []
    );
};

export const harBrukerKunSlettetPerioder = (
    perioder: UttaksplanPerioder | undefined,
    opprinneligPlan: UttaksplanPerioder | undefined,
) => {
    if (!opprinneligPlan || !perioder) {
        return false;
    }

    const søkersPerioder = finnSøkersSide(perioder);
    const søkersOpprinneligePerioder = finnSøkersSide(opprinneligPlan);

    const erKunSaksperioder = søkersPerioder.every((periode) => periode.søker?.resultat !== undefined);

    return (
        erKunSaksperioder &&
        søkersPerioder.length < søkersOpprinneligePerioder.length &&
        søkersPerioder.every((periode) =>
            søkersOpprinneligePerioder.some((opprinnelig) => erSammePeriodeInkludertDatoer(periode, opprinnelig)),
        )
    );
};

export const erSammePeriodeInkludertDatoer = (a: UttaksplanPerioder[number], b: UttaksplanPerioder[number]) =>
    a.fom === b.fom && a.tom === b.tom && erPerioderEkslFomTomLike(a, b);

// .søker er alltid søkjaren sin eigen side. «Berre periodar for annan forelder» betyr difor at
// ingen av periodane har ei .søker-side sett.
export const harKunPerioderForAnnenForelder = (erAleneOmOmsorg: boolean, perioder?: UttaksplanPerioder) => {
    if (erAleneOmOmsorg || !perioder || perioder.length === 0) {
        return false;
    }

    return perioder.every((periode) => periode.søker === undefined);
};

// Ein overføringsperiode (t.d. far som overtek mødrekvote fordi mor er for sjuk) er eit
// reelt uttak av foreldrepengar, og er ein gyldig søknad åleine på lik linje med ein uttaksperiode.
export const harMinstEnUttaksEllerOverføringsperiode = (perioder: UttaksplanPerioder) =>
    perioder.some((periode) => {
        const søker = periode.søker;
        return !!søker && (Uttaksperioden.erUttaksperiode(søker) || Uttaksperioden.erOverføringsperiode(søker));
    });

export const erKunUtsettelser = (perioder: UttaksplanPerioder) => {
    if (perioder.length === 0) {
        return false;
    }

    // Ferie er ein utsettelse som legg dagar tilbake i beholdninga, og er ein gyldig søknad åleine.
    const harFerie = perioder.some((periode) => periode.søker?.utsettelseÅrsak === 'FERIE');
    if (harFerie) {
        return false;
    }

    // Ser berre på søkjaren sin eigen side her, i tråd med konvensjonen elles i fila.
    return perioder.every((periode) => !!periode.søker && Uttaksperioden.erUtsettelsesperiode(periode.søker));
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
