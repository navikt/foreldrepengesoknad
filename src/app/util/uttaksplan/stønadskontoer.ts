import { StønadskontoType, TilgjengeligStønadskonto } from '../../types/uttaksplan/periodetyper';
import { EksisterendeUttak, EksisterendePeriode, PeriodeResultatType } from 'app/types/EksisterendeUttak';
import { Tidsperioden } from './Tidsperioden';
import * as moment from 'moment';

export const getVelgbareStønadskontotyper = (stønadskontoTyper: TilgjengeligStønadskonto[]): StønadskontoType[] =>
    stønadskontoTyper
        .filter(
            (kontoType) =>
                kontoType.konto === StønadskontoType.Flerbarnsdager ||
                kontoType.konto === StønadskontoType.Fellesperiode ||
                kontoType.konto === StønadskontoType.Fedrekvote ||
                kontoType.konto === StønadskontoType.Mødrekvote ||
                kontoType.konto === StønadskontoType.Foreldrepenger ||
                kontoType.konto === StønadskontoType.AktivitetsfriKvote
        )
        .map((kontoType) => kontoType.konto);

export const getStønadskontoSortOrder = (konto: StønadskontoType): number => stønadskontoSortOrder[konto];

export const stønadskontoSortOrder = {
    [StønadskontoType.ForeldrepengerFørFødsel]: 1,
    [StønadskontoType.Mødrekvote]: 2,
    [StønadskontoType.Fedrekvote]: 3,
    [StønadskontoType.Fellesperiode]: 4,
    [StønadskontoType.Foreldrepenger]: 5,
    [StønadskontoType.SamtidigUttak]: 6,
    [StønadskontoType.Flerbarnsdager]: 7,
    [StønadskontoType.AktivitetsfriKvote]: 8
};

export const getAntallUker = (kontoer: TilgjengeligStønadskonto[]): number => {
    return kontoer
        .filter((konto: TilgjengeligStønadskonto) => konto.konto !== StønadskontoType.Flerbarnsdager)
        .reduce((sum: number, konto: TilgjengeligStønadskonto) => sum + konto.dager / 5, 0);
};

export const getAntallUkerMødrekvote = (kontoer: TilgjengeligStønadskonto[]): number => {
    return kontoer
        .filter((konto: TilgjengeligStønadskonto) => konto.konto === StønadskontoType.Mødrekvote)
        .reduce((sum: number, konto: TilgjengeligStønadskonto) => sum + konto.dager / 5, 0);
};

export const getAntallUkerFedrekvote = (kontoer: TilgjengeligStønadskonto[]): number => {
    return kontoer
        .filter((konto: TilgjengeligStønadskonto) => konto.konto === StønadskontoType.Fedrekvote)
        .reduce((sum: number, konto: TilgjengeligStønadskonto) => sum + konto.dager / 5, 0);
};

export const getAntallUkerFellesperiode = (kontoer: TilgjengeligStønadskonto[]): number => {
    return kontoer
        .filter((konto: TilgjengeligStønadskonto) => konto.konto === StønadskontoType.Fellesperiode)
        .reduce((sum: number, konto: TilgjengeligStønadskonto) => sum + konto.dager / 5, 0);
};

export const getResterendeStønadskontoer = (
    eksisterendeSak: EksisterendeUttak,
    tilgjengeligStønadskonto: TilgjengeligStønadskonto[]
): TilgjengeligStønadskonto[] => {
    return tilgjengeligStønadskonto.map((k) => ({
        ...k,
        dager: k.dager - getBrukteUttaksdager(eksisterendeSak.uttak, k.konto)
    }));
};

const getBrukteUttaksdager = (perioder: EksisterendePeriode[], kontoType: StønadskontoType): number => {
    return perioder
        .filter(
            (p) =>
                p.stønadskontotype === kontoType &&
                p.periodeResultatType !== PeriodeResultatType.INNVILGET &&
                moment(p.tidsperiode.fom).isBefore(moment(), 'day')
        )
        .map((p) => {
            return moment().isBefore(p.tidsperiode.tom)
                ? Tidsperioden({ fom: p.tidsperiode.fom, tom: moment().toDate() }).getAntallUttaksdager()
                : Tidsperioden(p.tidsperiode).getAntallUttaksdager();
        })
        .reduce((uttaksdager, total) => total + uttaksdager, 0);
};
