import { guid } from 'nav-frontend-js-utils';
import dayjs from 'dayjs';
import {
    Arbeidsform,
    AvslåttPeriode,
    isInfoPeriode,
    Overføringsperiode,
    Periode,
    Periodetype,
    UtsettelseAnnenPartInfoPeriode,
    Utsettelsesperiode,
    UttakAnnenPartInfoPeriode,
    Uttaksperiode,
} from 'uttaksplan/types/Periode';
import { Perioden } from 'app/steps/uttaksplan-info/utils/Perioden';
import { isValidTidsperiode, Tidsperioden } from 'app/steps/uttaksplan-info/utils/Tidsperioden';
import { sorterPerioder } from 'app/steps/uttaksplan-info/utils/Periodene';
import { erUttaksdag, Uttaksdagen } from 'app/steps/uttaksplan-info/utils/Uttaksdagen';
import { Saksperiode } from 'app/types/Saksperiode';
import { Forelder } from 'app/types/Forelder';
import { OppholdÅrsakType } from 'uttaksplan/types/OppholdÅrsakType';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { Saksgrunnlag } from 'app/types/Saksgrunnlag';
import { getArbeidsformFromUttakArbeidstype } from './eksisterendeSakUtils';
import { UtsettelseÅrsakType } from 'uttaksplan/types/UtsettelseÅrsakType';
import { PeriodeInfoType } from 'uttaksplan/types/PeriodeInfoType';
import { PeriodeResultatType } from 'uttaksplan/types/PeriodeResultatType';
import {
    convertTidsperiodeToTidsperiodeDate,
    førsteOktober2021ReglerGjelder,
    getRelevantFamiliehendelseDato,
} from './dateUtils';
import { UtsettelseÅrsakTypeDTO } from 'app/types/UtsettelseÅrsakTypeDTO';
import { FamiliehendelseType } from 'app/types/FamiliehendelseType';
import { finnOgSettInnHull } from 'uttaksplan/builder/UttaksplanBuilder';
import { PeriodeResultatÅrsak } from 'uttaksplan/types/PeriodeResultatÅrsak';

const harUttaksdager = (periode: Periode): boolean => {
    return Perioden(periode).getAntallUttaksdager() > 0;
};

const harGyldigTidsperiode = (periode: Periode): boolean => {
    return isValidTidsperiode(periode.tidsperiode);
};

const slåSammenLikePerioder = (perioder: Periode[]): Periode[] => {
    if (perioder.length <= 1) {
        return perioder;
    }

    const nyePerioder: Periode[] = [];
    const infoPerioder = perioder.filter((p) => isInfoPeriode(p));
    const ordinærePerioder = perioder.filter((p) => !isInfoPeriode(p));
    const tmp: Periode[] = [...ordinærePerioder, ...infoPerioder];
    let forrigePeriode: Periode | undefined = { ...tmp[0] };

    tmp.forEach((periode, index) => {
        if (index === 0) {
            return;
        }

        if (forrigePeriode === undefined) {
            forrigePeriode = periode;
            return;
        }

        if (
            Perioden(forrigePeriode).erLik(periode, false, true) &&
            Perioden(forrigePeriode).erSammenhengende(periode)
        ) {
            forrigePeriode.tidsperiode.tom = periode.tidsperiode.tom;
            return;
        } else {
            nyePerioder.push(forrigePeriode);
        }

        forrigePeriode = periode;
    });

    nyePerioder.push(forrigePeriode);

    return nyePerioder.sort(sorterPerioder);
};

const korrigerTidsperiodeTilGyldigUttaksdag = (periode: Periode): Periode => {
    const { fom, tom } = periode.tidsperiode;
    const fomOk = erUttaksdag(fom);
    const tomOk = erUttaksdag(tom);
    if (fomOk && tomOk) {
        return periode;
    } else if (!fomOk && !tomOk) {
        return {
            ...periode,
            tidsperiode: {
                fom: Uttaksdagen(fom).neste(),
                tom: Uttaksdagen(tom).forrige(),
            },
        };
    } else if (!fomOk && tomOk) {
        return {
            ...periode,
            tidsperiode: {
                fom: Uttaksdagen(fom).neste(),
                tom,
            },
        };
    } else {
        return {
            ...periode,
            tidsperiode: {
                fom,
                tom: Uttaksdagen(tom).forrige(),
            },
        };
    }
};

