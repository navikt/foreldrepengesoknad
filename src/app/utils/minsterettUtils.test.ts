import { Dekningsgrad } from 'app/types/Dekningsgrad';
import MockDate from 'mockdate';
import { getkontoUtenAktivitetskravUker } from './minsterettUtils';

const bareFarHarRett = true;
const morErIkkeUfør = false;
const morErUfør = true;
const ikkeBareFarHarRett = false;

describe('Minsterett når bare far har rett (WLB gjelder) - mor er ikke ufør', () => {
    const familiehendelsesdato = new Date('2022-08-02');

    beforeAll(() => {
        MockDate.set(new Date('2022-08-02T00:00:00.000Z'));
    });
    afterAll(() => {
        MockDate.reset();
    });
    it('Far skal ha 8 uker minsterett hvis ett barn og 100% dekningsgrad og WLB gjelder', () => {
        const antallUker = getkontoUtenAktivitetskravUker(
            1,
            morErIkkeUfør,
            familiehendelsesdato,
            Dekningsgrad.HUNDRE_PROSENT,
            bareFarHarRett
        );

        expect(antallUker).toEqual(8);
    });
    it('Far skal ha 8 uker minsterett hvis ett barn og 80% dekningsgrad og WLB gjelder', () => {
        const antallUker = getkontoUtenAktivitetskravUker(
            1,
            morErIkkeUfør,
            familiehendelsesdato,
            Dekningsgrad.ÅTTI_PROSENT,
            bareFarHarRett
        );

        expect(antallUker).toEqual(8);
    });
    it('Far skal ha 17 uker minsterett hvis to barn og 100% dekningsgrad', () => {
        const antallUker = getkontoUtenAktivitetskravUker(
            2,
            morErIkkeUfør,
            familiehendelsesdato,
            Dekningsgrad.HUNDRE_PROSENT,
            bareFarHarRett
        );

        expect(antallUker).toEqual(17);
    });
    it('Far skal ha 21 uker minsterett hvis to barn og 80% dekningsgrad', () => {
        const antallUker = getkontoUtenAktivitetskravUker(
            2,
            morErIkkeUfør,
            familiehendelsesdato,
            Dekningsgrad.ÅTTI_PROSENT,
            bareFarHarRett
        );

        expect(antallUker).toEqual(21);
    });
    it('Far skal ha 46 uker minsterett hvis tre barn og 100% dekningsgrad', () => {
        const antallUker = getkontoUtenAktivitetskravUker(
            3,
            morErIkkeUfør,
            familiehendelsesdato,
            Dekningsgrad.HUNDRE_PROSENT,
            bareFarHarRett
        );

        expect(antallUker).toEqual(46);
    });
    it('Far skal ha 56 uker minsterett hvis tre barn og 80% dekningsgrad', () => {
        const antallUker = getkontoUtenAktivitetskravUker(
            3,
            morErIkkeUfør,
            familiehendelsesdato,
            Dekningsgrad.ÅTTI_PROSENT,
            bareFarHarRett
        );

        expect(antallUker).toEqual(56);
    });
});

