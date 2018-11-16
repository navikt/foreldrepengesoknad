import { InjectedIntl } from 'react-intl';
import * as getMessage from 'common/util/i18nUtils';
import { getFødselsnummerRegler } from '../fødselsnummer';

const intl = {} as InjectedIntl;

const callFødselsnummerValidator = (
    fødselsnummer: string,
    utenlandskFødselsnummer: boolean,
    søkersFødselsnummer: string
) => getFødselsnummerRegler(fødselsnummer, utenlandskFødselsnummer, søkersFødselsnummer, intl)[1].test();

const callMatchingApplicantsFødselsnummerValidator = (
    fødselsnummer: string,
    utenlandskFødselsnummer: boolean,
    søkersFødselsnummer: string
) => getFødselsnummerRegler(fødselsnummer, utenlandskFødselsnummer, søkersFødselsnummer, intl)[2].test();

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
});
