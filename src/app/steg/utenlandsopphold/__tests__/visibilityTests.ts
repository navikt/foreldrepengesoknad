import { default as fns } from '../visibility';
import { Utenlandsopphold } from '../../../types/søknad/InformasjonOmUtenlandsopphold';
import { Søkersituasjon } from '../../../types/søknad/Søknad';

const opphold: Utenlandsopphold = {
    land: 'abc',
    tidsperiode: { fom: new Date(), tom: new Date() }
};

describe('Utenlandsopphold visbility tester', () => {
    it('Skal vise landevelger for siste 12 måneder om søker har sagt at de har hatt utenlandsopphold', () => {
        expect(fns.harBoddINorgeSiste12MndContent({ iNorgeSiste12Mnd: false })).toBe(true);
        expect(fns.harBoddINorgeSiste12MndContent({ iNorgeSiste12Mnd: true })).toBe(false);
    });

    it('Skal bo i Norge neste 12 måneder spørsmål skal være skjult gitt at forrige 12 måneder ikke er besvart', () => {
        expect(fns.skalBoINorgeNeste12MndBlock({ iNorgeSiste12Mnd: undefined })).toBe(false);
        expect(fns.skalBoINorgeNeste12MndBlock({ iNorgeSiste12Mnd: false, tidligereOpphold: [] })).toBe(false);
        expect(
            fns.skalBoINorgeNeste12MndBlock({
                iNorgeSiste12Mnd: false,
                tidligereOpphold: [opphold]
            })
        ).toBe(true);
        expect(fns.skalBoINorgeNeste12MndBlock({ iNorgeSiste12Mnd: true })).toBe(true);
    });

    it('Skal vise landevelger for neste 12 måneder om søker har sagt at de skal ha utenlandsopphold', () => {
        expect(fns.skalBoINorgeNeste12MndContent({ iNorgeNeste12Mnd: false })).toBe(true);
        expect(fns.skalBoINorgeNeste12MndContent({ iNorgeNeste12Mnd: true })).toBe(false);
    });

    it('Dersom søknad er for et barn som er født skal spørsmål om søker skal være i Norge på fødselsdato stilles', () => {
        expect(
            fns.skalVæreINorgeVedFødsel({ iNorgeSiste12Mnd: true, iNorgeNeste12Mnd: true }, { erBarnetFødt: false })
        ).toBe(true);
        expect(
            fns.skalVæreINorgeVedFødsel(
                { iNorgeSiste12Mnd: true, senereOpphold: [opphold], iNorgeNeste12Mnd: false },
                { erBarnetFødt: false }
            )
        ).toBe(true);
        expect(
            fns.skalVæreINorgeVedFødsel({ iNorgeSiste12Mnd: true, iNorgeNeste12Mnd: true }, { erBarnetFødt: true })
        ).toBe(false);
        expect(
            fns.skalVæreINorgeVedFødsel({ iNorgeSiste12Mnd: true, iNorgeNeste12Mnd: false }, { erBarnetFødt: true })
        ).toBe(false);
    });

    it('Dersom søknad er for et barn som er født skal spørsmål om søker befant seg i Norge på fødselsdato stilles', () => {
        expect(
            fns.varDuINorgeDaBarnetBleFødt({ iNorgeSiste12Mnd: true, iNorgeNeste12Mnd: true }, { erBarnetFødt: true })
        ).toBe(true);
        expect(
            fns.varDuINorgeDaBarnetBleFødt({ iNorgeSiste12Mnd: true, iNorgeNeste12Mnd: true }, { erBarnetFødt: false })
        ).toBe(false);
    });

    it('Dersom søknad er for et barn som er adoptert skal spørsmål om søker befant seg i Norge på omsorgsovertakelsesdato stilles', () => {
        expect(
            fns.befinnerDuDegINorgePåDatoForOmsorgsovertakelse(
                { iNorgeSiste12Mnd: true, iNorgeNeste12Mnd: true },
                Søkersituasjon.ADOPSJON
            )
        ).toBe(true);
        expect(
            fns.befinnerDuDegINorgePåDatoForOmsorgsovertakelse(
                { iNorgeSiste12Mnd: true, iNorgeNeste12Mnd: true },
                Søkersituasjon.FØDSEL
            )
        ).toBe(false);
        expect(
            fns.befinnerDuDegINorgePåDatoForOmsorgsovertakelse(
                { iNorgeSiste12Mnd: true, iNorgeNeste12Mnd: true },
                Søkersituasjon.FORELDREANSVAR
            )
        ).toBe(false);
    });
});
