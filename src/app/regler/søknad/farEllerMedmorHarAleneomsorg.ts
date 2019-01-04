import AnnenForelder from '../../types/søknad/AnnenForelder';

export const getFarEllerMedmorHarAleneomsorg = (
    søkerErFarEllerMedmor: boolean,
    søkerErAleneOmOmsorg: boolean,
    annenForelder: Partial<AnnenForelder>
): boolean => {
    return søkerErFarEllerMedmor && (søkerErAleneOmOmsorg || annenForelder.kanIkkeOppgis === true);
};