const getForelderForPeriode = (saksperiode: Saksperiode, søkerErFarEllerMedmor: boolean): Forelder => {
    if (saksperiode.gjelderAnnenPart) {
        return søkerErFarEllerMedmor ? Forelder.mor : Forelder.farMedmor;
    }
    return søkerErFarEllerMedmor ? Forelder.farMedmor : Forelder.mor;
};

export const getUtsettelseÅrsakFromSaksperiode = (
    årsak: UtsettelseÅrsakTypeDTO | undefined
): UtsettelseÅrsakType | undefined => {
    switch (årsak) {
        case UtsettelseÅrsakTypeDTO.Arbeid:
            return UtsettelseÅrsakType.Arbeid;
        case UtsettelseÅrsakTypeDTO.Ferie:
            return UtsettelseÅrsakType.Ferie;
        case UtsettelseÅrsakTypeDTO.InstitusjonBarnet:
            return UtsettelseÅrsakType.InstitusjonBarnet;
        case UtsettelseÅrsakTypeDTO.InstitusjonSøker:
            return UtsettelseÅrsakType.InstitusjonSøker;
        case UtsettelseÅrsakTypeDTO.Sykdom:
            return UtsettelseÅrsakType.Sykdom;
        case UtsettelseÅrsakTypeDTO.HvØvelse:
            return UtsettelseÅrsakType.HvØvelse;
        case UtsettelseÅrsakTypeDTO.NavTiltak:
            return UtsettelseÅrsakType.NavTiltak;
        default:
            return undefined;
    }
};

const getOppholdÅrsakFromSaksperiode = (saksperiode: Saksperiode): OppholdÅrsakType | undefined => {
    switch (saksperiode.stønadskontotype) {
        case StønadskontoType.Fedrekvote:
            return OppholdÅrsakType.UttakFedrekvoteAnnenForelder;
        case StønadskontoType.Fellesperiode:
            return OppholdÅrsakType.UttakFellesperiodeAnnenForelder;
        case StønadskontoType.Mødrekvote:
            return OppholdÅrsakType.UttakMødrekvoteAnnenForelder;
        case StønadskontoType.ForeldrepengerFørFødsel:
            return OppholdÅrsakType.UttakForelderpengerFørFødsel;
        default:
            return undefined;
    }
};

const beregnSamtidigUttaksProsent = (
    egenProsent: number | undefined,
    andrePartsProsent: number | undefined,
    utbetalingsprosent: number
): string | undefined => {
    if (egenProsent) {
        return egenProsent.toString();
    }

    if (andrePartsProsent) {
        return utbetalingsprosent.toString();
    }

    return undefined;
};

export const getKontotypeBareFarHarRett = (periodeResultatÅrsak: string): StønadskontoType => {
    if (
        periodeResultatÅrsak !== PeriodeResultatÅrsak.BFHRMedAktivitetsKrav_2004 &&
        periodeResultatÅrsak !== PeriodeResultatÅrsak.BFHRMedAktivitetsKrav_2033
    ) {
        return StønadskontoType.AktivitetsfriKvote;
    } else {
        return StønadskontoType.Foreldrepenger;
    }
};

