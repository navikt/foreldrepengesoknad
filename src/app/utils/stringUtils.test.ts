import { replaceInvisibleCharsWithSpace } from './stringUtils';

describe('stringUtils', () => {
    describe('replaceInvisibleCharsWithSpace', () => {
        it('erstatter left-to-right override med vanlig space', () => {
            const dirtyTextLeftToRight = 'Left-to-right\u202Doverride erstattes \u202D med space';
            const cleanTextLeftToRight = 'Left-to-right override erstattes   med space';
            expect(replaceInvisibleCharsWithSpace(dirtyTextLeftToRight)).toEqual(cleanTextLeftToRight);
        });
        it('erstatter tab tegn med vanlig space', () => {
            const dirtyTextTab = 'Tab\terstattes med space\talle steder.';
            const cleanTextTab = 'Tab erstattes med space alle steder.';
            expect(replaceInvisibleCharsWithSpace(dirtyTextTab)).toEqual(cleanTextTab);
        });
        it('erstatter blanke tegn med vanlig space', () => {
            const dirtyTextBlankeTegn = 'Blankt tegn\u00A0erstattes\u00A0med\u034fspace';
            const cleanTextBlankeTegn = 'Blankt tegn erstattes med space';
            expect(replaceInvisibleCharsWithSpace(dirtyTextBlankeTegn)).toEqual(cleanTextBlankeTegn);
        });
        it('erstatter flere usynlige tegn med vanlig space', () => {
            const dirtyText42BlankeTegn =
                '41 blanke tegn\u00a0\u00ad\u061c\u115f\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u200b\u200c\u200d\u200e\u200f\u202d\u202f\u205f\u2060\u2061\u2062\u2063\u2064\u206a\u206b\u206c\u206d\u206e\u206f\u3000\u2800\u3164\ufeff\uffa0\u1160erstattes med 41 space.';
            const cleanText42BlankeTegn =
                '41 blanke tegn                                         erstattes med 41 space.';
            expect(replaceInvisibleCharsWithSpace(dirtyText42BlankeTegn)).toEqual(cleanText42BlankeTegn);
        });
        it('returns empty string', () => {
            expect(replaceInvisibleCharsWithSpace('')).toEqual('');
        });
    });
});