describe('Minsterett når bare far har rett  - mor er ufør', () => {
    const morErUfør = true;
    const familiehendelsesdato = new Date('2022-08-02');
    beforeAll(() => {
        MockDate.set(new Date('2022-08-02T00:00:00.000Z'));
    });
    afterAll(() => {
        MockDate.reset();
    });
    it('Far skal ha 15 uker minsterett hvis ett barn og 100% dekningsgrad og mor er ufør', () => {
        const antallUker = getkontoUtenAktivitetskravUker(
            1,
            morErUfør,
            familiehendelsesdato,
            Dekningsgrad.HUNDRE_PROSENT,
            bareFarHarRett
        );

        expect(antallUker).toEqual(15);
    });
    it('Far skal ha 15 uker minsterett hvis ett barn og 80% dekningsgrad og mor er ufør', () => {
        const antallUker = getkontoUtenAktivitetskravUker(
            1,
            morErUfør,
            familiehendelsesdato,
            Dekningsgrad.ÅTTI_PROSENT,
            bareFarHarRett
        );

        expect(antallUker).toEqual(15);
    });
    it('Far skal ha 17 uker minsterett hvis to barn og 100% dekningsgrad og mor er ufør', () => {
        const antallUker = getkontoUtenAktivitetskravUker(
            2,
            morErUfør,
            familiehendelsesdato,
            Dekningsgrad.HUNDRE_PROSENT,
            bareFarHarRett
        );

        expect(antallUker).toEqual(17);
    });
    it('Far skal ha 21 uker minsterett hvis to barn og 80% dekningsgrad  og mor er ufør', () => {
        const antallUker = getkontoUtenAktivitetskravUker(
            2,
            morErUfør,
            familiehendelsesdato,
            Dekningsgrad.ÅTTI_PROSENT,
            bareFarHarRett
        );

        expect(antallUker).toEqual(21);
    });
    it('Far skal ha 46 uker minsterett hvis tre barn og 100% dekningsgrad og mor er ufør', () => {
        const antallUker = getkontoUtenAktivitetskravUker(
            3,
            morErUfør,
            familiehendelsesdato,
            Dekningsgrad.HUNDRE_PROSENT,
            bareFarHarRett
        );

        expect(antallUker).toEqual(46);
    });
    it('Far skal ha 56 uker minsterett hvis tre barn og 100% dekningsgrad og mor er ufør', () => {
        const antallUker = getkontoUtenAktivitetskravUker(
            3,
            morErUfør,
            familiehendelsesdato,
            Dekningsgrad.ÅTTI_PROSENT,
            bareFarHarRett
        );

        expect(antallUker).toEqual(56);
    });
});

describe('MinsterettUtils (WLB gjelder ikke)', () => {
    const familiehendelsesdato = new Date('2022-08-01');

    beforeAll(() => {
        MockDate.set(new Date('2022-08-02T00:00:00.000Z'));
    });
    afterAll(() => {
        MockDate.reset();
    });
    it('Far skal ha 0 uker minsterett hvis ett barn og 100% dekningsgrad', () => {
        const antallUker = getkontoUtenAktivitetskravUker(
            1,
            morErIkkeUfør,
            familiehendelsesdato,
            Dekningsgrad.HUNDRE_PROSENT,
            bareFarHarRett
        );

        expect(antallUker).toEqual(0);
    });
    it('Far skal ha 15 uker minsterett hvis ett barn og mor er ufør', () => {
        const antallUker = getkontoUtenAktivitetskravUker(
            1,
            morErUfør,
            familiehendelsesdato,
            Dekningsgrad.ÅTTI_PROSENT,
            bareFarHarRett
        );

        expect(antallUker).toEqual(15);
    });
    it('Far skal ha 17 uker minsterett hvis to barn og 100% dekningsgrad', () => {
        const antallUker = getkontoUtenAktivitetskravUker(
            2,
            morErIkkeUfør,
            familiehendelsesdato,
            Dekningsgrad.HUNDRE_PROSENT,
            bareFarHarRett
        );

        expect(antallUker).toEqual(17);
    });
    it('Far skal ha 21 uker minsterett hvis to barn og 80% dekningsgrad', () => {
        const antallUker = getkontoUtenAktivitetskravUker(
            2,
            morErIkkeUfør,
            familiehendelsesdato,
            Dekningsgrad.ÅTTI_PROSENT,
            bareFarHarRett
        );

        expect(antallUker).toEqual(21);
    });
    it('Far skal ha 46 uker minsterett hvis tre barn og 100% dekningsgrad', () => {
        const antallUker = getkontoUtenAktivitetskravUker(
            3,
            morErIkkeUfør,
            familiehendelsesdato,
            Dekningsgrad.HUNDRE_PROSENT,
            bareFarHarRett
        );

        expect(antallUker).toEqual(46);
    });
    it('Far skal ha 56 uker minsterett hvis tre barn og 80% dekningsgrad', () => {
        const antallUker = getkontoUtenAktivitetskravUker(
            3,
            morErIkkeUfør,
            familiehendelsesdato,
            Dekningsgrad.ÅTTI_PROSENT,
            bareFarHarRett
        );

        expect(antallUker).toEqual(56);
    });
});

describe('Minsterett når begge har rett', () => {
    it('Far skal ha 0 uker minsterett hvis begge har rett', () => {
        const antallUker = getkontoUtenAktivitetskravUker(
            1,
            morErIkkeUfør,
            new Date('2022-08-02'),
            Dekningsgrad.HUNDRE_PROSENT,
            ikkeBareFarHarRett
        );

        expect(antallUker).toEqual(0);
    });
});
