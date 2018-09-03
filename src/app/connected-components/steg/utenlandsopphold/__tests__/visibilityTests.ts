import { default as fns } from './../visibility';

describe('Utenlandsopphold visbility tester', () => {
    it('Skal vise landevelger for siste 12 måneder om søker har sagt at de har hatt utenlandsopphold', () => {
        expect(fns.harBoddINorgeSiste12MndContent({ iNorgeSiste12Mnd: false })).toBe(true);
        expect(fns.harBoddINorgeSiste12MndContent({ iNorgeSiste12Mnd: true })).toBe(false);
    });

    it('Skal bo i Norge neste 12 måneder spørsmål skal være skjult gitt at forrige 12 måneder ikke er besvart', () => {
        expect(fns.skalBoINorgeNeste12MndBlock({ iNorgeSiste12Mnd: undefined })).toBe(false);
        expect(fns.skalBoINorgeNeste12MndBlock({ iNorgeSiste12Mnd: false })).toBe(true);
        expect(fns.skalBoINorgeNeste12MndBlock({ iNorgeSiste12Mnd: true })).toBe(true);
    });

    it('Skal vise landevelger for neste 12 måneder om søker har sagt at de skal ha utenlandsopphold', () => {
        expect(fns.skalBoINorgeNeste12MndContent({ iNorgeNeste12Mnd: false })).toBe(true);
        expect(fns.skalBoINorgeNeste12MndContent({ iNorgeNeste12Mnd: true })).toBe(false);
    });

    it('Dersom søknad er for et barn som ikke er født skal spørsmål om opphold i Norge under fødsel vises', () => {
        expect(
            fns.væreINorgeVedFødselSpørsmål({ iNorgeSiste12Mnd: true, iNorgeNeste12Mnd: true }, { erBarnetFødt: false })
        ).toBe(true);
        expect(
            fns.væreINorgeVedFødselSpørsmål(
                { iNorgeSiste12Mnd: true, iNorgeNeste12Mnd: false },
                { erBarnetFødt: false }
            )
        ).toBe(true);
        expect(
            fns.væreINorgeVedFødselSpørsmål({ iNorgeSiste12Mnd: true, iNorgeNeste12Mnd: true }, { erBarnetFødt: true })
        ).toBe(false);
        expect(
            fns.væreINorgeVedFødselSpørsmål({ iNorgeSiste12Mnd: true, iNorgeNeste12Mnd: false }, { erBarnetFødt: true })
        ).toBe(false);
    });
});
