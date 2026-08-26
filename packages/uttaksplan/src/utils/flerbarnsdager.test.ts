import { skalBesvareFlerbarnsdager } from './flerbarnsdager';

describe('skalBesvareFlerbarnsdager', () => {
    it('skal returnere false hvis det ikke er flerbarnsfødsel', () => {
        expect(skalBesvareFlerbarnsdager(1, 'FAR_MEDMOR', 'FELLESPERIODE', undefined)).toBe(false);
    });

    it('skal returnere false for mor når hun ikke har samtidig uttak', () => {
        expect(skalBesvareFlerbarnsdager(2, 'MOR', 'FELLESPERIODE', undefined)).toBe(false);
    });

    it('skal returnere true for mor når hun har valgt samtidig uttak', () => {
        expect(skalBesvareFlerbarnsdager(2, 'MOR', 'FELLESPERIODE', 50)).toBe(true);
    });

    it('skal returnere true for mor med samtidig uttak selv om kontotype er mødrekvote', () => {
        expect(skalBesvareFlerbarnsdager(2, 'MOR', 'MØDREKVOTE', 50)).toBe(true);
    });

    it('skal returnere false for mor med samtidig uttak hvis kontotype er aktivitetsfri kvote', () => {
        expect(skalBesvareFlerbarnsdager(2, 'MOR', 'AKTIVITETSFRI_KVOTE', 50)).toBe(false);
    });

    it('skal returnere true for far/medmor ved flerbarnsfødsel uavhengig av samtidig uttak', () => {
        expect(skalBesvareFlerbarnsdager(2, 'FAR_MEDMOR', 'FELLESPERIODE', undefined)).toBe(true);
    });

    it('skal returnere false for far/medmor med mødrekvote', () => {
        expect(skalBesvareFlerbarnsdager(2, 'FAR_MEDMOR', 'MØDREKVOTE', undefined)).toBe(false);
    });

    it('skal returnere false for far/medmor med aktivitetsfri kvote', () => {
        expect(skalBesvareFlerbarnsdager(2, 'FAR_MEDMOR', 'AKTIVITETSFRI_KVOTE', undefined)).toBe(false);
    });
});
