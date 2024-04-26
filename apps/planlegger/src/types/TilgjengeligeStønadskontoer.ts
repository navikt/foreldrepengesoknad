export enum StønadskontoType {
    Mødrekvote = 'MØDREKVOTE',
    Fedrekvote = 'FEDREKVOTE',
    Fellesperiode = 'FELLESPERIODE',
    Foreldrepenger = 'FORELDREPENGER',
    ForeldrepengerFørFødsel = 'FORELDREPENGER_FØR_FØDSEL',
    AktivitetsfriKvote = 'AKTIVITETSFRI_KVOTE',
}

export enum MinsterettType {
    farRundtFødsel = 'farRundtFødsel',
    toTette = 'toTette',
}

export type TilgjengeligeMinsterettskontoer = {
    [MinsterettType.farRundtFødsel]: number;
    [MinsterettType.toTette]: number;
};

export type TilgjengeligeStønadskontoerForDekningsgrad = {
    kontoer: Partial<Record<StønadskontoType, number>>;
    minsteretter: TilgjengeligeMinsterettskontoer;
};

export type TilgjengeligeStønadskontoer = {
    '80': TilgjengeligeStønadskontoerForDekningsgrad;
    '100': TilgjengeligeStønadskontoerForDekningsgrad;
};
