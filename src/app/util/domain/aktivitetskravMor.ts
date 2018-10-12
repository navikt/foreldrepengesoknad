const aktivitetskravMorUtil = {
    skalBesvaresVedUtsettelse(søkerErFarEllerMedmor: boolean, annenForelderHarRettPåFP: boolean): boolean {
        return søkerErFarEllerMedmor === true && annenForelderHarRettPåFP === false;
    }
};

export default aktivitetskravMorUtil;
