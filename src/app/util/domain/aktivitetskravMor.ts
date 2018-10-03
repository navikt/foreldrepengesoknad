const aktivitetskravMorUtil = {
    skalBesvaresVedUtsettelse(søkerErFarEllerMedmor: boolean, annenForelderHarRettPåFP: boolean): boolean {
        return søkerErFarEllerMedmor && annenForelderHarRettPåFP;
    }
};

export default aktivitetskravMorUtil;
