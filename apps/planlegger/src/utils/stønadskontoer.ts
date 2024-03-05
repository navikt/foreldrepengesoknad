import { TilgjengeligeStønadskontoerDTO } from 'types/TilgjengeligeStønadskontoerDTO';

import { StønadskontoType, TilgjengeligStønadskonto } from '@navikt/fp-common';

const opprettAktivitetsFriKonto = (
    kontoer: TilgjengeligStønadskonto[],
    generellMinsterett: number,
): TilgjengeligStønadskonto[] => {
    const nyeKontoer: TilgjengeligStønadskonto[] = [];
    nyeKontoer.push({ ...kontoer[0], dager: kontoer[0].dager - generellMinsterett });
    nyeKontoer.push({ konto: StønadskontoType.AktivitetsfriKvote, dager: generellMinsterett });
    return nyeKontoer;
};
export const mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto = (
    stønadskontoerDTO: TilgjengeligeStønadskontoerDTO,
): TilgjengeligStønadskonto[] => {
    let tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[] = [];
    Object.keys(stønadskontoerDTO.kontoer)
        .filter((konto: string) => konto !== StønadskontoType.Flerbarnsdager)
        .forEach((konto) => {
            tilgjengeligeStønadskontoer.push({
                konto: konto as StønadskontoType,
                dager: stønadskontoerDTO.kontoer[konto],
            });
        });
    const generellMinsterett = stønadskontoerDTO.minsteretter.generellMinsterett;
    if (generellMinsterett > 0) {
        tilgjengeligeStønadskontoer = opprettAktivitetsFriKonto(tilgjengeligeStønadskontoer, generellMinsterett);
    }
    return tilgjengeligeStønadskontoer;
};

export const getAntallUker = (kontoer: TilgjengeligStønadskonto[]): number => {
    return kontoer.reduce((sum: number, konto: TilgjengeligStønadskonto) => sum + konto.dager / 5, 0);
};

export const getAntallUkerForeldrepengerFørFødsel = (kontoer: TilgjengeligStønadskonto[]): number => {
    return kontoer
        .filter((konto: TilgjengeligStønadskonto) => konto.konto === StønadskontoType.ForeldrepengerFørFødsel)
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

export const getAntallUkerForeldrepenger = (kontoer: TilgjengeligStønadskonto[]): number => {
    return kontoer
        .filter((konto: TilgjengeligStønadskonto) => konto.konto === StønadskontoType.Foreldrepenger)
        .reduce((sum: number, konto: TilgjengeligStønadskonto) => sum + konto.dager / 5, 0);
};

export const getAntallUkerAktivitetsfriKvote = (kontoer: TilgjengeligStønadskonto[]): number => {
    return kontoer
        .filter((konto: TilgjengeligStønadskonto) => konto.konto === StønadskontoType.AktivitetsfriKvote)
        .reduce((sum: number, konto: TilgjengeligStønadskonto) => sum + konto.dager / 5, 0);
};
