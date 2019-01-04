import { SøkerRolle } from '../../types/søknad/Søknad';
import AnnenForelder from '../../types/søknad/AnnenForelder';

export const getMorHarRettPåForeldrepenger = (
    rolle: SøkerRolle,
    søkerErFarEllerMedmor: boolean,
    annenForelder: Partial<AnnenForelder>
) => {
    return (
        rolle === SøkerRolle.MOR ||
        (søkerErFarEllerMedmor === true &&
            annenForelder !== undefined &&
            annenForelder.harRettPåForeldrepenger === true)
    );
};
