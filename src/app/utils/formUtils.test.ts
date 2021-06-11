import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { convertBooleanOrUndefinedToYesOrNo, convertYesOrNoOrUndefinedToBoolean } from './formUtils';

describe('<formUtils>', () => {
    it('skal konvertere boolsk true verdi til enum YES', () => {
        const verdi = convertBooleanOrUndefinedToYesOrNo(true);
        expect(verdi).toBe(YesOrNo.YES);
    });

    it('skal konvertere boolsk false verdi til enum NO', () => {
        const verdi = convertBooleanOrUndefinedToYesOrNo(false);
        expect(verdi).toBe(YesOrNo.NO);
    });

    it('skal konvertere tom verdi til enum UNANSWERED', () => {
        const verdi = convertBooleanOrUndefinedToYesOrNo(undefined);
        expect(verdi).toBe(YesOrNo.UNANSWERED);
    });

    it('skal konvertere enum YES til boolsk true', () => {
        const verdi = convertYesOrNoOrUndefinedToBoolean(YesOrNo.YES);
        expect(verdi).toBe(true);
    });

    it('skal konvertere enum NO til boolsk false', () => {
        const verdi = convertYesOrNoOrUndefinedToBoolean(YesOrNo.NO);
        expect(verdi).toBe(false);
    });

    it('skal konvertere enum UNANSWERED til tom verdi', () => {
        const verdi = convertYesOrNoOrUndefinedToBoolean(YesOrNo.UNANSWERED);
        expect(verdi).toBeUndefined;
    });
});
