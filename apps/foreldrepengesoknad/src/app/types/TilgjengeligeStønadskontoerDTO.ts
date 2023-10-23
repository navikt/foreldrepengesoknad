import { MinsterettType } from '@navikt/fp-common';

export interface TilgjengeligeMinsterettskontoer {
    [MinsterettType.farRundtFødsel]: number;
    [MinsterettType.generellMinsterett]: number;
    [MinsterettType.toTette]: number;
}
export interface TilgjengeligeStønadskontoerDTO {
    kontoer: {
        [key: string]: number;
    };
    minsteretter: TilgjengeligeMinsterettskontoer;
}
