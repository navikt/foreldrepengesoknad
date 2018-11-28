import AnnenForelder from '../../types/søknad/AnnenForelder';

export const getMorHarAleneomsorg = (
    søkerErMor: boolean,
    søkerErAleneOmOmsorg: boolean,
    annenForelder: Partial<AnnenForelder>
) => {
    return søkerErMor && (søkerErAleneOmOmsorg || annenForelder.kanIkkeOppgis === true);
};
