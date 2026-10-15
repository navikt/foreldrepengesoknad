import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import { useIntl } from 'react-intl';
import { isAnnenForelderOppgitt } from 'types/AnnenForelder';
import { getErSøkerFarEllerMedmor } from 'utils/personUtils';

import { RettighetType_fpoversikt, UttakPeriodeDto } from '@navikt/fp-types';
import { Uttaksperioden } from '@navikt/fp-utils';
import {
    erPerioderEkslFomTomLike,
    harPeriodeDerMorsAktivitetIkkeErValgt,
    harPeriodeMedUkjentGraderingsaktivitet,
    useErAntallDagerOvertrukketIUttaksplan,
} from '@navikt/fp-uttaksplan';
import { notEmpty } from '@navikt/fp-validation';

type SubmitValideringsregel = {
    gjelder: (planForValidering: UttakPeriodeDto[], helePlanen: UttakPeriodeDto[]) => boolean;
    message: string;
};

interface UseFinnFørsteSubmitFeilmeldingProps {
    opprinneligPlan: UttakPeriodeDto[] | undefined;
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

    // .søker er alltid søkeren selv (uavhengig av MOR/FAR_MEDMOR-rolle), så det holder å filtrere på at
    // søkers periode finnes.
    const finnPerioderMedSøker = (perioder: UttakPeriodeDto[]) =>
        perioder.filter((periode) => periode.søker !== undefined);

    const manglerPerioderEtterValg = (perioder: UttakPeriodeDto[]) =>
        perioder.length === 0 &&
        (uttaksplan === undefined || !harBrukerKunSlettetPerioder(uttaksplan, opprinneligPlan));

    // Innsendinga inneheld berre søkjaren sine eigne perioder (sjå filtrerUtAnnenPartsPerioder i apiUtils),
    // så valideringa må sjå på dei same periodane. Ser ein på heile planen, kan annen part sine perioder
    // "dekke over" at søkjaren ikkje har eigne perioder, og backend svarar då at uttaksplanen er tom.
    const manglerUttaksperioderForNySøknad = (perioder: UttakPeriodeDto[]) =>
        !erEndringssøknad && !harMinstEnUttaksEllerOverføringsperiode(finnPerioderMedSøker(perioder));

    const harOvertrukketDager = () => erAntallDagerOvertrukket;

    const manglerMorsAktivitetDerPåkrevd = (perioder: UttakPeriodeDto[]) =>
        harPeriodeDerMorsAktivitetIkkeErValgt(
            utledRettighet(erAleneOmOmsorg, erDeltUttak),
            erSøkerFarEllerMedmor ? 'FAR_MEDMOR' : 'MOR',
            false,
            perioder,
        );

    const manglerGraderingsaktivitet = (perioder: UttakPeriodeDto[]) =>
        harPeriodeMedUkjentGraderingsaktivitet(finnPerioderMedSøker(perioder), søkersForelder);

    const harKunPerioderForDenAndreForelderen = (perioder: UttakPeriodeDto[]) =>
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
            // Ved endringssøknad inneholder planForValidering bare nye og endrede perioder. Uendret uttak
            // fra vedtaket må telle med, ellers ser for eksempel ferie lagt til på slutten ut som en
            // plan med bare utsettelser.
            gjelder: (_planForValidering, helePlanen) => erKunUtsettelser(helePlanen),
            message: intl.formatMessage({ id: 'UttaksplanSteg.KunUtsettelser' }),
        },
    ];

    return (planForValidering: UttakPeriodeDto[], helePlanen: UttakPeriodeDto[]): string | undefined => {
        const valideringsfeil = submitValideringsregler.find((regel) => regel.gjelder(planForValidering, helePlanen));
        return valideringsfeil?.message;
    };
};

// Søkers periode og annen parts periode i samme intervall må vurderes hver for seg: sletter søkeren bare
// sin egen periode i et samtidig uttak, står annen parts uendrede periode igjen i et intervall som ellers
// ikke finnes i den opprinnelige planen.
const finnSøkersPerioder = (perioder: UttakPeriodeDto[]): UttakPeriodeDto[] =>
    perioder.flatMap(({ fom, tom, søker }) => (søker ? [{ fom, tom, søker }] : []));

