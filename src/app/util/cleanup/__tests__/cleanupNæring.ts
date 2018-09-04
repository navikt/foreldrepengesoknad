import cleanup from './../cleanupNæring';
import {
    Næring,
    NæringPartial,
    Næringsrelasjon,
    NæringsrelasjonPartial
} from '../../../types/søknad/SelvstendigNæringsdrivendeInformasjon';
import visibility from '../../../components/selvstendig-næringsdrivende-modal/visibility';

const revisorMock: NæringsrelasjonPartial = {};
const regnskapsførerMock: NæringsrelasjonPartial = {};

const næring: NæringPartial = {
    registrertILand: 'testland',
    nyIArbeidslivet: true,
    hattVarigEndringAvNæringsinntektSiste4Kalenderår: true,
    harRevisor: true,
    revisor: revisorMock as Næringsrelasjon,
    harRegnskapsfører: true,
    regnskapsfører: regnskapsførerMock as Næringsrelasjon,
    kanInnhenteOpplsyningerFraRevisor: true
};

describe('cleanupNæring', () => {
    describe('fields are visible', () => {
        beforeEach(() => {
            visibility.næringRegistrertILand = jest.fn(() => false);
            visibility.nyIArbeidslivet = jest.fn(() => false);
            visibility.varigEndringAvNæringsinntekt = jest.fn(() => false);
            visibility.revisorBolk = jest.fn(() => false);
            visibility.kanInnhenteOpplysningerFraRevisor = jest.fn(() => false);
        });

        it('should set næring properties to undefined', () => {
            const result = cleanup(næring as Næring);
            const {
                registrertILand,
                nyIArbeidslivet,
                hattVarigEndringAvNæringsinntektSiste4Kalenderår,
                harRevisor,
                kanInnhenteOpplsyningerFraRevisor
            } = result;

            expect(registrertILand).toBeUndefined();
            expect(nyIArbeidslivet).toBeUndefined();
            expect(hattVarigEndringAvNæringsinntektSiste4Kalenderår).toBeUndefined();
            expect(harRevisor).toBeUndefined();
            expect(kanInnhenteOpplsyningerFraRevisor).toBeUndefined();
        });
    });

    describe('fields are not visible', () => {
        beforeEach(() => {
            visibility.næringRegistrertILand = jest.fn(() => true);
            visibility.nyIArbeidslivet = jest.fn(() => true);
            visibility.varigEndringAvNæringsinntekt = jest.fn(() => true);
            visibility.revisorBolk = jest.fn(() => true);
            visibility.kanInnhenteOpplysningerFraRevisor = jest.fn(() => true);
        });

        it('should set næring properties to their assigned values', () => {
            const result = cleanup(næring as Næring);
            const {
                registrertILand,
                nyIArbeidslivet,
                hattVarigEndringAvNæringsinntektSiste4Kalenderår,
                harRevisor,
                kanInnhenteOpplsyningerFraRevisor
            } = result;

            expect(registrertILand).toBe(næring.registrertILand);
            expect(nyIArbeidslivet).toBe(næring.nyIArbeidslivet);
            expect(hattVarigEndringAvNæringsinntektSiste4Kalenderår).toBe(
                næring.hattVarigEndringAvNæringsinntektSiste4Kalenderår
            );
            expect(harRevisor).toBe(næring.harRevisor);
            expect(kanInnhenteOpplsyningerFraRevisor).toBe(næring.kanInnhenteOpplsyningerFraRevisor);
        });
    });
    describe('revisor', () => {
        it('should be set to undefined if harRevisor is not true', () => {
            const næringCpy = { ...næring };
            næringCpy.harRevisor = false;
            const result = cleanup(næringCpy as Næring);
            expect(result.revisor).toBeUndefined();
        });

        it('should be set to its assigned value if harRevisor is true', () => {
            const result = cleanup(næring as Næring);
            expect(result.revisor).toBe(næring.revisor);
        });
    });

    describe('regnskapsfører', () => {
        it('should be set to undefined if harRegnskapsfører is not true', () => {
            const næringCpy = { ...næring };
            næringCpy.harRegnskapsfører = false;
            const result = cleanup(næringCpy as Næring);
            expect(result.regnskapsfører).toBeUndefined();
        });

        it('should be set to its assigned value if harRegnskapsfører is true', () => {
            const result = cleanup(næring as Næring);
            expect(result.regnskapsfører).toBe(næring.regnskapsfører);
        });
    });
});