export const mapUttaksperiodeFromSaksperiode = (
    saksperiode: Saksperiode,
    grunnlag: Saksgrunnlag,
    innvilgedePerioder: Saksperiode[],
    erFarEllerMedmor: boolean
): Periode => {
    const gradert = saksperiode.graderingInnvilget !== undefined ? saksperiode.graderingInnvilget : false;
    const tidsperiodeDate = convertTidsperiodeToTidsperiodeDate(saksperiode.periode);
    const erFarEllerMedmorOgKunSøkerHarRett = erFarEllerMedmor && !grunnlag.morHarRett;

    if (saksperiode.gjelderAnnenPart) {
        return mapAnnenPartInfoPeriodeFromSaksperiode(saksperiode, erFarEllerMedmor, innvilgedePerioder);
    }

    const annenPartSamtidigUttakPeriode: Saksperiode | undefined = innvilgedePerioder.find(
        (ip) =>
            Tidsperioden(convertTidsperiodeToTidsperiodeDate(ip.periode)).erLik(tidsperiodeDate) &&
            ip.guid !== saksperiode.guid
    );
    let samtidigUttakProsentAnnenPart;

    if (annenPartSamtidigUttakPeriode) {
        samtidigUttakProsentAnnenPart = annenPartSamtidigUttakPeriode.samtidigUttaksprosent;
    }

    const samtidigUttakProsent = beregnSamtidigUttaksProsent(
        saksperiode.samtidigUttaksprosent,
        samtidigUttakProsentAnnenPart,
        saksperiode.utbetalingsprosent
    );

    let konto;

    if (erFarEllerMedmorOgKunSøkerHarRett) {
        konto = getKontotypeBareFarHarRett(saksperiode.periodeResultatÅrsak);
    }

    const { termindato, fødselsdato, omsorgsovertakelsesdato } = grunnlag;

    const familiehendelseDato = getRelevantFamiliehendelseDato(termindato, fødselsdato, omsorgsovertakelsesdato);

    const uttaksperiode: Uttaksperiode = {
        id: guid(),
        type: Periodetype.Uttak,
        konto: konto !== undefined ? konto : saksperiode.stønadskontotype,
        tidsperiode: tidsperiodeDate,
        forelder: getForelderForPeriode(saksperiode, erFarEllerMedmor),
        ønskerSamtidigUttak: samtidigUttakProsent !== undefined,
        gradert,
        samtidigUttakProsent,
        ønskerFlerbarnsdager: saksperiode.flerbarnsdager,
        stillingsprosent: gradert ? saksperiode.arbeidstidprosent.toString() : undefined,
        arbeidsformer: gradert
            ? saksperiode.uttakArbeidType.map((arbType) => getArbeidsformFromUttakArbeidstype(arbType))
            : undefined,
        orgnumre: gradert ? [saksperiode.arbeidsgiverInfo.id] : undefined,
        morsAktivitetIPerioden: saksperiode.morsAktivitet,
        erMorForSyk:
            erFarEllerMedmor &&
            !saksperiode.flerbarnsdager &&
            dayjs(saksperiode.periode.fom).isBefore(dayjs(familiehendelseDato).add(6, 'weeks'))
                ? true
                : undefined,
    };

    return uttaksperiode;
};

const mapUtsettelseperiodeFromSaksperiode = (saksperiode: Saksperiode, erFarEllerMedmor: boolean): Periode => {
    if (saksperiode.gjelderAnnenPart) {
        return mapAnnenPartInfoPeriodeFromSaksperiode(saksperiode, erFarEllerMedmor);
    }

    const utsettelsesperiode: Utsettelsesperiode = {
        id: guid(),
        type: Periodetype.Utsettelse,
        årsak: getUtsettelseÅrsakFromSaksperiode(saksperiode.utsettelsePeriodeType)!,
        tidsperiode: convertTidsperiodeToTidsperiodeDate(saksperiode.periode),
        forelder: getForelderForPeriode(saksperiode, erFarEllerMedmor),
        erArbeidstaker: false,
        morsAktivitetIPerioden: saksperiode.morsAktivitet,
    };

    if (utsettelsesperiode.årsak === UtsettelseÅrsakType.Arbeid) {
        const arbeidsformer = saksperiode.uttakArbeidType.map((arbType) => getArbeidsformFromUttakArbeidstype(arbType));
        const orgnummer = saksperiode.arbeidsgiverInfo.id;

        return {
            ...utsettelsesperiode,
            arbeidsformer,
            orgnumre: arbeidsformer.includes(Arbeidsform.arbeidstaker) ? [orgnummer] : undefined,
            erArbeidstaker: orgnummer ? true : false,
        };
    }

    return utsettelsesperiode;
};

