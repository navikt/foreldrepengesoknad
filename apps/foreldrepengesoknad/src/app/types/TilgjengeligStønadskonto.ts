import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';

export interface TilgjengeligStønadskonto {
    konto: StønadskontoType;
    dager: number;
}
