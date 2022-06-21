import { Forelder } from 'app/types/Forelder';
import { Periode, Periodetype } from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import {
    farMedmorsTidsperiodeSkalSplittesPåFamiliehendelsesdato,
    getFørsteUttaksdag2UkerFørFødsel,
    getSisteUttaksdag6UkerEtterFødsel,
    starterTidsperiodeEtter2UkerFørFødsel,
    starterTidsperiodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel,
} from './wlbUtils';

describe('wlbUtils - getFørsteUttaksdag2UkerFørFødsel', () => {
    it('skal returnere riktig startdato mandagen etter søndager 2 uker før for perioden før fødsel hvis termin er på en søndag og fødsel ikke har skjedd (famhendelsesdato = termindato)', () => {
        const result = getFørsteUttaksdag2UkerFørFødsel(
            new Date('2022-05-29T00:00:00.000Z'),
            new Date('2022-05-29T00:00:00.000Z')
        );
        expect(result).toEqual(new Date('2022-05-16T00:00:00.000Z'));
    });

    it('skal returnere riktig startdat to uker før for perioden før fødsel hvis termin er på en fredag og fødsel ikke har skjedd (famhendelsesdato = termindato)', () => {
        const result = getFørsteUttaksdag2UkerFørFødsel(
            new Date('2022-05-27T00:00:00.000Z'),
            new Date('2022-05-27T00:00:00.000Z')
        );
        expect(result).toEqual(new Date('2022-05-13T00:00:00.000Z'));
    });

    it('skal returnere riktig startdato fra 2 uker før termin for perioden før fødsel hvis fødsel har inntruffet og termin-2 uker er før fødsel', () => {
        const result = getFørsteUttaksdag2UkerFørFødsel(
            new Date('2022-05-14T00:00:00.000Z'),
            new Date('2022-05-27T00:00:00.000Z')
        );
        expect(result).toEqual(new Date('2022-05-13T00:00:00.000Z'));
    });

    it('skal returnere riktig startdatofor perioden før fødsel hvis fødsel har inntruffet og fødsel er før termin - 2 uker', () => {
        const result = getFørsteUttaksdag2UkerFørFødsel(
            new Date('2022-05-12T00:00:00.000Z'),
            new Date('2022-05-27T00:00:00.000Z')
        );
        expect(result).toEqual(new Date('2022-05-12T00:00:00.000Z'));
    });
    it('skal returnere riktig startdatofor perioden før fødsel hvis termin ikke er oppgitt og fødsel har inntruffet', () => {
        const result = getFørsteUttaksdag2UkerFørFødsel(new Date('2022-05-27T00:00:00.000Z'), undefined);
        expect(result).toEqual(new Date('2022-05-13T00:00:00.000Z'));
    });
});

describe('wlbUtils - getSisteUttaksdag6UkerEtterFødsel', () => {
    it('skal returnere riktig sluttdato for seks ukers perioden etter fødsel hvis familiehendelsesdato er på en søndag', () => {
        const result = getSisteUttaksdag6UkerEtterFødsel(new Date('2022-05-29T00:00:00.000Z'));
        expect(result).toEqual(new Date('2022-07-08T00:00:00.000Z'));
    });

    it('skal returnere riktig sluttdato for seks ukers perioden etter fødsel hvis familiehendelsesdato er på en fredag', () => {
        const result = getSisteUttaksdag6UkerEtterFødsel(new Date('2022-05-27T00:00:00.000Z'));
        expect(result).toEqual(new Date('2022-07-07T00:00:00.000Z'));
    });
});

describe('wlbUtils - starterTidsperiodeEtter2UkerFørFødsel', () => {
    it('skal returnere true for periode som starter mindre enn 2 uker før fødsel', () => {
        const tidsperiode = { fom: new Date('2022-05-13T00:00:00.000Z'), tom: new Date('2022-05-29T00:00:00.000Z') };
        const result = starterTidsperiodeEtter2UkerFørFødsel(
            tidsperiode,
            new Date('2022-05-27T00:00:00.000Z'),
            new Date('2022-05-27T00:00:00.000Z')
        );
        expect(result).toEqual(true);
    });

    it('skal returnere false for periode som starter mer enn 2 uker før fødsel', () => {
        const tidsperiode = { fom: new Date('2022-05-12T00:00:00.000Z'), tom: new Date('2022-06-02T00:00:00.000Z') };
        const result = starterTidsperiodeEtter2UkerFørFødsel(
            tidsperiode,
            new Date('2022-05-27T00:00:00.000Z'),
            new Date('2022-05-27T00:00:00.000Z')
        );
        expect(result).toEqual(false);
    });
});

