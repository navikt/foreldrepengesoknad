import fns from './../visibility';
import {
    NæringPartial,
    Næringsrelasjon,
    Næringstype
} from '../../../types/søknad/SelvstendigNæringsdrivendeInformasjon';

describe('SelvstendigNæringsdrivendeModal visibility', () => {
    describe('Navn på næringen', () => {
        it('should be visible if næringstyper.length is larger than zero', () => {
            expect(fns.navnPåNæringen({ næringstyper: [Næringstype.ANNET] })).toBe(true);
        });

        it('should be hidden if næringstyper is undefined or length is 0', () => {
            expect(fns.navnPåNæringen({ næringstyper: [] })).toBe(false);
            expect(fns.navnPåNæringen({})).toBe(false);
        });
    });

    describe('Organisasjonsnummer', () => {
        beforeEach(() => {
            fns.navnPåNæringen = jest.fn(() => true);
        });

        it('should be visible if navnPåNæringen is visible and not undefined', () => {
            expect(fns.organisasjonsnummer({ navnPåNæringen: 'something' })).toBe(true);
        });

        it('should be hidden if navnPåNæringen is undefined or not visible', () => {
            expect(fns.organisasjonsnummer({})).toBe(false);
            fns.navnPåNæringen = jest.fn(() => false);
            expect(fns.organisasjonsnummer({ navnPåNæringen: 'something ' })).toBe(false);
        });
    });

    describe('Tidsperiode', () => {
        describe('visibility', () => {
            beforeEach(() => {
                fns.organisasjonsnummer = jest.fn(() => true);
            });

            it('should be visible if organisasjonsnummer is visible and not undefined', () => {
                expect(fns.tidsperiode({ organisasjonsnummer: '123456789' })).toBe(true);
            });

            it('should be hidden if organisasjonsnummer is undefined or not visible', () => {
                expect(fns.tidsperiode({})).toBe(false);
                fns.organisasjonsnummer = jest.fn(() => false);
                expect(fns.tidsperiode({ organisasjonsnummer: '123456789 ' })).toBe(false);
            });
        });

        describe('complete', () => {
            it('should be complete if fom is defined, and pågående=true or tom !== undefined', () => {
                expect(fns.tidsperiodeUtfylt({ tidsperiode: { fom: new Date() }, pågående: true })).toBe(true);
                expect(fns.tidsperiodeUtfylt({ tidsperiode: { fom: new Date(), tom: new Date() } })).toBe(true);
            });

            it('should be incomplete if not pågående and fom/tom is undefined', () => {
                expect(fns.tidsperiodeUtfylt({ tidsperiode: {} })).toBe(false);
                expect(fns.tidsperiodeUtfylt({ tidsperiode: { fom: new Date() }, pågående: false })).toBe(false);
            });
        });
    });

    describe('Næring registrert i Norge', () => {
        beforeEach(() => {
            fns.tidsperiodeUtfylt = jest.fn(() => true);
            fns.tidsperiode = jest.fn(() => true);
            fns.næringsinntekt = jest.fn(() => true);
        });

        it('should be visible if næringsinntekt field is defined and visible', () => {
            expect(fns.næringRegistrertINorge({ næringsinntekt: '1111' })).toBe(true);
        });

        it('should be hidden if næringsinntekt field is visible but its value is undefined', () => {
            expect(fns.næringRegistrertINorge({})).toBe(false);
        });

        it('should be visible if tidsperiode is complete and visible when næringsinntekt is not visible', () => {
            fns.næringsinntekt = jest.fn(() => false);
            expect(fns.næringRegistrertINorge({})).toBe(true);
        });
    });

    describe('Næring registrert i utlandet', () => {
        it('should be visible if registrertINorge=false and næringRegistrertINorge is visible', () => {
            fns.næringRegistrertINorge = jest.fn(() => true);
            expect(fns.næringRegistrertILand({ registrertINorge: false })).toBe(true);
        });

        it('should be hidden if registrertINorge is not false', () => {
            expect(fns.næringRegistrertILand({ registrertINorge: true })).toBe(false);
            expect(fns.næringRegistrertILand({})).toBe(false);
        });

        it('should be hidden if registrertINorge field is not visible', () => {
            fns.næringRegistrertINorge = jest.fn(() => false);
            expect(fns.næringRegistrertILand({ registrertINorge: false })).toBe(false);
        });
    });

    describe('Stillingsprosent', () => {
        it('should be visible if registrertINorge is true and visible', () => {
            fns.næringRegistrertINorge = jest.fn(() => true);
            expect(fns.stillingsprosent({ registrertINorge: true })).toBe(true);
        });

        it('should be visible if registrertILand is defined and visible, and registrertINorge is false', () => {
            fns.næringRegistrertILand = jest.fn(() => true);
            expect(fns.stillingsprosent({ registrertINorge: false, registrertILand: 'country' }));
        });

        it('should be hidden if registrertILand is not visible', () => {
            fns.næringRegistrertILand = jest.fn(() => false);
            expect(fns.stillingsprosent({ registrertINorge: false })).toBe(false);
        });

        it('should be hidden if registrertINorge is not visible', () => {
            fns.næringRegistrertINorge = jest.fn(() => false);
            expect(fns.stillingsprosent({ registrertINorge: true })).toBe(false);
        });
    });

    describe('Regnskapsfører-bolk', () => {
        beforeEach(() => {
            fns.nyIArbeidslivet = jest.fn(() => true);
            fns.varigEndringAvNæringsinntekt = jest.fn(() => true);
        });

        it('should be visible if nyIArbeidslivet is defined and visible', () => {
            expect(fns.regnskapsførerBolk({ nyIArbeidslivet: true })).toBe(true);
        });

        it('should be hidden if nyIArbeidslivet is undefined or not visible', () => {
            expect(fns.regnskapsførerBolk({})).toBe(false);
            fns.nyIArbeidslivet = jest.fn(() => false);
            expect(fns.regnskapsførerBolk({ nyIArbeidslivet: true })).toBe(false);
        });

        it('should be visible if varigEndringAvNæringsinntekt is defined and visible', () => {
            fns.nyIArbeidslivet = jest.fn(() => false);
            expect(fns.regnskapsførerBolk({ hattVarigEndringAvNæringsinntektSiste4Kalenderår: true })).toBe(true);
        });

        it('should be hidden if varigEndringAvNæringsinntekt is undefined or not visible', () => {
            expect(fns.regnskapsførerBolk({})).toBe(false);
            fns.varigEndringAvNæringsinntekt = jest.fn(() => false);
            expect(fns.regnskapsførerBolk({ hattVarigEndringAvNæringsinntektSiste4Kalenderår: true })).toBe(false);
        });
    });

    describe('Revisor-bolk', () => {
        it('should be visible if harRegnskapsfører is false and regnskapsfører-bolk is visible', () => {
            fns.regnskapsførerBolk = jest.fn(() => true);
            expect(fns.revisorBolk({ harRegnskapsfører: false })).toBe(true);
        });

        it('should be hidden if harRegnskapsfører is true or regnskapsfører-bolk is hidden', () => {
            fns.regnskapsførerBolk = jest.fn(() => false);
            expect(fns.revisorBolk({ harRegnskapsfører: false })).toBe(false);
            fns.regnskapsførerBolk = jest.fn(() => true);
            expect(fns.revisorBolk({ harRegnskapsfører: true })).toBe(false);
        });
    });

    describe('Kan innhente opplysninger fra revisor', () => {
        beforeEach(() => {
            fns.revisorBolk = jest.fn(() => true);
        });

        it('should be visible if both revisor and erNærVennEllerFamilie is defined and visible', () => {
            expect(
                fns.kanInnhenteOpplysningerFraRevisor({
                    harRevisor: true,
                    revisor: { navn: 'asdf', telefonnummer: '1234', erNærVennEllerFamilie: true }
                })
            ).toBe(true);
        });

        it('should be hidden if harRevisor is false', () => {
            expect(fns.kanInnhenteOpplysningerFraRevisor({ harRevisor: false })).toBe(false);
        });

        it('should be hidden if revisor is undefined', () => {
            expect(fns.kanInnhenteOpplysningerFraRevisor({ revisor: undefined })).toBe(false);
        });

        it('should be hidden if revisorBolk is not visible', () => {
            fns.revisorBolk = jest.fn(() => false);
            expect(
                fns.kanInnhenteOpplysningerFraRevisor({
                    harRevisor: true,
                    revisor: { navn: 'asdf', telefonnummer: '1234', erNærVennEllerFamilie: true }
                })
            ).toBe(false);
        });

        it('should be hidden if erNærVennEllerFamilie is undefined', () => {
            const relasjon = { navn: 'asdf', telefonnummer: '1234' };
            expect(
                fns.kanInnhenteOpplysningerFraRevisor({
                    harRevisor: true,
                    revisor: relasjon as Næringsrelasjon
                })
            ).toBe(false);
        });
    });

    describe('Form buttons', () => {
        beforeEach(() => {
            fns.kanInnhenteOpplysningerFraRevisor = jest.fn(() => true);
            fns.nyIArbeidslivet = jest.fn(() => true);
            fns.kanInnhenteOpplysningerFraRevisor = jest.fn(() => true);
        });

        it('should be visible if regnskapsfører data is complete', () => {
            expect(
                fns.formButtons({
                    harRegnskapsfører: true,
                    regnskapsfører: { navn: 'asdf', telefonnummer: '1234', erNærVennEllerFamilie: true }
                })
            ).toBe(true);
        });

        it('should be hidden if regnskapsfører data is complete except for erNærVennEllerFamilie', () => {
            const relasjon = { navn: 'asdf', telefonnummer: '1234' };
            expect(
                fns.formButtons({
                    harRegnskapsfører: true,
                    regnskapsfører: relasjon as Næringsrelasjon
                })
            ).toBe(false);
        });

        it('should be visible if revisor data is complete', () => {
            expect(
                fns.formButtons({
                    harRevisor: true,
                    kanInnhenteOpplsyningerFraRevisor: true,
                    revisor: { navn: 'asdf', telefonnummer: '1234', erNærVennEllerFamilie: true }
                })
            ).toBe(true);
        });

        it('should be hidden if revisor data is complete but kanInnhenteOpplysningerFraRevisor is undefined or hidden', () => {
            const relasjon: Næringsrelasjon = { navn: 'asdf', telefonnummer: '1234', erNærVennEllerFamilie: true };
            const data: NæringPartial = { revisor: relasjon };
            expect(fns.formButtons(data)).toBe(false);
            data.harRevisor = true;
            expect(fns.formButtons(data)).toBe(false);
            fns.kanInnhenteOpplysningerFraRevisor = jest.fn(() => false);
            expect(fns.formButtons(data)).toBe(false);
        });

        it('should be visible if no revisor and no regnskapsfører, but nyIArbeidslivet is defined and visible', () => {
            expect(
                fns.formButtons({
                    harRevisor: false,
                    harRegnskapsfører: false,
                    nyIArbeidslivet: true
                })
            ).toBe(true);
        });

        it('should be hidden if data about both revisor, regnskapsfører and nyIArbeidslivet is missing', () => {
            expect(fns.formButtons({})).toBe(false);
            expect(fns.formButtons({ harRegnskapsfører: false })).toBe(false);
            expect(fns.formButtons({ harRevisor: false })).toBe(false);
        });
    });
});
