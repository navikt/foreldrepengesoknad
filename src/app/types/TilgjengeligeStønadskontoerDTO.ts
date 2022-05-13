import { MinsterettType } from 'uttaksplan/types/MinsterettType';

export interface TilgjengeligeMinsterettskontoer {
    [MinsterettType.farRundtFødsel]: number;
    [MinsterettType.generellMinsterett]: number;
}
export interface TilgjengeligeStønadskontoerDTO {
    kontoer: {
        [key: string]: number;
    };
    minsteretter: TilgjengeligeMinsterettskontoer;
}
