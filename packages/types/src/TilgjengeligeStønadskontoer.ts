import { KontoTilleggType, MinsterettType, StønadskontoType } from '@navikt/fp-constants';

export type TilgjengeligeMinsterettskontoer = {
    [MinsterettType.farRundtFødsel]: number;
    [MinsterettType.toTette]: number;
};

export type TilgjengeligeKontoTillegg = {
    [KontoTilleggType.prematur]: number;
    [KontoTilleggType.flerbarn]: number;
};

export type Stønadskonto = {
    konto: StønadskontoType;
    dager: number;
};

export type TilgjengeligeStønadskontoerForDekningsgrad = {
    kontoer: Stønadskonto[];
    minsteretter: TilgjengeligeMinsterettskontoer;
    tillegg?: TilgjengeligeKontoTillegg;
};

export type TilgjengeligeStønadskontoer = {
    '80': TilgjengeligeStønadskontoerForDekningsgrad;
    '100': TilgjengeligeStønadskontoerForDekningsgrad;
};
