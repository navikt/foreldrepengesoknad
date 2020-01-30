import {
    Periode,
    Periodetype,
    Uttaksperiode,
    Utsettelsesperiode,
    AvslåttPeriode,
    OppholdÅrsakType,
    StønadskontoType,
    PeriodeInfoType,
    UtsettelseÅrsakType,
    Arbeidsform,
    UttakAnnenPartInfoPeriode,
    UtsettelseAnnenPartInfoPeriode,
    Overføringsperiode,
    isInfoPeriode,
    MorsAktivitet,
    SaksperiodeUtsettelseÅrsakType
} from '../../types/uttaksplan/periodetyper';
import { guid } from 'nav-frontend-js-utils';
import { sorterPerioder } from '../uttaksplan/Periodene';
import { Perioden } from '../uttaksplan/Perioden';
import { Uttaksdagen, erUttaksdag } from '../uttaksplan/Uttaksdagen';
import { getUtsettelseÅrsakFromSaksperiode } from '../uttaksplan/uttaksperiodeUtils';
import { Saksperiode, Saksgrunnlag, PeriodeResultatType } from '../../types/EksisterendeSak';
import { Forelder } from 'common/types';
import { isValidTidsperiode, Tidsperioden } from '../uttaksplan/Tidsperioden';
import { getArbeidsformFromUttakArbeidstype } from './eksisterendeSakUtils';
import moment from 'moment';
import { finnOgSettInnHull } from '../uttaksplan/builder/UttaksplanBuilder';

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
            forrigePeriode = undefined;
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
                tom: Uttaksdagen(tom).forrige()
            }
        };
    } else if (!fomOk && tomOk) {
        return {
            ...periode,
            tidsperiode: {
                fom: Uttaksdagen(fom).neste(),
                tom
            }
        };
    } else {
        return {
            ...periode,
            tidsperiode: {
                fom,
                tom: Uttaksdagen(tom).forrige()
            }
        };
    }
};

