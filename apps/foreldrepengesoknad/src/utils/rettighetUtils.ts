import { RettighetType_fpoversikt } from '@navikt/fp-types';

export const utledRettighet = (erAleneOmOmsorg: boolean, erDeltUttak: boolean): RettighetType_fpoversikt => {
    if (erAleneOmOmsorg) {
        return 'ALENEOMSORG';
    }
    if (erDeltUttak) {
        return 'BEGGE_RETT';
    }
    return 'BARE_SØKER_RETT';
};