describe('wlbUtils - starterTidsperiodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel', () => {
    it('skal returnere true for periode som starter innen perioden rundt fødsel', () => {
        const tidsperiode = { fom: new Date('2022-07-07T00:00:00.000Z'), tom: new Date('2022-07-09T00:00:00.000Z') };
        const result = starterTidsperiodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel(
            tidsperiode,
            new Date('2022-05-27T00:00:00.000Z'),
            new Date('2022-05-27T00:00:00.000Z')
        );
        expect(result).toEqual(true);
    });
    it('skal returnere false for periode som starter etter perioden rundt fødsel', () => {
        const tidsperiode = { fom: new Date('2022-07-08T00:00:00.000Z'), tom: new Date('2022-07-09T00:00:00.000Z') };
        const result = starterTidsperiodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel(
            tidsperiode,
            new Date('2022-05-27T00:00:00.000Z'),
            new Date('2022-05-27T00:00:00.000Z')
        );
        expect(result).toEqual(false);
    });
    it('skal returnere true for periode som starter innen perioden rundt fødsel med fødsel på en søndag', () => {
        const tidsperiode = { fom: new Date('2022-07-08T00:00:00.000Z'), tom: new Date('2022-07-09T00:00:00.000Z') };
        const result = starterTidsperiodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel(
            tidsperiode,
            new Date('2022-05-29T00:00:00.000Z'),
            new Date('2022-05-29T00:00:00.000Z')
        );
        expect(result).toEqual(true);
    });
    it('skal returnere false for periode som starter etter perioden rundt fødsel med fødsel på en søndag', () => {
        const tidsperiode = { fom: new Date('2022-07-09T00:00:00.000Z'), tom: new Date('2022-07-09T00:00:00.000Z') };
        const result = starterTidsperiodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel(
            tidsperiode,
            new Date('2022-05-29T00:00:00.000Z'),
            new Date('2022-05-29T00:00:00.000Z')
        );
        expect(result).toEqual(false);
    });

    it('skal returnere true for periode som starter innen perioden rundt fødsel med tidligere termindato', () => {
        const tidsperiode = { fom: new Date('2022-05-11T00:00:00.000Z'), tom: new Date('2022-07-09T00:00:00.000Z') };
        const result = starterTidsperiodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel(
            tidsperiode,
            new Date('2022-05-27T00:00:00.000Z'),
            new Date('2022-05-25T00:00:00.000Z')
        );
        expect(result).toEqual(true);
    });

    it('skal returnere true for periode som starter innen perioden rundt fødsel med ukjent termindato', () => {
        const tidsperiode = { fom: new Date('2022-05-13T00:00:00.000Z'), tom: new Date('2022-07-09T00:00:00.000Z') };
        const result = starterTidsperiodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel(
            tidsperiode,
            new Date('2022-05-27T00:00:00.000Z'),
            undefined
        );
        expect(result).toEqual(true);
    });

    it('skal returnere false for periode som ikke starter innen perioden rundt fødsel', () => {
        const tidsperiode = { fom: new Date('2022-07-09T00:00:00.000Z'), tom: new Date('2022-07-11T00:00:00.000Z') };
        const result = starterTidsperiodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel(
            tidsperiode,
            new Date('2022-05-27T00:00:00.000Z'),
            new Date('2022-05-27T00:00:00.000Z')
        );
        expect(result).toEqual(false);
    });
});
describe('wlbUtils - farMedmorsTidsperiodeSkalSplittesPåFamiliehendelsesdato', () => {
    it('skal returnere at periode som går over fødsel skal splittes, når det er far/medmors periode rundt fødsel', () => {
        const periode = {
            type: Periodetype.Uttak,
            konto: StønadskontoType.Fedrekvote,
            forelder: Forelder.farMedmor,
            erMorForSyk: false,
            ønskerSamtidigUttak: true,
            samtidigUttakProsent: '100',
            tidsperiode: { fom: new Date('2022-05-25T00:00:00.000Z'), tom: new Date('2022-05-27T00:00:00.000Z') },
        } as Periode;
        const result = farMedmorsTidsperiodeSkalSplittesPåFamiliehendelsesdato(
            periode,
            new Date('2022-05-27T00:00:00.000Z'),
            true,
            undefined
        );
        expect(result).toEqual(true);
    });
    it('skal returnere at periode som ikke går over fødsel ikke skal splittes, når det er far/medmors periode rundt fødsel', () => {
        const periode = {
            type: Periodetype.Uttak,
            konto: StønadskontoType.Fedrekvote,
            forelder: Forelder.farMedmor,
            erMorForSyk: false,
            ønskerSamtidigUttak: true,
            samtidigUttakProsent: '100',
            tidsperiode: { fom: new Date('2022-05-27T00:00:00.000Z'), tom: new Date('2022-05-29T00:00:00.000Z') },
        } as Periode;
        const result = farMedmorsTidsperiodeSkalSplittesPåFamiliehendelsesdato(
            periode,
            new Date('2022-05-27T00:00:00.000Z'),
            true,
            undefined
        );
        expect(result).toEqual(false);
    });
    it('skal returnere at periode som slutter før fødsel ikke skal splittes, når det er far/medmors periode rundt fødsel', () => {
        const periode = {
            type: Periodetype.Uttak,
            konto: StønadskontoType.Fedrekvote,
            forelder: Forelder.farMedmor,
            erMorForSyk: false,
            ønskerSamtidigUttak: true,
            samtidigUttakProsent: '100',
            tidsperiode: { fom: new Date('2022-05-25T00:00:00.000Z'), tom: new Date('2022-05-26T00:00:00.000Z') },
        } as Periode;
        const result = farMedmorsTidsperiodeSkalSplittesPåFamiliehendelsesdato(
            periode,
            new Date('2022-05-27T00:00:00.000Z'),
            true,
            undefined
        );
        expect(result).toEqual(false);
    });
    it('skal returnere at periode som går over fødsel ikke skal splittes, når det ikke er samtidig uttaksperiode', () => {
        const periode = {
            type: Periodetype.Uttak,
            konto: StønadskontoType.Fedrekvote,
            forelder: Forelder.farMedmor,
            erMorForSyk: true,
            ønskerSamtidigUttak: false,
            tidsperiode: { fom: new Date('2022-05-25T00:00:00.000Z'), tom: new Date('2022-05-286T00:00:00.000Z') },
        } as Periode;
        const result = farMedmorsTidsperiodeSkalSplittesPåFamiliehendelsesdato(
            periode,
            new Date('2022-05-27T00:00:00.000Z'),
            true,
            undefined
        );
        expect(result).toEqual(false);
    });
    it('skal returnere at periode som går over fødsel skal splittes, når det er far/medmors periode og bare far/medmor har rett', () => {
        const periode = {
            type: Periodetype.Uttak,
            konto: StønadskontoType.Foreldrepenger,
            forelder: Forelder.farMedmor,
            tidsperiode: { fom: new Date('2022-05-25T00:00:00.000Z'), tom: new Date('2022-05-27T00:00:00.000Z') },
        } as Periode;
        const result = farMedmorsTidsperiodeSkalSplittesPåFamiliehendelsesdato(
            periode,
            new Date('2022-05-27T00:00:00.000Z'),
            false,
            undefined
        );
        expect(result).toEqual(true);
    });
    it('skal returnere at periode som går over fødsel ikke skal splittes, når det er far/medmors foreldrepengeperiode og både mor og far/medmor har rett', () => {
        const periode = {
            type: Periodetype.Uttak,
            konto: StønadskontoType.Foreldrepenger,
            forelder: Forelder.farMedmor,
            tidsperiode: { fom: new Date('2022-05-25T00:00:00.000Z'), tom: new Date('2022-05-27T00:00:00.000Z') },
        } as Periode;
        const result = farMedmorsTidsperiodeSkalSplittesPåFamiliehendelsesdato(
            periode,
            new Date('2022-05-27T00:00:00.000Z'),
            true,
            undefined
        );
        expect(result).toEqual(false);
    });
});