const mapInfoPeriodeFromAvslåttSaksperiode = (saksperiode: Saksperiode, erFarEllerMedmor: boolean): AvslåttPeriode => {
    const avslåttPeriode: AvslåttPeriode = {
        id: guid(),
        type: Periodetype.Info,
        infotype: PeriodeInfoType.avslåttPeriode,
        tidsperiode: convertTidsperiodeToTidsperiodeDate(saksperiode.periode),
        avslåttPeriodeType: saksperiode.utsettelsePeriodeType ? Periodetype.Utsettelse : Periodetype.Uttak,
        stønadskonto: saksperiode.stønadskontotype,
        forelder: getForelderForPeriode(saksperiode, erFarEllerMedmor),
        overskrives: true,
        visPeriodeIPlan: true,
    };
    return avslåttPeriode;
};

const mapAnnenPartInfoPeriodeFromSaksperiode = (
    saksperiode: Saksperiode,
    erFarEllerMedmor: boolean,
    innvilgedePerioder?: Saksperiode[]
): UttakAnnenPartInfoPeriode | UtsettelseAnnenPartInfoPeriode => {
    const tidsperiodeDate = convertTidsperiodeToTidsperiodeDate(saksperiode.periode);

    if (saksperiode.utsettelsePeriodeType && saksperiode.periodeResultatType !== PeriodeResultatType.AVSLÅTT) {
        return {
            type: Periodetype.Info,
            infotype: PeriodeInfoType.utsettelseAnnenPart,
            id: guid(),
            årsak: getUtsettelseÅrsakFromSaksperiode(saksperiode.utsettelsePeriodeType)!,
            tidsperiode: tidsperiodeDate,
            forelder: getForelderForPeriode(saksperiode, erFarEllerMedmor),
            overskrives: true,
            resultatType: saksperiode.periodeResultatType,
            visPeriodeIPlan: true,
        };
    }

    const skalVises =
        innvilgedePerioder !== undefined &&
        !innvilgedePerioder.some(
            (ip) =>
                Tidsperioden(convertTidsperiodeToTidsperiodeDate(ip.periode)).erLik(tidsperiodeDate) &&
                ip.guid !== saksperiode.guid
        );
    const årsak = getOppholdÅrsakFromSaksperiode(saksperiode);
    const gradert = saksperiode.graderingInnvilget !== undefined ? saksperiode.graderingInnvilget : false;

    const annenPartSamtidigUttakPeriode: Saksperiode | undefined =
        innvilgedePerioder !== undefined
            ? innvilgedePerioder.find(
                  (ip) =>
                      Tidsperioden(convertTidsperiodeToTidsperiodeDate(ip.periode)).erLik(tidsperiodeDate) &&
                      ip.guid !== saksperiode.guid
              )
            : undefined;
    let samtidigUttakProsentAnnenPart;

    if (annenPartSamtidigUttakPeriode) {
        samtidigUttakProsentAnnenPart = annenPartSamtidigUttakPeriode.samtidigUttaksprosent;
    }

    const samtidigUttaksprosent = beregnSamtidigUttaksProsent(
        saksperiode.samtidigUttaksprosent,
        samtidigUttakProsentAnnenPart,
        saksperiode.utbetalingsprosent
    );

    return {
        type: Periodetype.Info,
        infotype: PeriodeInfoType.uttakAnnenPart,
        id: guid(),
        årsak: årsak!,
        tidsperiode: tidsperiodeDate,
        forelder: getForelderForPeriode(saksperiode, erFarEllerMedmor),
        overskrives: true,
        resultatType: saksperiode.periodeResultatType,
        gradert,
        ønskerSamtidigUttak: samtidigUttaksprosent !== undefined,
        samtidigUttakProsent: samtidigUttaksprosent,
        stillingsprosent: gradert ? saksperiode.arbeidstidprosent.toString() : undefined,
        visPeriodeIPlan: skalVises,
    };
};

