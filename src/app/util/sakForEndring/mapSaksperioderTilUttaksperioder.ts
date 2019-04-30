import moment from 'moment';
import { Periode, Periodetype, Uttaksperiode, Utsettelsesperiode } from '../../types/uttaksplan/periodetyper';
import { guid } from 'nav-frontend-js-utils';
import { sorterPerioder } from '../uttaksplan/Periodene';
import { Perioden } from '../uttaksplan/Perioden';
import { Uttaksdagen } from '../uttaksplan/Uttaksdagen';
import { getUtsettelseÅrsakFromSaksperiode } from '../uttaksplan/uttaksperiodeUtils';
import { Saksperiode, Saksgrunnlag } from '../../types/søknad/SakForEndring';
import { Forelder } from 'common/types';

const getForelderForPeriode = (saksperiode: Saksperiode, søkerErFarEllerMedmor: boolean): Forelder => {
    if (saksperiode.gjelderAnnenPart) {
        return søkerErFarEllerMedmor ? Forelder.MOR : Forelder.FARMEDMOR;
    }
    return søkerErFarEllerMedmor ? Forelder.FARMEDMOR : Forelder.MOR;
};

const mapUttaksperiodeFromSaksperiode = (saksperiode: Saksperiode, grunnlag: Saksgrunnlag): Periode => {
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

const mapUtsettelseperiodeFromSaksperiode = (saksperiode: Saksperiode, grunnlag: Saksgrunnlag): Periode => {
    const uttaksperiode: Utsettelsesperiode = {
        id: guid(),
        type: Periodetype.Utsettelse,
        årsak: getUtsettelseÅrsakFromSaksperiode(saksperiode.utsettelsePeriodeType)!,
        tidsperiode: { ...saksperiode.tidsperiode },
        forelder: getForelderForPeriode(saksperiode, grunnlag.søkerErFarEllerMedmor),
        erArbeidstaker: false
    };

    return uttaksperiode;
};

// const mapOppholdsperiodeFromSaksperiode = (saksperiode: Saksperiode, grunnlag: Saksgrunnlag): Periode => {

// };

// const mapOverføringsperiodeFromSaksperiode = (saksperiode: Saksperiode, grunnlag: Saksgrunnlag): Periode => {

// };

const getPeriodeFromSaksperiode = (saksperiode: Saksperiode, grunnlag: Saksgrunnlag): Periode => {
    if (saksperiode.utsettelsePeriodeType !== undefined) {
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

const fjernHelgeperioder = (perioder: Periode[]): Periode[] => {
    const filteredPerioder = perioder.filter((periode: Periode) => {
        const { tidsperiode } = periode;
        if (
            !Uttaksdagen(tidsperiode.fom).erUttaksdag() &&
            !Uttaksdagen(tidsperiode.tom).erUttaksdag() &&
            (moment(tidsperiode.fom)
                .add(24, 'hours')
                .isSame(tidsperiode.tom) ||
                moment(tidsperiode.fom).isSame(tidsperiode.tom))
        ) {
            return false;
        }

        return true;
    });

    return filteredPerioder;
};

const mapSaksperioderTilUttaksperioder = (perioder: Saksperiode[], grunnlag: Saksgrunnlag): Periode[] => {
    let uttakFraEksisterendeSak = perioder
        .map((periode) => getPeriodeFromSaksperiode(periode, grunnlag))
        .sort(sorterPerioder);
    uttakFraEksisterendeSak = slåSammenLikePerioder(uttakFraEksisterendeSak);
    uttakFraEksisterendeSak = fjernHelgeperioder(uttakFraEksisterendeSak);

    return uttakFraEksisterendeSak;
};

export default mapSaksperioderTilUttaksperioder;
