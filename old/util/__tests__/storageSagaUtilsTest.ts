import StorageSagaUtils from '../storageSagaUtils';
import { RegistrertBarn } from '../../types/Person';

const barn1: Partial<RegistrertBarn> = {
    fnr: 'barn1',
};
const barn2: Partial<RegistrertBarn> = {
    fnr: 'barn2',
};
const barn3: Partial<RegistrertBarn> = {
    fnr: 'barn3',
};

const valgteBarn: RegistrertBarn[] = [barn1 as RegistrertBarn];
const registrerteBarn: RegistrertBarn[] = [barn2 as RegistrertBarn, barn1 as RegistrertBarn];
const registrerteBarnUtenValgtBarn: RegistrertBarn[] = [barn3 as RegistrertBarn];

describe('StorageSaga', () => {
    describe('stemmerValgteBarnISøknadMedSøkersBarn', () => {
        it('returns true if valgte barn === []', () => {
            expect(StorageSagaUtils.stemmerValgteBarnISøknadMedSøkersBarn([])).toBeTruthy();
        });
        it('returns false if registrerte barn is undefined or empty ', () => {
            expect(StorageSagaUtils.stemmerValgteBarnISøknadMedSøkersBarn(valgteBarn)).toBeFalsy();
        });
        it('returns true if valgte barn is found in registrerte barn ', () => {
            expect(StorageSagaUtils.stemmerValgteBarnISøknadMedSøkersBarn(valgteBarn, registrerteBarn)).toBeTruthy();
        });
        it('returns false if valgte barn is not found in registrerte barn ', () => {
            expect(StorageSagaUtils.stemmerValgteBarnISøknadMedSøkersBarn(valgteBarn, [])).toBeFalsy();
            expect(
                StorageSagaUtils.stemmerValgteBarnISøknadMedSøkersBarn(valgteBarn, registrerteBarnUtenValgtBarn)
            ).toBeFalsy();
        });
    });
});
