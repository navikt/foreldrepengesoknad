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
    GruppertInfoPeriode,
    isAnnenPartInfoPeriode,
    UtsettelseAnnenPartInfoPeriode,
    Overføringsperiode
} from '../../types/uttaksplan/periodetyper';
import { guid } from 'nav-frontend-js-utils';
import { sorterPerioder } from '../uttaksplan/Periodene';
import { Perioden } from '../uttaksplan/Perioden';
import { Uttaksdagen, erUttaksdag } from '../uttaksplan/Uttaksdagen';
import { getUtsettelseÅrsakFromSaksperiode } from '../uttaksplan/uttaksperiodeUtils';
import { Saksperiode, Saksgrunnlag, PeriodeResultatType } from '../../types/EksisterendeSak';
import { Forelder } from 'common/types';
import { isValidTidsperiode } from '../uttaksplan/Tidsperioden';
import { getArbeidsformFromUttakArbeidstype } from './eksisterendeSakUtils';
import * as moment from 'moment';

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
    let forrigePeriode: Periode | undefined = { ...perioder[0] };

    perioder.forEach((periode, index) => {
        if (index === 0) {
            return;
        }

        if (forrigePeriode === undefined) {
            forrigePeriode = periode;
            return;
        }

        if (Perioden(forrigePeriode).erLik(periode) && Perioden(forrigePeriode).erSammenhengende(periode)) {
            forrigePeriode.tidsperiode.tom = periode.tidsperiode.tom;
            return;
        } else {
            nyePerioder.push(forrigePeriode);
            forrigePeriode = undefined;
        }

        forrigePeriode = periode;
    });

    nyePerioder.push(forrigePeriode);

    return nyePerioder;
};

const grupperAnnenPartInfoPerioder = (perioder: Periode[]): Periode[] => {
    if (perioder.length <= 1) {
        return perioder;
    }

    const nyePerioder: Periode[] = [];
    let gruppertPeriode: GruppertInfoPeriode | undefined;

    perioder.forEach((periode, index) => {
        if (isAnnenPartInfoPeriode(periode) && !periode.ønskerSamtidigUttak) {
            if (!gruppertPeriode) {
                gruppertPeriode = {
                    id: guid(),
                    type: Periodetype.Info,
                    infotype: PeriodeInfoType.gruppertInfo,
                    tidsperiode: { ...periode.tidsperiode },
                    forelder: periode.forelder,
                    overskrives: true,
                    perioder: [periode],
                    visPeriodeIPlan: true
                };
            } else {
                gruppertPeriode.tidsperiode.tom = periode.tidsperiode.tom;
                gruppertPeriode.perioder.push(periode);
            }
            return;
        }

        if (gruppertPeriode) {
            nyePerioder.push(gruppertPeriode);
            gruppertPeriode = undefined;
        }

        nyePerioder.push(periode);
    });
    if (gruppertPeriode) {
        nyePerioder.push(gruppertPeriode);
    }
    return nyePerioder;
};

