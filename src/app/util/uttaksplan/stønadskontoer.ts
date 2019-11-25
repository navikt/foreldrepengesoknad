import { StønadskontoType, TilgjengeligStønadskonto, Stønadskontouttak } from '../../types/uttaksplan/periodetyper';
import { EksisterendeSak } from 'app/types/EksisterendeSak';
import { getBrukteDager } from 'app/components/uttaksplanlegger/components/uttakFordeling/brukteDagerUtils';

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
    [StønadskontoType.Flerbarnsdager]: 6,
    [StønadskontoType.AktivitetsfriKvote]: 7
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
    eksisterendeSak: EksisterendeSak,
    tilgjengeligStønadskonto: TilgjengeligStønadskonto[]
): TilgjengeligStønadskonto[] => {
    const brukteDager = getBrukteDager(
        tilgjengeligStønadskonto,
        eksisterendeSak.uttaksplan!,
        eksisterendeSak.grunnlag.familieHendelseDato
    );

    return tilgjengeligStønadskonto.map((k) => ({
        ...k,
        dager: k.dager - getBrukteUttaksdager(brukteDager.alle, k.konto)
    }));
};

const getBrukteUttaksdager = (tilgjengeligeStønadskontoer: Stønadskontouttak[], kontoType: StønadskontoType): number => {
    const tilgjenligStønadskonto = tilgjengeligeStønadskontoer.find((t) => t.konto === kontoType);
    return tilgjenligStønadskonto ? tilgjenligStønadskonto.dager : 0;
};
