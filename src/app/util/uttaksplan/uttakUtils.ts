import {
    Periode,
    Periodetype,
    SenEndringÅrsak,
    StønadskontoType,
    UtsettelseÅrsakType,
    Utsettelsesperiode
} from '../../types/uttaksplan/periodetyper';
import moment from 'moment';
import { dateIsTodayOrInFuture } from '../dates/dates';
import { Saksgrunnlag, EksisterendeSak, PeriodeResultatType } from 'app/types/EksisterendeSak';
import { erTidsperioderLike } from './Tidsperioden';
import { Søknadsinfo } from 'app/selectors/types';

export const erUttakAvAnnenForeldersKvote = (
    konto: StønadskontoType | undefined,
    søkerErFarEllerMedmor: boolean
): boolean => {
    return (
        (konto === StønadskontoType.Mødrekvote && søkerErFarEllerMedmor) ||
        (konto === StønadskontoType.Fedrekvote && !søkerErFarEllerMedmor)
    );
};

export const erUttakEgenKvote = (konto: StønadskontoType | undefined, søkerErFarEllerMedmor: boolean): boolean => {
    return erUttakAvAnnenForeldersKvote(konto, søkerErFarEllerMedmor) === false;
};

const erUtsettelseTilbakeITid = (periode: Periode) =>
    periode.type === Periodetype.Utsettelse && !dateIsTodayOrInFuture(periode.tidsperiode.fom);

const erUttakEllerOppholdMerEnnTreMånederSiden = (periode: Periode) =>
    (periode.type === Periodetype.Uttak || periode.type === Periodetype.Opphold) &&
    moment(periode.tidsperiode.fom).isBefore(
        moment()
            .startOf('day')
            .subtract(3, 'months')
    );

const erUtsettelsePgaSykdom = (periode: Utsettelsesperiode) =>
    periode.årsak === UtsettelseÅrsakType.Sykdom ||
    periode.årsak === UtsettelseÅrsakType.InstitusjonSøker ||
    periode.årsak === UtsettelseÅrsakType.InstitusjonBarnet;

const erUtsettelsePgaFerieEllerArbeid = (periode: Periode) =>
    periode.type === Periodetype.Utsettelse &&
    (periode.årsak === UtsettelseÅrsakType.Ferie || periode.årsak === UtsettelseÅrsakType.Arbeid);

export const erSenUtsettelsePgaFerieEllerArbeid = (periode: Periode) =>
    erUtsettelseTilbakeITid(periode) && erUtsettelsePgaFerieEllerArbeid(periode);

export const erSentGradertUttak = (periode: Periode) =>
    periode.type === Periodetype.Uttak && !dateIsTodayOrInFuture(periode.tidsperiode.fom) && periode.gradert;

export const getSeneEndringerSomKreverBegrunnelse = (uttaksplan: Periode[]): SenEndringÅrsak => {
    const utsettelseKreverBegrunnelse = uttaksplan.filter(erUtsettelseTilbakeITid).some(erUtsettelsePgaSykdom);
    const uttakKreverBegrunnelse = uttaksplan.some(erUttakEllerOppholdMerEnnTreMånederSiden);

    if (utsettelseKreverBegrunnelse) {
        return uttakKreverBegrunnelse ? SenEndringÅrsak.SykdomOgUttak : SenEndringÅrsak.Sykdom;
    } else {
        return uttakKreverBegrunnelse ? SenEndringÅrsak.Uttak : SenEndringÅrsak.Ingen;
    }
};

export const skalKunneViseMorsUttaksplanForFarEllerMedmor = (
    grunnlag: Saksgrunnlag,
    søknadsinfo: Søknadsinfo
): boolean => {
    const { søknaden, annenForelder } = søknadsinfo;
    return (
        moment(grunnlag.familieHendelseDato).isSame(søknaden.familiehendelsesdato, 'day') &&
        grunnlag.dekningsgrad === søknaden.dekningsgrad &&
        grunnlag.antallBarn === søknaden.antallBarn &&
        ((annenForelder.harRett === false && grunnlag.morErUfør && annenForelder.erUfør) ||
            (grunnlag.morHarRett && annenForelder.harRett))
    );
};

export const erPeriodeInnvilget = (periode: Periode, eksisterendeSak?: EksisterendeSak): boolean => {
    if (eksisterendeSak === undefined) {
        return false;
    }
    const saksperiode = getSaksperiode(periode, eksisterendeSak);
    return saksperiode ? saksperiode.periodeResultatType === PeriodeResultatType.INNVILGET : false;
};

const getSaksperiode = (periode: Periode, ekisterendeSak: EksisterendeSak) => {
    return ekisterendeSak.saksperioder.find((saksperiode) =>
        erTidsperioderLike(saksperiode.tidsperiode, periode.tidsperiode)
    );
};
