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

const erUttakMerEnnTreMånederSiden = (periode: Periode) =>
    periode.type === Periodetype.Uttak &&
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

export const getSeneEndringerSomKreverBegrunnelse = (uttaksplan: Periode[]): SenEndringÅrsak => {
    const utsettelseKreverBegrunnelse = uttaksplan.filter(erUtsettelseTilbakeITid).some(erUtsettelsePgaSykdom);
    const uttakKreverBegrunnelse = uttaksplan.some(erUttakMerEnnTreMånederSiden);

    if (utsettelseKreverBegrunnelse) {
        return uttakKreverBegrunnelse ? SenEndringÅrsak.SykdomOgUttak : SenEndringÅrsak.Sykdom;
    } else {
        return uttakKreverBegrunnelse ? SenEndringÅrsak.Uttak : SenEndringÅrsak.Ingen;
    }
};
