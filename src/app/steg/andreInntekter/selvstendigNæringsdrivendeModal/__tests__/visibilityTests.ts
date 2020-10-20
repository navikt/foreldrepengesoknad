import fns from '../visibility';
import {
    NæringPartial,
    Næringsrelasjon,
    Næringstype,
} from '../../../../types/søknad/SelvstendigNæringsdrivendeInformasjon';
import { createDatoInputVerdiFromDate } from '../../../../../common/components/skjema/elements/dato-input/datoInputUtils';

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

    describe('Næring registrert i Norge', () => {
        beforeEach(() => {
            fns.navnPåNæringen = jest.fn(() => true);
        });
        it('should be visible if navn på næringen is defined and visible', () => {
            expect(fns.næringRegistrertINorge({ navnPåNæringen: 'abc' })).toBe(true);
        });

        it('should be hidden if navn på næringen is visible but its value is undefined or empty', () => {
            expect(fns.næringRegistrertINorge({})).toBe(false);
            expect(fns.næringRegistrertINorge({ navnPåNæringen: '' })).toBe(false);
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

    describe('Organisasjonsnummer', () => {
        beforeEach(() => {
            fns.navnPåNæringen = jest.fn(() => true);
            fns.næringRegistrertINorge = jest.fn(() => true);
        });

        it('should be visible if registrert i norge is visible and not undefined', () => {
            expect(fns.organisasjonsnummer({ registrertINorge: true })).toBe(true);
        });

        it('should be visible if registrert i utlandet and registrertILand is defined', () => {
            expect(fns.organisasjonsnummer({ registrertINorge: true, registrertILand: 'japan' })).toBe(true);
        });

        it('should be hidden if registrert norge is undefined', () => {
            expect(fns.organisasjonsnummer({ registrertINorge: undefined })).toBe(false);
        });

        it('should be hidden if registrert norge is false', () => {
            expect(fns.organisasjonsnummer({ registrertINorge: false })).toBe(false);
        });

        it('should be hidden if registrert norge is is false and registrertILand is undefined', () => {
            expect(fns.organisasjonsnummer({ registrertINorge: false, registrertILand: undefined })).toBe(false);
        });
    });

    describe('Tidsperiode', () => {
        describe('visibility', () => {
            beforeEach(() => {
                fns.næringRegistrertINorge = jest.fn(() => true);
                fns.organisasjonsnummer = jest.fn(() => true);
            });

            it('should be visible if registrertINorge and organisasjonsnummer is defined', () => {
                expect(fns.tidsperiode({ registrertINorge: true, organisasjonsnummer: '123123123' })).toBe(true);
            });

            it('should be hidden if registrertINorge and organisasjonsnummer is not defined', () => {
                expect(fns.tidsperiode({ registrertINorge: true })).toBe(false);
            });

            it('should be hidden if registrertINorge and organisasjonsnummer is empty', () => {
                expect(fns.tidsperiode({ registrertINorge: true, organisasjonsnummer: '' })).toBe(false);
            });

            it('should be visible if registrertINorge === false and registrertILand has value', () => {
                fns.organisasjonsnummer = jest.fn(() => false);
                expect(fns.tidsperiode({ registrertINorge: false, registrertILand: 'abc' })).toBe(true);
            });

            it('should be hidden if registrertINorge === true and organisasjonsnummer is undefined or not visible', () => {
                expect(fns.tidsperiode({ registrertINorge: true, organisasjonsnummer: undefined })).toBe(false);
            });
        });

        describe('complete', () => {
            it('should be complete if fom is defined, and pågående=true or tom !== undefined', () => {
                expect(
                    fns.tidsperiodeUtfylt({
                        tidsperiode: { fom: createDatoInputVerdiFromDate(new Date()), pågående: true },
                    })
                ).toBe(true);
                expect(
                    fns.tidsperiodeUtfylt({
                        tidsperiode: {
                            fom: createDatoInputVerdiFromDate(new Date()),
                            tom: createDatoInputVerdiFromDate(new Date()),
                        },
                    })
                ).toBe(true);
            });

            it('should be incomplete if not pågående and fom/tom is undefined', () => {
                expect(fns.tidsperiodeUtfylt({ tidsperiode: {} })).toBe(false);
                expect(
                    fns.tidsperiodeUtfylt({
                        tidsperiode: { fom: createDatoInputVerdiFromDate(new Date()) },
                        pågående: false,
                    })
                ).toBe(false);
            });
        });
    });

    describe('Oppstartsdato', () => {
        it('should be visible if harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene is true and visible', () => {
            fns.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene = jest.fn(() => true);
            expect(fns.oppstartsdato({ harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene: true })).toBe(true);
        });

        it('should not be visible if harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene is true and not visible', () => {
            fns.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene = jest.fn(() => false);
            expect(fns.oppstartsdato({ harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene: true })).toBe(false);
        });

        it('should not be visible if harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene is false and visible', () => {
            fns.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene = jest.fn(() => true);
            expect(fns.oppstartsdato({ harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene: false })).toBe(false);
        });

        it('should not be visible if harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene is false and not visible', () => {
            fns.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene = jest.fn(() => false);
            expect(fns.oppstartsdato({ harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene: false })).toBe(false);
        });
    });

    describe('Regnskapsfører-bolk', () => {
        beforeEach(() => {
            fns.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene = jest.fn(() => true);
            fns.varigEndringAvNæringsinntekt = jest.fn(() => true);
        });

        it('should be visible if harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene is defined and visible', () => {
            expect(fns.regnskapsførerBolk({ harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene: true })).toBe(true);
        });

        it('should be hidden if harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene is undefined or not visible', () => {
            expect(fns.regnskapsførerBolk({})).toBe(false);
            fns.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene = jest.fn(() => false);
            expect(fns.regnskapsførerBolk({ harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene: true })).toBe(
                false
            );
        });

        it('should be visible if varigEndringAvNæringsinntekt is defined and visible', () => {
            fns.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene = jest.fn(() => false);
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
                    revisor: { navn: 'asdf', telefonnummer: '1234', erNærVennEllerFamilie: true },
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
                    revisor: { navn: 'asdf', telefonnummer: '1234', erNærVennEllerFamilie: true },
                })
            ).toBe(false);
        });

        it('should be hidden if erNærVennEllerFamilie is undefined', () => {
            const relasjon = { navn: 'asdf', telefonnummer: '1234' };
            expect(
                fns.kanInnhenteOpplysningerFraRevisor({
                    harRevisor: true,
                    revisor: relasjon as Næringsrelasjon,
                })
            ).toBe(false);
        });
    });

    describe('Form buttons', () => {
        beforeEach(() => {
            fns.kanInnhenteOpplysningerFraRevisor = jest.fn(() => true);
            fns.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene = jest.fn(() => true);
            fns.kanInnhenteOpplysningerFraRevisor = jest.fn(() => true);
        });

        it('should be visible if regnskapsfører data is complete', () => {
            expect(
                fns.formButtons({
                    harRegnskapsfører: true,
                    regnskapsfører: { navn: 'asdf', telefonnummer: '1234', erNærVennEllerFamilie: true },
                })
            ).toBe(true);
        });

        it('should be hidden if regnskapsfører data is complete except for erNærVennEllerFamilie', () => {
            const relasjon = { navn: 'asdf', telefonnummer: '1234' };
            expect(
                fns.formButtons({
                    harRegnskapsfører: true,
                    regnskapsfører: relasjon as Næringsrelasjon,
                })
            ).toBe(false);
        });

        it('should be visible if revisor data is complete', () => {
            expect(
                fns.formButtons({
                    harRevisor: true,
                    kanInnhenteOpplsyningerFraRevisor: true,
                    revisor: { navn: 'asdf', telefonnummer: '1234', erNærVennEllerFamilie: true },
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

        it('should be visible if no revisor and no regnskapsfører, but harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene is defined and visible', () => {
            expect(
                fns.formButtons({
                    harRevisor: false,
                    harRegnskapsfører: false,
                    harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene: true,
                })
            ).toBe(true);
        });

        it('should be hidden if data about both revisor, regnskapsfører and harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene is missing', () => {
            expect(fns.formButtons({})).toBe(false);
            expect(fns.formButtons({ harRegnskapsfører: false })).toBe(false);
            expect(fns.formButtons({ harRevisor: false })).toBe(false);
        });
    });
});