const korrigerTidsperiodeTilGyldigUttaksdag = (periode: Periode): Periode => {
    const { fom, tom } = periode.tidsperiode;
    const fomOk = erUttaksdag(fom);
    const tomOk = erUttaksdag(tom);
    if (fomOk && tomOk) {
        return periode;
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
    if (saksperiode.flerbarnsdager) {
        return OppholdÅrsakType.UttakFlerbarnsukerAnnenForelder;
    }
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

const mapUttaksperiodeFromSaksperiode = (
    saksperiode: Saksperiode,
    grunnlag: Saksgrunnlag,
    erEndringssøknad: boolean
): Periode | undefined => {
    const gradert = saksperiode.arbeidstidprosent !== undefined && saksperiode.arbeidstidprosent !== 0;
    const samtidigUttaksprosent =
        saksperiode.samtidigUttaksprosent !== undefined && saksperiode.samtidigUttaksprosent !== 0;

    if (saksperiode.gjelderAnnenPart) {
        return mapAnnenPartInfoPeriodeFromSaksperiode(saksperiode, grunnlag);
    }

    const uttaksperiode: Uttaksperiode = {
        id: guid(),
        type: Periodetype.Uttak,
        konto: saksperiode.stønadskontotype,
        tidsperiode: { ...saksperiode.tidsperiode },
        forelder: getForelderForPeriode(saksperiode, grunnlag.søkerErFarEllerMedmor),
        ønskerSamtidigUttak: saksperiode.samtidigUttak,
        gradert,
        samtidigUttakProsent: samtidigUttaksprosent ? saksperiode.samtidigUttaksprosent.toString() : undefined,
        stillingsprosent: gradert ? saksperiode.arbeidstidprosent.toString() : undefined,
        arbeidsformer: gradert ? [getArbeidsformFromUttakArbeidstype(saksperiode.uttakArbeidType)] : undefined,
        orgnumre: gradert ? [saksperiode.arbeidsgiverInfo.id] : undefined,
        morsAktivitetIPerioden: saksperiode.morsAktivitetIPerioden,
        erMorForSyk:
            erEndringssøknad &&
            grunnlag.søkerErFarEllerMedmor &&
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
        const arbeidsform = getArbeidsformFromUttakArbeidstype(saksperiode.uttakArbeidType);
        const orgnummer = saksperiode.arbeidsgiverInfo.id;

        return {
            ...utsettelsesperiode,
            arbeidsformer: [arbeidsform],
            orgnumre: arbeidsform === Arbeidsform.arbeidstaker ? [orgnummer] : undefined,
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
    grunnlag: Saksgrunnlag
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

    const årsak = getOppholdÅrsakFromSaksperiode(saksperiode);
    const gradert = saksperiode.arbeidstidprosent !== undefined && saksperiode.arbeidstidprosent !== 0;
    const samtidigUttaksprosent =
        saksperiode.samtidigUttaksprosent !== undefined && saksperiode.samtidigUttaksprosent !== 0;
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
            ønskerSamtidigUttak: saksperiode.samtidigUttak,
            samtidigUttakProsent: samtidigUttaksprosent ? saksperiode.samtidigUttaksprosent.toString() : undefined,
            stillingsprosent: gradert ? saksperiode.arbeidstidprosent.toString() : undefined,
            visPeriodeIPlan: saksperiode.samtidigUttak ? false : true
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
    erEndringssøknad: boolean
): Periode | undefined => {
    if (saksperiode.gjelderAnnenPart) {
        return mapAnnenPartInfoPeriodeFromSaksperiode(saksperiode, grunnlag);
    }
    if (saksperiode.periodeResultatType === PeriodeResultatType.AVSLÅTT) {
        return mapInfoPeriodeFromAvslåttSaksperiode(saksperiode, grunnlag);
    }
    if (saksperiode.utsettelsePeriodeType !== undefined) {
        return mapUtsettelseperiodeFromSaksperiode(saksperiode, grunnlag);
    }
    if (saksperiode.overfoeringAarsak !== undefined) {
        return mapOverføringsperiodeFromSaksperiode(saksperiode, grunnlag);
    }
    return mapUttaksperiodeFromSaksperiode(saksperiode, grunnlag, erEndringssøknad);
};

const mapSaksperioderTilUttaksperioder = (
    saksperioder: Saksperiode[],
    grunnlag: Saksgrunnlag,
    erEndringssøknad: boolean
): Periode[] | undefined => {
    const perioder = saksperioder
        .filter((saksperiode) => saksperiode.periodeResultatType === PeriodeResultatType.INNVILGET)
        .map((periode) => mapPeriodeFromSaksperiode(periode, grunnlag, erEndringssøknad));

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

    return grupperAnnenPartInfoPerioder(sammenslåddePerioder);
};

export default mapSaksperioderTilUttaksperioder;