const mapOverføringsperiodeFromSaksperiode = (
    saksperiode: Saksperiode,
    erFarEllerMedmor: boolean
): Overføringsperiode => {
    return {
        id: guid(),
        forelder: getForelderForPeriode(saksperiode, erFarEllerMedmor),
        konto: saksperiode.stønadskontotype,
        tidsperiode: convertTidsperiodeToTidsperiodeDate(saksperiode.periode),
        type: Periodetype.Overføring,
        årsak: saksperiode.overfoeringAarsak!,
    };
};

const mapPeriodeFromSaksperiode = (
    saksperiode: Saksperiode,
    grunnlag: Saksgrunnlag,
    innvilgedePerioder: Saksperiode[],
    erFarEllerMedmor: boolean
): Periode => {
    if (saksperiode.gjelderAnnenPart) {
        return mapAnnenPartInfoPeriodeFromSaksperiode(saksperiode, erFarEllerMedmor, innvilgedePerioder);
    }

    if (
        saksperiode.periodeResultatType === PeriodeResultatType.AVSLÅTT &&
        (!saksperiode.utbetalingsprosent || saksperiode.utbetalingsprosent === 0)
    ) {
        return mapInfoPeriodeFromAvslåttSaksperiode(saksperiode, erFarEllerMedmor);
    }

    if (
        saksperiode.utsettelsePeriodeType !== undefined &&
        (!saksperiode.utbetalingsprosent || saksperiode.utbetalingsprosent === 0)
    ) {
        return mapUtsettelseperiodeFromSaksperiode(saksperiode, erFarEllerMedmor);
    }

    if (saksperiode.overfoeringAarsak !== undefined) {
        return mapOverføringsperiodeFromSaksperiode(saksperiode, erFarEllerMedmor);
    }

    return mapUttaksperiodeFromSaksperiode(saksperiode, grunnlag, innvilgedePerioder, erFarEllerMedmor);
};

const gyldigeSaksperioder = (saksperiode: Saksperiode): boolean => {
    if (saksperiode.periodeResultatType === PeriodeResultatType.INNVILGET) {
        return true;
    }

    if (saksperiode.periodeResultatType === PeriodeResultatType.AVSLÅTT && saksperiode.utbetalingsprosent > 0) {
        return true;
    }

    if (
        saksperiode.periodeResultatType === PeriodeResultatType.AVSLÅTT &&
        saksperiode.utsettelsePeriodeType !== undefined &&
        saksperiode.utsettelsePeriodeType === UtsettelseÅrsakTypeDTO.InstitusjonBarnet
    ) {
        return true;
    }

    return false;
};

const mapSaksperioderTilUttaksperioder = (
    saksperioder: Saksperiode[],
    grunnlag: Saksgrunnlag,
    erFarEllerMedmor: boolean,
    erEndringsøknadUtenEkisterendeSak: boolean
): Periode[] => {
    const innvilgedePerioder = saksperioder.filter(gyldigeSaksperioder);
    const perioder = innvilgedePerioder.map((periode) =>
        mapPeriodeFromSaksperiode(periode, grunnlag, innvilgedePerioder, erFarEllerMedmor)
    );

    const sammenslåddePerioder: Periode[] = slåSammenLikePerioder(
        perioder
            .sort(sorterPerioder)
            .filter(harUttaksdager)
            .map(korrigerTidsperiodeTilGyldigUttaksdag)
            .filter(harGyldigTidsperiode)
            .filter(harUttaksdager)
    );

    const kunFarMedmorHarRett = !grunnlag.morHarRett && grunnlag.farMedmorHarRett;
    const erAdopsjon = grunnlag.familiehendelseType === FamiliehendelseType.ADOPSJON;

    return finnOgSettInnHull(
        sammenslåddePerioder,
        erEndringsøknadUtenEkisterendeSak,
        førsteOktober2021ReglerGjelder(new Date(grunnlag.familiehendelseDato)),
        kunFarMedmorHarRett,
        new Date(grunnlag.familiehendelseDato),
        erAdopsjon
    );
};

export default mapSaksperioderTilUttaksperioder;
