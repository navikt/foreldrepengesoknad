import { erGyldigNorskOrgnummer, er9Tall, getOrganisasjonsnummerRegler } from '../organisasjonsnummer';
import * as getMessage from 'common/util/i18nUtils';
import { IntlShape } from 'react-intl';
import { runValidators } from 'common/lib/validation/utils/runValidFormValidation';

const intl = {} as IntlShape;

(getMessage.default as any) = jest.fn(() => '');

const gyldigOrgNr = '979312059';
const ugyldigOrgNrMod11 = '979312058';
const ugyldigOrgNrMod11b = '123123123';

describe('valider organisasjonsnummer', () => {
    describe('støttefunksjoner', () => {
        it('er9tall', () => {
            expect(er9Tall('q34')).toBeFalsy();
            expect(er9Tall('12345678a')).toBeFalsy();
            expect(er9Tall('123345455a')).toBeFalsy();
            expect(er9Tall(gyldigOrgNr)).toBeTruthy();
        });
        it('erGyldigNorskOrgnummer', () => {
            expect(erGyldigNorskOrgnummer('q34')).toBeFalsy();
            expect(erGyldigNorskOrgnummer('12345678a')).toBeFalsy();
            expect(erGyldigNorskOrgnummer('123345455a')).toBeFalsy();
            expect(erGyldigNorskOrgnummer(gyldigOrgNr)).toBeTruthy();
            expect(erGyldigNorskOrgnummer(ugyldigOrgNrMod11)).toBeFalsy();
            expect(erGyldigNorskOrgnummer(ugyldigOrgNrMod11b)).toBeFalsy();
            expect(erGyldigNorskOrgnummer('')).toBeFalsy();
        });
    });
    describe('regler for orgnummer', () => {
        it('godtar utenlandsk orgnr som har verdi', () => {
            const regler = getOrganisasjonsnummerRegler(gyldigOrgNr, false, intl);
            expect(runValidators(regler, 'orgnr').valid).toBeTruthy();
        });
        it('godtar IKKE utenlandsk orgnr som uten verdi', () => {
            const regler = getOrganisasjonsnummerRegler('', false, intl);
            expect(runValidators(regler, 'orgnr').valid).toBeFalsy();
        });
        it('validerer norske orgnumre', () => {
            expect(runValidators(getOrganisasjonsnummerRegler('', true, intl), 'orgnr').valid).toBeFalsy();
            expect(runValidators(getOrganisasjonsnummerRegler(gyldigOrgNr, true, intl), 'orgnr').valid).toBeTruthy();
            expect(
                runValidators(getOrganisasjonsnummerRegler(ugyldigOrgNrMod11, true, intl), 'orgnr').valid
            ).toBeFalsy();
        });
    });
});
