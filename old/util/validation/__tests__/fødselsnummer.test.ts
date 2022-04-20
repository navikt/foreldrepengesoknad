import * as getMessage from 'common/util/i18nUtils';
import { isSixteenOrOlder } from '../fødselsnummer';
import moment from 'moment';

describe('Fødselsnummer validation', () => {
    beforeEach(() => {
        (getMessage.default as any) = jest.fn();
    });

    describe('helper functions', () => {
        describe('erOverSeksten function', () => {
            it('should not parse year to a future date if birth year 1966 or before', () => {
                expect(isSixteenOrOlder('010166', 'F')).toBeTruthy();
                expect(isSixteenOrOlder('010167', 'F')).toBeTruthy();
            });

            it('returns true if input fnr proves that person is sixteen', () => {
                const fnr: string = moment().utc().subtract(16, 'year').format('DDMMYY').toString();

                expect(isSixteenOrOlder(fnr, 'F')).toBeTruthy();
            });

            it('returns true if input fnr proves that person is older than sixteen', () => {
                const fnr: string = moment().utc().subtract(16, 'year').subtract(1, 'day').format('DDMMYY').toString();

                expect(isSixteenOrOlder(fnr, 'F')).toBeTruthy();
            });

            it('returns false if input fnr proves that person is under sixteen', () => {
                const fnr: string = moment().utc().subtract(16, 'year').add(1, 'day').format('DDMMYY').toString();

                expect(isSixteenOrOlder(fnr, 'F')).toBeFalsy();
            });

            it('should throw exception if input is invalid', () => {
                expect(isSixteenOrOlder('qwerty', false)).toBeFalsy();
                expect(isSixteenOrOlder('', false)).toBeFalsy();
                expect(isSixteenOrOlder('351399', false)).toBeFalsy();
            });

            it('should return true if d-nummer proves person is older than sixteen', () => {
                expect(isSixteenOrOlder('61087241717', 'D')).toBeTruthy();
            });

            it('should return false if d-nummer proved person is younger than sixteen', () => {
                expect(isSixteenOrOlder('63101889159', 'D')).toBeFalsy();
            });
        });
    });
});
