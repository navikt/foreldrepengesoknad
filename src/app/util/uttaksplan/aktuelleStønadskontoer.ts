import { StønadskontoType, TilgjengeligStønadskonto } from '../../types/uttaksplan/periodetyper';

export const getVelgbareStønadskontotyper = (stønadskontoTyper: TilgjengeligStønadskonto[]): StønadskontoType[] =>
    stønadskontoTyper
        .filter(
            (kontoType) =>
                kontoType.konto === StønadskontoType.Flerbarnsuker ||
                kontoType.konto === StønadskontoType.Fellesperiode ||
                kontoType.konto === StønadskontoType.Fedrekvote ||
                kontoType.konto === StønadskontoType.Mødrekvote
        )
        .map((kontoType) => kontoType.konto);
