import AnnenForelder from '../../types/søknad/AnnenForelder';

const aktivitetskravMorUtil = {
    skalBesvaresVedUtsettelse(søkerErFarEllerMedmor: boolean, annenForelder: AnnenForelder): boolean {
        return !søkerErFarEllerMedmor ||
            (annenForelder.harRettPåForeldrepenger === false && annenForelder.erUfør === true)
            ? false
            : annenForelder.harRettPåForeldrepenger === false;
    }
};

export default aktivitetskravMorUtil;
