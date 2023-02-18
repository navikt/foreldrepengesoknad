import { Dekningsgrad } from 'app/types/Dekningsgrad';
import { getDekningsgradFromString } from './getDekningsgradFromString';

describe('getDekningsgradFromString', () => {
    it('skal finne dekningsgrad 100 enum gitt string', () => {
        const type = getDekningsgradFromString('100');
        expect(type).toBe(Dekningsgrad.HUNDRE_PROSENT);
    });

    it('skal finne dekningsgrad 80 enum gitt string', () => {
        const type = getDekningsgradFromString('80');
        expect(type).toBe(Dekningsgrad.ÅTTI_PROSENT);
    });

    it('skal finne dekningsgrad 100 når string er undefined', () => {
        const type = getDekningsgradFromString(undefined);
        expect(type).toBe(Dekningsgrad.HUNDRE_PROSENT);
    });
});
