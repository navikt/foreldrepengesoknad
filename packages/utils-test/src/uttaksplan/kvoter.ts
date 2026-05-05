import { KontoDto } from '@navikt/fp-types';

export const MINSTERETTER = {
    farRundtFødsel: 10,
    toTette: 0,
};

export const DELT_UTTAK_80: KontoDto[] = [
    { konto: 'MØDREKVOTE', dager: 95 },
    { konto: 'FEDREKVOTE', dager: 95 },
    { konto: 'FELLESPERIODE', dager: 101 },
    { konto: 'FORELDREPENGER_FØR_FØDSEL', dager: 15 },
];

export const DELT_UTTAK_100: KontoDto[] = [
    { konto: 'MØDREKVOTE', dager: 75 },
    { konto: 'FEDREKVOTE', dager: 75 },
    { konto: 'FELLESPERIODE', dager: 80 },
    { konto: 'FORELDREPENGER_FØR_FØDSEL', dager: 15 },
];

export const DELT_UTTAK_80_TO_BARN: KontoDto[] = [
    { konto: 'MØDREKVOTE', dager: 95 },
    { konto: 'FEDREKVOTE', dager: 95 },
    { konto: 'FELLESPERIODE', dager: 207 },
    { konto: 'FORELDREPENGER_FØR_FØDSEL', dager: 15 },
];

export const DELT_UTTAK_100_TO_BARN: KontoDto[] = [
    { konto: 'MØDREKVOTE', dager: 75 },
    { konto: 'FEDREKVOTE', dager: 75 },
    { konto: 'FELLESPERIODE', dager: 165 },
    { konto: 'FORELDREPENGER_FØR_FØDSEL', dager: 15 },
];

export const DELT_UTTAK_80_ADOPSJON: KontoDto[] = [
    { konto: 'MØDREKVOTE', dager: 95 },
    { konto: 'FEDREKVOTE', dager: 95 },
    { konto: 'FELLESPERIODE', dager: 101 },
];

export const DELT_UTTAK_100_ADOPSJON: KontoDto[] = [
    { konto: 'MØDREKVOTE', dager: 75 },
    { konto: 'FEDREKVOTE', dager: 75 },
    { konto: 'FELLESPERIODE', dager: 80 },
];

export const ALENE_OM_OMSORG_80_FARMEDMOR: KontoDto[] = [{ konto: 'FORELDREPENGER', dager: 291 }];
export const ALENE_OM_OMSORG_100_FARMEDMOR: KontoDto[] = [{ konto: 'FORELDREPENGER', dager: 230 }];

export const ALENE_OM_OMSORG_80_MOR: KontoDto[] = [{ konto: 'FORELDREPENGER', dager: 291 }];
export const ALENE_OM_OMSORG_100_MOR: KontoDto[] = [{ konto: 'FORELDREPENGER', dager: 230 }];

export const IKKE_DELT_UTTAK_80_FARMEDMOR: KontoDto[] = [
    { konto: 'AKTIVITETSFRI_KVOTE', dager: 50 },
    { konto: 'FORELDREPENGER', dager: 211 },
];
export const IKKE_DELT_UTTAK_100_FARMEDMOR: KontoDto[] = [
    { konto: 'AKTIVITETSFRI_KVOTE', dager: 50 },
    { konto: 'FORELDREPENGER', dager: 150 },
];

export const IKKE_DELT_UTTAK_80_FARMEDMOR_MOR_UFØR: KontoDto[] = [
    { konto: 'AKTIVITETSFRI_KVOTE', dager: 95 },
    { konto: 'FORELDREPENGER', dager: 166 },
];
export const IKKE_DELT_UTTAK_100_FARMEDMOR_MOR_UFØR: KontoDto[] = [
    { konto: 'AKTIVITETSFRI_KVOTE', dager: 75 },
    { konto: 'FORELDREPENGER', dager: 125 },
];

export const IKKE_DELT_UTTAK_80_FAR_OG_FAR: KontoDto[] = [{ konto: 'FORELDREPENGER', dager: 261 }];
export const IKKE_DELT_UTTAK_100_FAR_OG_FAR: KontoDto[] = [{ konto: 'FORELDREPENGER', dager: 200 }];

export const IKKE_DELT_UTTAK_80_ADOPSJON_MOR: KontoDto[] = [{ konto: 'FORELDREPENGER', dager: 291 }];
export const IKKE_DELT_UTTAK_100_ADOPSJON_MOR: KontoDto[] = [{ konto: 'FORELDREPENGER', dager: 230 }];

export const IKKE_DELT_UTTAK_80_FAR_OG_FAR_ADOPSJON: KontoDto[] = [{ konto: 'AKTIVITETSFRI_KVOTE', dager: 261 }];
export const IKKE_DELT_UTTAK_100_FAR_OG_FAR_ADOPSJON: KontoDto[] = [{ konto: 'AKTIVITETSFRI_KVOTE', dager: 200 }];

export const IKKE_DELT_UTTAK_80_FAR_OG_FAR_FØDSEL: KontoDto[] = [{ konto: 'AKTIVITETSFRI_KVOTE', dager: 291 }];
export const IKKE_DELT_UTTAK_100_FAR_OG_FAR_FØDSEL: KontoDto[] = [{ konto: 'AKTIVITETSFRI_KVOTE', dager: 230 }];

export const IKKE_DELT_UTTAK_80_MOR: KontoDto[] = [
    { konto: 'FORELDREPENGER', dager: 291 },
    { konto: 'FORELDREPENGER_FØR_FØDSEL', dager: 15 },
];
export const IKKE_DELT_UTTAK_100_MOR: KontoDto[] = [
    { konto: 'FORELDREPENGER', dager: 230 },
    { konto: 'FORELDREPENGER_FØR_FØDSEL', dager: 15 },
];

export const IKKE_DELT_UTTAK_TO_BARN_80: KontoDto[] = [
    { konto: 'FORELDREPENGER', dager: 397 },
    { konto: 'FORELDREPENGER_FØR_FØDSEL', dager: 15 },
];
export const IKKE_DELT_UTTAK_TO_BARN_100: KontoDto[] = [
    { konto: 'FORELDREPENGER', dager: 315 },
    { konto: 'FORELDREPENGER_FØR_FØDSEL', dager: 15 },
];

export const IKKE_DELT_UTTAK_TO_BARN_80_FARMEDMOR: KontoDto[] = [{ konto: 'FORELDREPENGER', dager: 397 }];
export const IKKE_DELT_UTTAK_TO_BARN_100_FARMEDMOR: KontoDto[] = [{ konto: 'FORELDREPENGER', dager: 315 }];
