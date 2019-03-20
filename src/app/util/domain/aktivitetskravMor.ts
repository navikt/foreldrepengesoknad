const aktivitetskravMorUtil = {
    skalBesvaresVedUtsettelse(
        søkerErFarEllerMedmor: boolean,
        annenForelderHarRettPåForeldrepenger: boolean,
        annenForelderErUfør: boolean
    ): boolean {
        return !søkerErFarEllerMedmor ||
            (annenForelderHarRettPåForeldrepenger === false && annenForelderErUfør === true)
            ? false
            : annenForelderHarRettPåForeldrepenger === false;
    }
};

export default aktivitetskravMorUtil;
