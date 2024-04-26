import { TilgjengeligeStønadskontoerForDekningsgrad } from 'types/TilgjengeligeStønadskontoer';

export const getAntallUker = (stønadskontoer: TilgjengeligeStønadskontoerForDekningsgrad): number => {
    return Object.values(stønadskontoer.kontoer).reduce((sum: number, dager) => sum + dager / 5, 0);
};

export const getAntallUkerForeldrepengerFørFødsel = (
    stønadskontoer: TilgjengeligeStønadskontoerForDekningsgrad,
): number => {
    return stønadskontoer.kontoer.FORELDREPENGER_FØR_FØDSEL ? stønadskontoer.kontoer.FORELDREPENGER_FØR_FØDSEL / 5 : 0;
};

export const getAntallUkerMødrekvote = (stønadskontoer: TilgjengeligeStønadskontoerForDekningsgrad): number => {
    return stønadskontoer.kontoer.MØDREKVOTE ? stønadskontoer.kontoer.MØDREKVOTE / 5 : 0;
};

export const getAntallUkerFedrekvote = (stønadskontoer: TilgjengeligeStønadskontoerForDekningsgrad): number => {
    return stønadskontoer.kontoer.FEDREKVOTE ? stønadskontoer.kontoer.FEDREKVOTE / 5 : 0;
};

export const getAntallUkerFellesperiode = (stønadskontoer: TilgjengeligeStønadskontoerForDekningsgrad): number => {
    return stønadskontoer.kontoer.FELLESPERIODE ? stønadskontoer.kontoer.FELLESPERIODE / 5 : 0;
};

export const getAntallUkerForeldrepenger = (stønadskontoer: TilgjengeligeStønadskontoerForDekningsgrad): number => {
    return stønadskontoer.kontoer.FORELDREPENGER ? stønadskontoer.kontoer.FORELDREPENGER / 5 : 0;
};

export const getAntallUkerAktivitetsfriKvote = (stønadskontoer: TilgjengeligeStønadskontoerForDekningsgrad): number => {
    return stønadskontoer.kontoer.AKTIVITETSFRI_KVOTE ? stønadskontoer.kontoer.AKTIVITETSFRI_KVOTE / 5 : 0;
};
