import aktivitetskravMorUtil from '../aktivitetskravMor';
import { OmAnnenForelder } from 'app/selectors/types';

describe('Aktivitetskrav ved utsettelse', () => {
    it('should be required if søkerErFarEllerMedmor and !annenForelderHarRettPåFP && !ufør', () => {
        const omAnnenForelder: Partial<OmAnnenForelder> = { harRett: false, erUfør: false };
        const aktivitetskravIsRequired = aktivitetskravMorUtil.skalBesvaresVedUtsettelse(
            true,
            omAnnenForelder as OmAnnenForelder
        );
        expect(aktivitetskravIsRequired).toBe(true);
    });

    it('should not be required if !søkerErFarEllerMedmor && erUfør', () => {
        const omAnnenForelder: Partial<OmAnnenForelder> = { harRett: false, erUfør: true };
        const aktivitetskravIsRequired = aktivitetskravMorUtil.skalBesvaresVedUtsettelse(
            false,
            omAnnenForelder as OmAnnenForelder
        );
        expect(aktivitetskravIsRequired).toBe(false);
    });

    it('should not be required if annenForelderHarRettPåFP', () => {
        const omAnnenForelder: Partial<OmAnnenForelder> = { harRett: true, erUfør: true };
        const aktivitetskravIsRequired = aktivitetskravMorUtil.skalBesvaresVedUtsettelse(
            true,
            omAnnenForelder as OmAnnenForelder
        );
        expect(aktivitetskravIsRequired).toBe(false);
    });
});
