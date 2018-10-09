import { StønadskontoType } from '../../types/uttaksplan/periodetyper';

export const erUttakAvAnnenForeldersKvote = (
    konto: StønadskontoType | undefined,
    søkerErFarEllerMedmor: boolean
): boolean => {
    return (
        (konto === StønadskontoType.Mødrekvote && søkerErFarEllerMedmor) ||
        (konto === StønadskontoType.Fedrekvote && !søkerErFarEllerMedmor)
    );
};

export const getEgenKvote = (erSøkerFarEllerMedmor: boolean) => {
    return erSøkerFarEllerMedmor ? StønadskontoType.Fedrekvote : StønadskontoType.Mødrekvote;
};

export const erUttakEgenKvote = (konto: StønadskontoType | undefined, søkerErFarEllerMedmor: boolean): boolean => {
    return erUttakAvAnnenForeldersKvote(konto, søkerErFarEllerMedmor) === false;
};
