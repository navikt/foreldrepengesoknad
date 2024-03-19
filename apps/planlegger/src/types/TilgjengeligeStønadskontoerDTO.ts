export enum MinsterettType {
    farRundtFødsel = 'farRundtFødsel',
    generellMinsterett = 'generellMinsterett',
    toTette = 'toTette',
}

export interface TilgjengeligeMinsterettskontoer {
    [MinsterettType.farRundtFødsel]: number;
    [MinsterettType.generellMinsterett]: number;
    [MinsterettType.toTette]: number;
}

export interface TilgjengeligStønadskontoForDekningsgrad {
    kontoer: {
        [key: string]: number;
    };
    minsteretter: TilgjengeligeMinsterettskontoer;
}

export interface TilgjengeligeStønadskontoerDTO {
    '80': TilgjengeligStønadskontoForDekningsgrad;
    '100': TilgjengeligStønadskontoForDekningsgrad;
}
