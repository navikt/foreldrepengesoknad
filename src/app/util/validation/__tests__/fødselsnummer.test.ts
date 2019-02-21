import { InjectedIntl } from 'react-intl';
import * as getMessage from 'common/util/i18nUtils';
import { isSixteenOrOlder, getFødselsnummerRegler } from '../fødselsnummer';
import moment from 'moment';

const intl: Partial<InjectedIntl> = {};

const callFødselsnummerValidator = (
    fødselsnummer: string,
    utenlandskFødselsnummer: boolean,
    søkersFødselsnummer: string
) =>
    getFødselsnummerRegler(fødselsnummer, utenlandskFødselsnummer, søkersFødselsnummer, intl as InjectedIntl)[1].test();

const callMatchingApplicantsFødselsnummerValidator = (
    fødselsnummer: string,
    utenlandskFødselsnummer: boolean,
    søkersFødselsnummer: string
) =>
    getFødselsnummerRegler(fødselsnummer, utenlandskFødselsnummer, søkersFødselsnummer, intl as InjectedIntl)[2].test();

describe('Fødselsnummer validation', () => {
    const SØKER_FNR = '21079951436';
    const VALID_NORWEGIAN_FNR = '12061124339';
    const INVALID_NORWEGIAN_FNR = '01129955131';

    beforeEach(() => {
        (getMessage.default as any) = jest.fn();
    });

    it('shuold return true for a valid norwegian fødselsnummer', () => {
        expect(callFødselsnummerValidator(VALID_NORWEGIAN_FNR, false, SØKER_FNR)).toEqual(true);
    });

    it('shuold return false for an invalid norwegian fødselsnummer', () => {
        expect(callFødselsnummerValidator(INVALID_NORWEGIAN_FNR, false, SØKER_FNR)).toEqual(false);
    });

    it('should return false if norwegian fødselsnummer is not 11 digits', () => {
        expect(callFødselsnummerValidator('123451234511', false, SØKER_FNR)).toEqual(false);
        expect(callFødselsnummerValidator('1234512345', false, SØKER_FNR)).toEqual(false);
    });

    it('should return false if fødselsnummer is an empty string', () => {
        expect(callFødselsnummerValidator('', false, SØKER_FNR)).toEqual(false);
    });

    it('should return false for fødselsnummer matching applicants fødselsnummer', () => {
        expect(callMatchingApplicantsFødselsnummerValidator(VALID_NORWEGIAN_FNR, false, VALID_NORWEGIAN_FNR)).toEqual(
            false
        );
    });

    describe('helper functions', () => {
        describe('erOverSeksten function', () => {
            it('should not parse year to a future date if birth year 1966 or before', () => {
                expect(isSixteenOrOlder('010166')).toBeTruthy();
                expect(isSixteenOrOlder('010167')).toBeTruthy();
            });

            it('returns true if input fnr proves that person is sixteen', () => {
                const fnr: string = moment()
                    .utc()
                    .subtract(16, 'year')
                    .format('DDMMYY')
                    .toString();

                expect(isSixteenOrOlder(fnr)).toBeTruthy();
            });

            it('returns true if input fnr proves that person is older than sixteen', () => {
                const fnr: string = moment()
                    .utc()
                    .subtract(16, 'year')
                    .subtract(1, 'day')
                    .format('DDMMYY')
                    .toString();

                expect(isSixteenOrOlder(fnr)).toBeTruthy();
            });

            it('returns false if input fnr proves that person is under sixteen', () => {
                const fnr: string = moment()
                    .utc()
                    .subtract(16, 'year')
                    .add(1, 'day')
                    .format('DDMMYY')
                    .toString();

                expect(isSixteenOrOlder(fnr)).toBeFalsy();
            });

            it('should throw exception if input is invalid', () => {
                expect(isSixteenOrOlder('qwerty')).toBeFalsy();
                expect(isSixteenOrOlder('')).toBeFalsy();
                expect(isSixteenOrOlder('351399')).toBeFalsy();
            });
        });
    });
});
