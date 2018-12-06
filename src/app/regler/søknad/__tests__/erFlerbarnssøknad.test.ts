import { getErFlerbarnssøknad } from '../erFlerbarnssøknad';

describe('erFlerbarnssøknad', () => {
    it('returns false when antall barn is 0', () => {
        expect(getErFlerbarnssøknad(0)).toBeFalsy();
    });
    it('returns false when antall barn is 1', () => {
        expect(getErFlerbarnssøknad(1)).toBeFalsy();
    });
    it('returns true when antall barn is above 1', () => {
        expect(getErFlerbarnssøknad(2)).toBeTruthy();
        expect(getErFlerbarnssøknad(3)).toBeTruthy();
        expect(getErFlerbarnssøknad(10)).toBeTruthy();
    });
});
