import { TilgjengeligStønadskonto, StønadskontoType } from 'app/types/uttaksplan/periodetyper';

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
