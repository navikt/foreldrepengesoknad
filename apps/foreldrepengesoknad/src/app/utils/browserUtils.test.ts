import { shouldChangeBrowser } from './browserUtils';

describe('browserUtils', () => {
    it('skal returnere false når browser ikke er internet explorer', () => {
        const skalBytteBrowser = shouldChangeBrowser();
        expect(skalBytteBrowser).toBe(false);
    });
});
