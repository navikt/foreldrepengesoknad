import fns from './../visibility';
import { Næringstype } from '../../../types/søknad/SelvstendigNæringsdrivendeInformasjon';

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
});