const erSøkersPeriodeNyEllerEndret = (periode: UttakPeriodeDto, opprinneligPlan: UttakPeriodeDto[]) => {
    const { fom, tom, søker } = periode;
    return (
        søker !== undefined &&
        (søker.resultat === undefined ||
            finnSøkersPerioder(opprinneligPlan).every(
                (opprinnelig) => !erSammePeriodeInkludertDatoer({ fom, tom, søker }, opprinnelig),
            ))
    );
};

// Annen parts periode kan bli delt opp når søkeren endrer sin periode i et samtidig uttak, så her holder
// det at et opprinnelig intervall med lik annen part dekker hele perioden.
const erAnnenPartsPeriodeNyEllerEndret = (periode: UttakPeriodeDto, opprinneligPlan: UttakPeriodeDto[]) => {
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

export const finnNyeEllerEndredePerioder = (
    perioder: UttakPeriodeDto[],
    opprinneligPlan: UttakPeriodeDto[] | undefined,
): UttakPeriodeDto[] => {
    if (!opprinneligPlan) {
        return perioder.filter((periode) => periode.søker !== undefined && periode.søker.resultat === undefined);
    }
    return perioder.filter(
        (periode) =>
            erSøkersPeriodeNyEllerEndret(periode, opprinneligPlan) ||
            erAnnenPartsPeriodeNyEllerEndret(periode, opprinneligPlan),
    );
};

export const harBrukerKunSlettetPerioder = (
    perioder: UttakPeriodeDto[],
    opprinneligPlan: UttakPeriodeDto[] | undefined,
) => {
    if (!opprinneligPlan) {
        return false;
    }

    const søkersPerioder = finnSøkersPerioder(perioder);
    const søkersOpprinneligePerioder = finnSøkersPerioder(opprinneligPlan);

    const erKunSaksperioder = søkersPerioder.every((periode) => periode.søker?.resultat !== undefined);

    return (
        erKunSaksperioder &&
        søkersPerioder.length < søkersOpprinneligePerioder.length &&
        søkersPerioder.every((periode) =>
            søkersOpprinneligePerioder.some((opprinnelig) => erSammePeriodeInkludertDatoer(periode, opprinnelig)),
        )
    );
};

export const erSammePeriodeInkludertDatoer = (a: UttakPeriodeDto, b: UttakPeriodeDto) =>
    a.fom === b.fom && a.tom === b.tom && erPerioderEkslFomTomLike(a, b);

// .søker er alltid søkerens egen periode. «Kun perioder for annen forelder» betyr derfor at ingen av
// periodene har .søker satt.
export const harKunPerioderForAnnenForelder = (erAleneOmOmsorg: boolean, perioder?: UttakPeriodeDto[]) => {
    if (erAleneOmOmsorg || !perioder || perioder.length === 0) {
        return false;
    }

    return perioder.every((periode) => periode.søker === undefined);
};

// Ein overføringsperiode (t.d. far som overtek mødrekvote fordi mor er for sjuk) er eit
// reelt uttak av foreldrepengar, og er ein gyldig søknad åleine på lik linje med ein uttaksperiode.
export const harMinstEnUttaksEllerOverføringsperiode = (perioder: UttakPeriodeDto[]) =>
    perioder.some((periode) => {
        const søker = periode.søker;
        return !!søker && (Uttaksperioden.erUttaksperiode(søker) || Uttaksperioden.erOverføringsperiode(søker));
    });

export const erKunUtsettelser = (perioder: UttakPeriodeDto[]) => {
    // Avslåtte perioder sendes ikke inn (filtrerUtAvslåttePerioder i apiUtils), så de teller ikke som uttak.
    const søkersPerioder = perioder.flatMap((periode) =>
        periode.søker && periode.søker.resultat?.innvilget !== false ? [periode.søker] : [],
    );
    if (søkersPerioder.length === 0) {
        return false;
    }

    return søkersPerioder.every((søker) => Uttaksperioden.erUtsettelsesperiode(søker));
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
