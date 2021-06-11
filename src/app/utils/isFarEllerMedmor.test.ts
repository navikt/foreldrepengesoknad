import isFarEllerMedmor from './isFarEllerMedmor';

describe('<isFarEllerMedmor>', () => {
    it('skal returnere true når rolle er far', () => {
        expect(isFarEllerMedmor('far')).toBe(true);
    });

    it('skal returnere true når rolle er medmor', () => {
        expect(isFarEllerMedmor('medmor')).toBe(true);
    });

    it('skal returnere false når rolle er mor', () => {
        expect(isFarEllerMedmor('mor')).toBe(false);
    });
});
