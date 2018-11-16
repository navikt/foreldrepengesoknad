import aktivitetskravMorUtil from '../aktivitetskravMor';

describe('Aktivitetskrav ved utsettelse', () => {
    it('should be required if søkerErFarEllerMedmor and !annenForelderHarRettPåFP', () => {
        const aktivitetskravIsRequired = aktivitetskravMorUtil.skalBesvaresVedUtsettelse(true, false);
        expect(aktivitetskravIsRequired).toBe(true);
    });

    it('should not be required if !søkerErFarEllerMedmor', () => {
        const aktivitetskravIsRequired = aktivitetskravMorUtil.skalBesvaresVedUtsettelse(false, false);
        expect(aktivitetskravIsRequired).toBe(false);
    });

    it('should not be required if annenForelderHarRettPåFP', () => {
        const aktivitetskravIsRequired = aktivitetskravMorUtil.skalBesvaresVedUtsettelse(true, true);
        expect(aktivitetskravIsRequired).toBe(false);
    });
});
