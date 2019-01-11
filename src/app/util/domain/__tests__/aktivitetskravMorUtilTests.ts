/* tslint:disable:no-object-literal-type-assertion */

import aktivitetskravMorUtil from '../aktivitetskravMor';
import AnnenForelder from '../../../types/søknad/AnnenForelder';

describe('Aktivitetskrav ved utsettelse', () => {
    it('should be required if søkerErFarEllerMedmor and !annenForelderHarRettPåFP && !ufør', () => {
        const aktivitetskravIsRequired = aktivitetskravMorUtil.skalBesvaresVedUtsettelse(true, {
            harRettPåForeldrepenger: false,
            erUfør: false
        } as AnnenForelder);
        expect(aktivitetskravIsRequired).toBe(true);
    });

    it('should not be required if !søkerErFarEllerMedmor && erUfør', () => {
        const aktivitetskravIsRequired = aktivitetskravMorUtil.skalBesvaresVedUtsettelse(false, {
            harRettPåForeldrepenger: false,
            erUfør: true
        } as AnnenForelder);
        expect(aktivitetskravIsRequired).toBe(false);
    });

    it('should not be required if annenForelderHarRettPåFP', () => {
        const aktivitetskravIsRequired = aktivitetskravMorUtil.skalBesvaresVedUtsettelse(true, {
            harRettPåForeldrepenger: true,
            erUfør: undefined
        } as any);
        expect(aktivitetskravIsRequired).toBe(false);
    });
});