const getForelderForPeriode = (saksperiode: Saksperiode, søkerErFarEllerMedmor: boolean): Forelder => {
    if (saksperiode.gjelderAnnenPart) {
        return søkerErFarEllerMedmor ? Forelder.mor : Forelder.farMedmor;
    }
    return søkerErFarEllerMedmor ? Forelder.farMedmor : Forelder.mor;
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

export const mapUttaksperiodeFromSaksperiode = (
    saksperiode: Saksperiode,
    grunnlag: Saksgrunnlag,
    erEndringssøknad: boolean,
    innvilgedePerioder: Saksperiode[]
): Periode | undefined => {
    const gradert = saksperiode.graderingInnvilget !== undefined ? saksperiode.graderingInnvilget : false;

    if (saksperiode.gjelderAnnenPart) {
        return mapAnnenPartInfoPeriodeFromSaksperiode(saksperiode, grunnlag, innvilgedePerioder);
    }

    const annenPartSamtidigUttakPeriode: Saksperiode | undefined = innvilgedePerioder.find(
        (ip) => Tidsperioden(ip.tidsperiode).erLik(saksperiode.tidsperiode) && ip.guid !== saksperiode.guid
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
    if (saksperiode.morsAktivitetIPerioden === MorsAktivitet.Uføre) {
        konto = StønadskontoType.AktivitetsfriKvote;
    }

    const uttaksperiode: Uttaksperiode = {
        id: guid(),
        type: Periodetype.Uttak,
        konto: konto !== undefined ? konto : saksperiode.stønadskontotype,
        tidsperiode: { ...saksperiode.tidsperiode },
        forelder: getForelderForPeriode(saksperiode, grunnlag.søkerErFarEllerMedmor),
        ønskerSamtidigUttak: samtidigUttakProsent !== undefined,
        gradert,
        samtidigUttakProsent,
        ønskerFlerbarnsdager: saksperiode.flerbarnsdager,
        stillingsprosent: gradert ? saksperiode.arbeidstidprosent.toString() : undefined,
        arbeidsformer: gradert
            ? saksperiode.uttakArbeidType.map((arbType) => getArbeidsformFromUttakArbeidstype(arbType))
            : undefined,
        orgnumre: gradert ? [saksperiode.arbeidsgiverInfo.id] : undefined,
        morsAktivitetIPerioden: saksperiode.morsAktivitetIPerioden,
        erMorForSyk:
            erEndringssøknad &&
            grunnlag.søkerErFarEllerMedmor &&
            !saksperiode.flerbarnsdager &&
            moment(saksperiode.tidsperiode.fom).isBefore(moment(grunnlag.familieHendelseDato).add(6, 'weeks'))
                ? true
                : undefined
    };

    return uttaksperiode;
};

const mapUtsettelseperiodeFromSaksperiode = (saksperiode: Saksperiode, grunnlag: Saksgrunnlag): Periode | undefined => {
    if (saksperiode.gjelderAnnenPart) {
        return mapAnnenPartInfoPeriodeFromSaksperiode(saksperiode, grunnlag);
    }

    const utsettelsesperiode: Utsettelsesperiode = {
        id: guid(),
        type: Periodetype.Utsettelse,
        årsak: getUtsettelseÅrsakFromSaksperiode(saksperiode.utsettelsePeriodeType)!,
        tidsperiode: { ...saksperiode.tidsperiode },
        forelder: getForelderForPeriode(saksperiode, grunnlag.søkerErFarEllerMedmor),
        erArbeidstaker: false
    };

    if (utsettelsesperiode.årsak === UtsettelseÅrsakType.Arbeid) {
        const arbeidsformer = saksperiode.uttakArbeidType.map((arbType) => getArbeidsformFromUttakArbeidstype(arbType));
        const orgnummer = saksperiode.arbeidsgiverInfo.id;

        return {
            ...utsettelsesperiode,
            arbeidsformer,
            orgnumre: arbeidsformer.includes(Arbeidsform.arbeidstaker) ? [orgnummer] : undefined,
            erArbeidstaker: orgnummer ? true : false
        };
    }

    return utsettelsesperiode;
};

const mapInfoPeriodeFromAvslåttSaksperiode = (saksperiode: Saksperiode, grunnlag: Saksgrunnlag): AvslåttPeriode => {
    const avslåttPeriode: AvslåttPeriode = {
        id: guid(),
        type: Periodetype.Info,
        infotype: PeriodeInfoType.avslåttPeriode,
        tidsperiode: { ...saksperiode.tidsperiode },
        avslåttPeriodeType: saksperiode.utsettelsePeriodeType ? Periodetype.Utsettelse : Periodetype.Uttak,
        stønadskonto: saksperiode.stønadskontotype,
        forelder: getForelderForPeriode(saksperiode, grunnlag.søkerErFarEllerMedmor),
        overskrives: true,
        visPeriodeIPlan: true
    };
    return avslåttPeriode;
};

const mapAnnenPartInfoPeriodeFromSaksperiode = (
    saksperiode: Saksperiode,
    grunnlag: Saksgrunnlag,
    innvilgedePerioder?: Saksperiode[]
): UttakAnnenPartInfoPeriode | UtsettelseAnnenPartInfoPeriode | undefined => {
    if (saksperiode.utsettelsePeriodeType) {
        return {
            type: Periodetype.Info,
            infotype: PeriodeInfoType.utsettelseAnnenPart,
            id: guid(),
            årsak: getUtsettelseÅrsakFromSaksperiode(saksperiode.utsettelsePeriodeType)!,
            tidsperiode: { ...saksperiode.tidsperiode },
            forelder: getForelderForPeriode(saksperiode, grunnlag.søkerErFarEllerMedmor),
            overskrives: true,
            resultatType: saksperiode.periodeResultatType,
            visPeriodeIPlan: true
        };
    }

    const skalVises =
        innvilgedePerioder !== undefined &&
        !innvilgedePerioder.some(
            (ip) => Tidsperioden(ip.tidsperiode).erLik(saksperiode.tidsperiode) && ip.guid !== saksperiode.guid
        );
    const årsak = getOppholdÅrsakFromSaksperiode(saksperiode);
    const gradert = saksperiode.graderingInnvilget !== undefined ? saksperiode.graderingInnvilget : false;

    const annenPartSamtidigUttakPeriode: Saksperiode | undefined =
        innvilgedePerioder !== undefined
            ? innvilgedePerioder.find(
                  (ip) => Tidsperioden(ip.tidsperiode).erLik(saksperiode.tidsperiode) && ip.guid !== saksperiode.guid
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

    if (årsak) {
        return {
            type: Periodetype.Info,
            infotype: PeriodeInfoType.uttakAnnenPart,
            id: guid(),
            årsak,
            tidsperiode: { ...saksperiode.tidsperiode },
            forelder: getForelderForPeriode(saksperiode, grunnlag.søkerErFarEllerMedmor),
            overskrives: true,
            resultatType: saksperiode.periodeResultatType,
            gradert,
            ønskerSamtidigUttak: samtidigUttaksprosent !== undefined,
            samtidigUttakProsent: samtidigUttaksprosent,
            stillingsprosent: gradert ? saksperiode.arbeidstidprosent.toString() : undefined,
            visPeriodeIPlan: skalVises
        };
    }
    return undefined;
};

const mapOverføringsperiodeFromSaksperiode = (saksperiode: Saksperiode, grunnlag: Saksgrunnlag): Overføringsperiode => {
    return {
        id: guid(),
        forelder: getForelderForPeriode(saksperiode, grunnlag.søkerErFarEllerMedmor),
        konto: saksperiode.stønadskontotype,
        tidsperiode: { ...saksperiode.tidsperiode },
        type: Periodetype.Overføring,
        årsak: saksperiode.overfoeringAarsak!
    };
};

const mapPeriodeFromSaksperiode = (
    saksperiode: Saksperiode,
    grunnlag: Saksgrunnlag,
    erEndringssøknad: boolean,
    innvilgedePerioder: Saksperiode[]
): Periode | undefined => {
    if (saksperiode.gjelderAnnenPart) {
        return mapAnnenPartInfoPeriodeFromSaksperiode(saksperiode, grunnlag, innvilgedePerioder);
    }
    if (
        saksperiode.periodeResultatType === PeriodeResultatType.AVSLÅTT &&
        (!saksperiode.utbetalingsprosent || saksperiode.utbetalingsprosent === 0)
    ) {
        return mapInfoPeriodeFromAvslåttSaksperiode(saksperiode, grunnlag);
    }
    if (
        saksperiode.utsettelsePeriodeType !== undefined &&
        (!saksperiode.utbetalingsprosent || saksperiode.utbetalingsprosent === 0)
    ) {
        return mapUtsettelseperiodeFromSaksperiode(saksperiode, grunnlag);
    }
    if (saksperiode.overfoeringAarsak !== undefined) {
        return mapOverføringsperiodeFromSaksperiode(saksperiode, grunnlag);
    }
    return mapUttaksperiodeFromSaksperiode(saksperiode, grunnlag, erEndringssøknad, innvilgedePerioder);
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
        saksperiode.utsettelsePeriodeType &&
        saksperiode.utsettelsePeriodeType === SaksperiodeUtsettelseÅrsakType.InstitusjonBarnet
    ) {
        return true;
    }

    return false;
};

const mapSaksperioderTilUttaksperioder = (
    saksperioder: Saksperiode[],
    grunnlag: Saksgrunnlag,
    erEndringsøknadUtenEkisterendeSak: boolean
): Periode[] | undefined => {
    const innvilgedePerioder = saksperioder.filter(gyldigeSaksperioder);
    const perioder = innvilgedePerioder.map((periode) =>
        mapPeriodeFromSaksperiode(periode, grunnlag, erEndringsøknadUtenEkisterendeSak, innvilgedePerioder)
    );

    if (perioder.some((p) => p === undefined)) {
        return undefined;
    }

    const sammenslåddePerioder: Periode[] = slåSammenLikePerioder(
        perioder
            .sort(sorterPerioder)
            .filter(harUttaksdager)
            .map(korrigerTidsperiodeTilGyldigUttaksdag)
            .filter(harGyldigTidsperiode)
            .filter(harUttaksdager)
    );

    return finnOgSettInnHull(sammenslåddePerioder, erEndringsøknadUtenEkisterendeSak);
};

export default mapSaksperioderTilUttaksperioder;
