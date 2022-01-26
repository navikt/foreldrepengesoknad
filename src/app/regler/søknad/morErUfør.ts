import AnnenForelder from '../../types/søknad/AnnenForelder';

export const getMorErUfør = (søkerErFarEllerMedmor: boolean, annenForelder: Partial<AnnenForelder>): boolean => {
    return søkerErFarEllerMedmor === true && annenForelder.harMorUføretrygd  === true;
};
