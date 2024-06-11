import { startdatoPermisjonMor } from './uttaksplanDatoavgrensninger';

describe('uttaksplanDatoavgrensninger - startdatoPermisjonMor', () => {
    it('mor med ufødt barn og termin på en ukedag skal kunne starte foreldrepenger tidligst 12 uker før termin og senest på termindato', () => {
        const res = startdatoPermisjonMor(undefined, new Date('2024-08-01'));
        expect(res.minDate).toEqual('2024-05-09');
        expect(res.maxDate).toEqual('2024-08-01');
    });
    it('mor med ufødt barn og termin på en helg skal kunne starte foreldrepenger tidligst 12 uker før første uttaksdag etter termin og senest på første uttaksdag etter termindato', () => {
        const res = startdatoPermisjonMor(undefined, new Date('2024-08-04'));
        expect(res.minDate).toEqual('2024-05-13');
        expect(res.maxDate).toEqual('2024-08-05');
    });
    it('mor med barn født mer enn 12 uker før termin og på en ukedag skal kun kunne starte foreldrepenger på fødselsdato', () => {
        const res = startdatoPermisjonMor(new Date('2024-05-01'), new Date('2024-08-01'));
        expect(res.minDate).toEqual('2024-05-01');
        expect(res.maxDate).toEqual('2024-05-01');
    });
    it('mor med barn født mer enn 12 uker før termin og på en helgedag skal kun kunne starte foreldrepenger på første uttaksdag etter fødselsdato', () => {
        const res = startdatoPermisjonMor(new Date('2024-05-04'), new Date('2024-08-01'));
        expect(res.minDate).toEqual('2024-05-06');
        expect(res.maxDate).toEqual('2024-05-06');
    });
    it('mor med barn født mindre enn 12 uker før termin og på en ukedag skal kunne starte foreldrepenger tidligst 12 uker før termin og senest på fødseldato', () => {
        const res = startdatoPermisjonMor(new Date('2024-06-07'), new Date('2024-08-01'));
        expect(res.minDate).toEqual('2024-05-09');
        expect(res.maxDate).toEqual('2024-06-07');
    });
    it('mor med barn født mindre enn 12 uker før termin og på en helgedag skal kunne starte foreldrepenger tidligst 12 uker før termin og senest første uttaksdag etter fødselsdato', () => {
        const res = startdatoPermisjonMor(new Date('2024-06-01'), new Date('2024-08-01'));
        expect(res.minDate).toEqual('2024-05-09');
        expect(res.maxDate).toEqual('2024-06-03');
    });
    it('mor med barn født etter termin og på en ukedag skal kunne starte foreldrepenger tidligst 12 uker før termin og senest på fødseldato', () => {
        const res = startdatoPermisjonMor(new Date('2024-06-07'), new Date('2024-05-31'));
        expect(res.minDate).toEqual('2024-03-08');
        expect(res.maxDate).toEqual('2024-06-07');
    });
    it('mor med barn født etter termin og på en helgedag skal kunne starte foreldrepenger tidligst 12 uker før termin og senest på første uttaksdag etter fødselsdato', () => {
        const res = startdatoPermisjonMor(new Date('2024-06-01'), new Date('2024-05-31'));
        expect(res.minDate).toEqual('2024-03-08');
        expect(res.maxDate).toEqual('2024-06-03');
    });
    it('mor med barn født etter termin og med termindato på en helgedag skal kunne starte foreldrepenger tidligst 12 uker før første uttaksdag etter termin og senest på fødselsdato', () => {
        const res = startdatoPermisjonMor(new Date('2024-06-07'), new Date('2024-06-01'));
        expect(res.minDate).toEqual('2024-03-11');
        expect(res.maxDate).toEqual('2024-06-07');
    });
    it('mor med barn født og med ukjent termin skal kunne starte foreldrepenger tidligst 12 uker før fødsel og senest på fødselsdato', () => {
        const res = startdatoPermisjonMor(new Date('2024-06-11'), undefined);
        expect(res.minDate).toEqual('2024-03-19');
        expect(res.maxDate).toEqual('2024-06-11');
    });
});
