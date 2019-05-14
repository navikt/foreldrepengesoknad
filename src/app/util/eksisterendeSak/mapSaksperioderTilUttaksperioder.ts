import { Periode, Periodetype, Uttaksperiode, Utsettelsesperiode } from '../../types/uttaksplan/periodetyper';
import { guid } from 'nav-frontend-js-utils';
import { sorterPerioder } from '../uttaksplan/Periodene';
import { Perioden } from '../uttaksplan/Perioden';
import { Uttaksdagen, erUttaksdag } from '../uttaksplan/Uttaksdagen';
import { getUtsettelseÅrsakFromSaksperiode } from '../uttaksplan/uttaksperiodeUtils';
import { EksisterendePeriode, Uttaksgrunnlag, PeriodeResultatType } from '../../types/EksisterendeUttak';
import { Forelder } from 'common/types';
import { isValidTidsperiode } from '../uttaksplan/Tidsperioden';

const getForelderForPeriode = (saksperiode: EksisterendePeriode, søkerErFarEllerMedmor: boolean): Forelder => {
    if (saksperiode.gjelderAnnenPart) {
        return søkerErFarEllerMedmor ? Forelder.MOR : Forelder.FARMEDMOR;
    }
    return søkerErFarEllerMedmor ? Forelder.FARMEDMOR : Forelder.MOR;
};

const mapUttaksperiodeFromSaksperiode = (saksperiode: EksisterendePeriode, grunnlag: Uttaksgrunnlag): Periode => {
    const gradert = saksperiode.arbeidstidprosent !== 0;

    const uttaksperiode: Uttaksperiode = {
        id: guid(),
        type: Periodetype.Uttak,
        konto: saksperiode.stønadskontotype,
        tidsperiode: { ...saksperiode.tidsperiode },
        forelder: getForelderForPeriode(saksperiode, grunnlag.søkerErFarEllerMedmor),
        ønskerSamtidigUttak: saksperiode.samtidigUttak,
        gradert,
        samtidigUttakProsent: saksperiode.samtidigUttaksprosent,
        stillingsprosent: gradert ? saksperiode.arbeidstidprosent : undefined
    };

    return uttaksperiode;
};

const mapUtsettelseperiodeFromSaksperiode = (
    saksperiode: EksisterendePeriode,
    grunnlag: Uttaksgrunnlag
): Utsettelsesperiode => {
    const utsettelsesperiode: Utsettelsesperiode = {
        id: guid(),
        type: Periodetype.Utsettelse,
        årsak: getUtsettelseÅrsakFromSaksperiode(saksperiode.utsettelsePeriodeType)!,
        tidsperiode: { ...saksperiode.tidsperiode },
        forelder: getForelderForPeriode(saksperiode, grunnlag.søkerErFarEllerMedmor),
        erArbeidstaker: false
    };
    return utsettelsesperiode;
};

// const mapOppholdsperiodeFromSaksperiode = (saksperiode: Saksperiode, grunnlag: Saksgrunnlag): Periode => {

// };

// const mapOverføringsperiodeFromSaksperiode = (saksperiode: Saksperiode, grunnlag: Saksgrunnlag): Periode => {

// };

const getPeriodeFromSaksperiode = (saksperiode: EksisterendePeriode, grunnlag: Uttaksgrunnlag): Periode => {
    if (
        saksperiode.utsettelsePeriodeType !== undefined &&
        saksperiode.periodeResultatType === PeriodeResultatType.INNVILGET
    ) {
        return mapUtsettelseperiodeFromSaksperiode(saksperiode, grunnlag);
    }

    return mapUttaksperiodeFromSaksperiode(saksperiode, grunnlag);
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

const harUttaksdager = (periode: Periode): boolean => {
    return Perioden(periode).getAntallUttaksdager() > 0;
};

const harGyldigTidsperiode = (periode: Periode): boolean => {
    return isValidTidsperiode(periode.tidsperiode);
};

const korrigerTidsperiode = (periode: Periode): Periode => {
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

const mapSaksperioderTilUttaksperioder = (perioder: EksisterendePeriode[], grunnlag: Uttaksgrunnlag): Periode[] => {
    let uttakFraEksisterendeSak = perioder
        .map((periode) => getPeriodeFromSaksperiode(periode, grunnlag))
        .sort(sorterPerioder)
        .filter(harUttaksdager)
        .map(korrigerTidsperiode)
        .filter(harGyldigTidsperiode)
        .filter(harUttaksdager);
    uttakFraEksisterendeSak = slåSammenLikePerioder(uttakFraEksisterendeSak);

    return uttakFraEksisterendeSak;
};

export default mapSaksperioderTilUttaksperioder;
