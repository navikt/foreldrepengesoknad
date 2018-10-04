const aktivitetskravMorUtil = {
    skalBesvaresVedUtsettelse(søkerErFarEllerMedmor: boolean, annenForelderHarRettPåFP: boolean): boolean {
        return søkerErFarEllerMedmor === true && annenForelderHarRettPåFP === true;
    }
};

export default aktivitetskravMorUtil;
