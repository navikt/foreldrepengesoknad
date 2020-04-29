import { getVarighetString } from 'common/util/intlUtils';
import { createIntl } from 'react-intl';
import nbMessagesCommon from '../../intl/nb_NO.json';

describe('intlUtils', () => {
    const intl = createIntl({ locale: 'nb', messages: nbMessagesCommon });

    describe('getVarighetString', () => {
        it('returns correctly when 0 days', () => {
            expect(getVarighetString(0, intl)).toBe('0 dager');
        });
        it('returns correctly when 1 day', () => {
            expect(getVarighetString(0, intl)).toBe('0 dager');
        });
        it('returns only days when less than 5 days', () => {
            expect(getVarighetString(4, intl)).toBe('4 dager');
        });
        it('returns èn uke when only when 5 days', () => {
            expect(getVarighetString(5, intl)).toBe('1 uke');
        });
        it('returns èn uke when only when 6 days', () => {
            expect(getVarighetString(6, intl)).toBe('1 uke og 1 dag');
        });
        it('returns èn uke when only when 7 days', () => {
            expect(getVarighetString(7, intl)).toBe('1 uke og 2 dager');
        });
        it('returns èn uke when only when 10 days', () => {
            expect(getVarighetString(10, intl)).toBe('2 uker');
        });
    });
});
