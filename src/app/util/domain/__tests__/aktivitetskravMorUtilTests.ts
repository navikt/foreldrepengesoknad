import aktivitetskravMorUtil from '../aktivitetskravMor';

describe('Aktivitetskrav ved utsettelse', () => {
    it('should be required if søkerErFarEllerMedmor and !annenForelderHarRettPåFP && !ufør', () => {
        const aktivitetskravIsRequired = aktivitetskravMorUtil.skalBesvaresVedUtsettelse(true, false, false);
        expect(aktivitetskravIsRequired).toBe(true);
    });

    it('should not be required if !søkerErFarEllerMedmor && erUfør', () => {
        const aktivitetskravIsRequired = aktivitetskravMorUtil.skalBesvaresVedUtsettelse(false, false, true);
        expect(aktivitetskravIsRequired).toBe(false);
    });

    it('should not be required if annenForelderHarRettPåFP', () => {
        const aktivitetskravIsRequired = aktivitetskravMorUtil.skalBesvaresVedUtsettelse(true, true, true);
        expect(aktivitetskravIsRequired).toBe(false);
    });
});
