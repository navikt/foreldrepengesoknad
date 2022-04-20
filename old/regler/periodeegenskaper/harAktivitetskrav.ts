import { StønadskontoType } from '../../types/uttaksplan/periodetyper';

export const harAktivitetskrav = (konto: StønadskontoType): boolean => {
    const validPeriodeTypes: StønadskontoType[] = [
        StønadskontoType.Fellesperiode,
        StønadskontoType.Foreldrepenger,
        StønadskontoType.AktivitetsfriKvote,
    ];
    if (validPeriodeTypes.includes(konto)) {
        return true;
    }
    return false;
};
