import cleanup from './../cleanupNæring';
import {
    Næring,
    NæringPartial,
    Næringsrelasjon,
    NæringsrelasjonPartial,
} from '../../../types/søknad/SelvstendigNæringsdrivendeInformasjon';
import visibility from '../../../steg/andreInntekter/selvstendigNæringsdrivendeModal/visibility';

const revisorMock: NæringsrelasjonPartial = { navn: 'RevisorNavn' };
const regnskapsførerMock: NæringsrelasjonPartial = { navn: 'RegnsapsførerNavn' };

const næring: NæringPartial = {
    navnPåNæringen: 'Næring',
    registrertILand: 'testland',
    harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene: true,
    hattVarigEndringAvNæringsinntektSiste4Kalenderår: true,
    harRevisor: true,
    revisor: revisorMock as Næringsrelasjon,
    harRegnskapsfører: true,
    regnskapsfører: regnskapsførerMock as Næringsrelasjon,
    kanInnhenteOpplsyningerFraRevisor: true,
    næringsinntekt: '2000',
};

const næringUtenRevisorRegnskapsfører: NæringPartial = {
    navnPåNæringen: 'NæringUtenRevisorEllerRegnskapsfører',
    harRevisor: false,
    harRegnskapsfører: false,
};

const næringWithInvisibleChars: NæringPartial = {
    hattVarigEndringAvNæringsinntektSiste4Kalenderår: true,
    navnPåNæringen: 'Navn med\u00ad(soft hyphen)som skal erstattes med space.',
    endringAvNæringsinntektInformasjon: {
        dato: '20.01.2010',
        næringsinntektEtterEndring: 102000,
        forklaring: 'Forklaring med\u0009(tab)som skal erstattes med space.',
    },
    harRevisor: true,
    revisor: { navn: 'Revisor\u0009Olsen\u200a' } as Næringsrelasjon,
    harRegnskapsfører: true,
    regnskapsfører: { navn: 'Regnskapsfører\u2009Nilsen' } as Næringsrelasjon,
};

describe('cleanupNæring', () => {
    describe('fields are not visible', () => {
        beforeEach(() => {
            visibility.næringRegistrertILand = jest.fn(() => false);
            visibility.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene = jest.fn(() => false);
            visibility.varigEndringAvNæringsinntekt = jest.fn(() => false);
            visibility.revisorBolk = jest.fn(() => false);
            visibility.kanInnhenteOpplysningerFraRevisor = jest.fn(() => false);
            visibility.næringsinntekt = jest.fn(() => false);
        });

        it('should set næring properties to undefined', () => {
            const result = cleanup(næring as Næring);
            const {
                registrertILand,
                harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene,
                hattVarigEndringAvNæringsinntektSiste4Kalenderår,
                harRevisor,
                kanInnhenteOpplsyningerFraRevisor,
                næringsinntekt,
            } = result;

            expect(registrertILand).toBeUndefined();
            expect(harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene).toBeUndefined();
            expect(hattVarigEndringAvNæringsinntektSiste4Kalenderår).toBeUndefined();
            expect(harRevisor).toBeUndefined();
            expect(kanInnhenteOpplsyningerFraRevisor).toBeUndefined();
            expect(næringsinntekt).toBeUndefined();
        });
    });

    describe('fields are visible', () => {
        beforeEach(() => {
            visibility.næringRegistrertILand = jest.fn(() => true);
            visibility.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene = jest.fn(() => true);
            visibility.varigEndringAvNæringsinntekt = jest.fn(() => true);
            visibility.revisorBolk = jest.fn(() => true);
            visibility.kanInnhenteOpplysningerFraRevisor = jest.fn(() => true);
            visibility.næringsinntekt = jest.fn(() => true);
        });

        it('should set næring properties to their assigned values', () => {
            const result = cleanup(næring as Næring);
            const {
                registrertILand,
                harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene,
                hattVarigEndringAvNæringsinntektSiste4Kalenderår,
                harRevisor,
                kanInnhenteOpplsyningerFraRevisor,
                næringsinntekt,
            } = result;

            expect(registrertILand).toBe(næring.registrertILand);
            expect(harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene).toBe(
                næring.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene
            );
            expect(hattVarigEndringAvNæringsinntektSiste4Kalenderår).toBe(
                næring.hattVarigEndringAvNæringsinntektSiste4Kalenderår
            );
            expect(harRevisor).toBe(næring.harRevisor);
            expect(kanInnhenteOpplsyningerFraRevisor).toBe(næring.kanInnhenteOpplsyningerFraRevisor);
            expect(næringsinntekt).toBe(næring.næringsinntekt);
        });
    });
    describe('organisasjonsnummer', () => {
        it('should be included when registrertINorge is true', () => {
            const næringCpy = { ...næring };
            næringCpy.registrertINorge = true;
            næringCpy.organisasjonsnummer = '123';
            const result = cleanup(næringCpy as Næring);
            expect(result.organisasjonsnummer).toBeDefined();
        });
        it('should not be included when registrertINorge is false', () => {
            const næringCpy = { ...næring };
            næringCpy.registrertINorge = false;
            const result = cleanup(næringCpy as Næring);
            expect(result.organisasjonsnummer).toBeUndefined();
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
            expect(result.revisor).toEqual(næring.revisor);
            expect(result.revisor).toEqual(næring.revisor);
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
            expect(result.regnskapsfører).toEqual(næring.regnskapsfører);
        });
    });

    describe('should replace invisible chars with space i navn på næringen og forklaring', () => {
        it('should replace invisible chars with space', () => {
            const result = cleanup(næringWithInvisibleChars as Næring);
            expect(result.navnPåNæringen).toEqual('Navn med (soft hyphen)som skal erstattes med space.');
            expect(result.endringAvNæringsinntektInformasjon?.forklaring).toEqual(
                'Forklaring med (tab)som skal erstattes med space.'
            );
            expect(result.regnskapsfører.navn).toEqual('Regnskapsfører Nilsen');
            expect(result.revisor.navn).toEqual('Revisor Olsen ');
        });
        it('should not give an error on undefined revisor and regnskapsfører', () => {
            const result = cleanup(næringUtenRevisorRegnskapsfører as Næring);
            expect(result.revisor).toBeUndefined();
            expect(result.regnskapsfører).toBeUndefined();
        });
    });
});
