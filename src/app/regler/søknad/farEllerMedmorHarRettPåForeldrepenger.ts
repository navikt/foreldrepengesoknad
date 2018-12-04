import { SøkerRolle } from '../../types/søknad/Søknad';

export const getFarEllerMedmorHarRettPåForeldrepenger = (
    søkerrolle: SøkerRolle,
    søkerErFarEllerMedmor: boolean,
    annenForelderHarRettPåForeldrepenger: boolean
): boolean => {
    return søkerErFarEllerMedmor || (søkerrolle === SøkerRolle.MOR && annenForelderHarRettPåForeldrepenger === true);
};
