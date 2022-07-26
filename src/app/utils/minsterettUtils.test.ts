import { Dekningsgrad } from 'app/types/Dekningsgrad';
import MockDate from 'mockdate';
import {
    getBareFarHarRettFlerbarnsdagerUker as getBareFarHarRettFlerbarnsuker,
    getBareFarHarRettKontoUtenAktivitetskravUker,
} from './minsterettUtils';

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
    it('Far skal ha 8 uker minsterett hvis ett barn og 100% dekningsgrad og WLB gjelder og mor er ikke ufør', () => {
        const antallUker = getBareFarHarRettKontoUtenAktivitetskravUker(
            1,
            morErIkkeUfør,
            familiehendelsesdato,
            Dekningsgrad.HUNDRE_PROSENT,
            bareFarHarRett
        );

        expect(antallUker).toEqual(8);
    });
    it('Far skal ha 8 uker minsterett hvis ett barn og 80% dekningsgrad og WLB gjelder og mor er ikke ufør', () => {
        const antallUker = getBareFarHarRettKontoUtenAktivitetskravUker(
            1,
            morErIkkeUfør,
            familiehendelsesdato,
            Dekningsgrad.ÅTTI_PROSENT,
            bareFarHarRett
        );

        expect(antallUker).toEqual(8);
    });
    it('Far skal ha 17 uker minsterett hvis to barn og 100% dekningsgrad og mor er ikke ufør', () => {
        const antallUker = getBareFarHarRettKontoUtenAktivitetskravUker(
            2,
            morErIkkeUfør,
            familiehendelsesdato,
            Dekningsgrad.HUNDRE_PROSENT,
            bareFarHarRett
        );

        expect(antallUker).toEqual(17);
    });
    it('Far skal ha 21 uker minsterett hvis to barn og 80% dekningsgrad og mor er ikke ufør', () => {
        const antallUker = getBareFarHarRettKontoUtenAktivitetskravUker(
            2,
            morErIkkeUfør,
            familiehendelsesdato,
            Dekningsgrad.ÅTTI_PROSENT,
            bareFarHarRett
        );

        expect(antallUker).toEqual(21);
    });
    it('Far skal ha 46 uker minsterett hvis tre barn og 100% dekningsgrad og mor er ikke ufør', () => {
        const antallUker = getBareFarHarRettKontoUtenAktivitetskravUker(
            3,
            morErIkkeUfør,
            familiehendelsesdato,
            Dekningsgrad.HUNDRE_PROSENT,
            bareFarHarRett
        );

        expect(antallUker).toEqual(46);
    });
    it('Far skal ha 56 uker minsterett hvis tre barn og 80% dekningsgrad og mor er ikke ufør', () => {
        const antallUker = getBareFarHarRettKontoUtenAktivitetskravUker(
            3,
            morErIkkeUfør,
            familiehendelsesdato,
            Dekningsgrad.ÅTTI_PROSENT,
            bareFarHarRett
        );

        expect(antallUker).toEqual(56);
    });
});

describe('Minsterett når bare far har rett (WLB gjelder) - mor er ufør', () => {
    const morErUfør = true;
    const familiehendelsesdato = new Date('2022-08-02');
    beforeAll(() => {
        MockDate.set(new Date('2022-08-02T00:00:00.000Z'));
    });
    afterAll(() => {
        MockDate.reset();
    });
    it('Far skal ha 15 uker minsterett hvis ett barn og 100% dekningsgrad og mor er ufør', () => {
        const antallUker = getBareFarHarRettKontoUtenAktivitetskravUker(
            1,
            morErUfør,
            familiehendelsesdato,
            Dekningsgrad.HUNDRE_PROSENT,
            bareFarHarRett
        );

        expect(antallUker).toEqual(15);
    });
    it('Far skal ha 19 uker minsterett hvis ett barn og 80% dekningsgrad og mor er ufør', () => {
        const antallUker = getBareFarHarRettKontoUtenAktivitetskravUker(
            1,
            morErUfør,
            familiehendelsesdato,
            Dekningsgrad.ÅTTI_PROSENT,
            bareFarHarRett
        );

        expect(antallUker).toEqual(19);
    });
    it('Far skal ha 32 uker minsterett hvis to barn og 100% dekningsgrad og mor er ufør', () => {
        const antallUker = getBareFarHarRettKontoUtenAktivitetskravUker(
            2,
            morErUfør,
            familiehendelsesdato,
            Dekningsgrad.HUNDRE_PROSENT,
            bareFarHarRett
        );

        expect(antallUker).toEqual(32);
    });
    it('Far skal ha 40 uker minsterett hvis to barn og 80% dekningsgrad  og mor er ufør', () => {
        const antallUker = getBareFarHarRettKontoUtenAktivitetskravUker(
            2,
            morErUfør,
            familiehendelsesdato,
            Dekningsgrad.ÅTTI_PROSENT,
            bareFarHarRett
        );

        expect(antallUker).toEqual(40);
    });
    it('Far skal ha 61 uker minsterett hvis tre barn og 100% dekningsgrad og mor er ufør', () => {
        const antallUker = getBareFarHarRettKontoUtenAktivitetskravUker(
            3,
            morErUfør,
            familiehendelsesdato,
            Dekningsgrad.HUNDRE_PROSENT,
            bareFarHarRett
        );

        expect(antallUker).toEqual(61);
    });
    it('Far skal ha 75 uker minsterett hvis tre barn og 100% dekningsgrad og mor er ufør', () => {
        const antallUker = getBareFarHarRettKontoUtenAktivitetskravUker(
            3,
            morErUfør,
            familiehendelsesdato,
            Dekningsgrad.ÅTTI_PROSENT,
            bareFarHarRett
        );

        expect(antallUker).toEqual(75);
    });
});

describe('Minsterett når bare far har rett (WLB gjelder ikke)', () => {
    const familiehendelsesdato = new Date('2022-08-01');

    beforeAll(() => {
        MockDate.set(new Date('2022-08-01T00:00:00.000Z'));
    });
    afterAll(() => {
        MockDate.reset();
    });
    it('Far skal ha 0 uker minsterett hvis ett barn og 100% dekningsgrad og mor ikke er ufør', () => {
        const antallUker = getBareFarHarRettKontoUtenAktivitetskravUker(
            1,
            morErIkkeUfør,
            familiehendelsesdato,
            Dekningsgrad.HUNDRE_PROSENT,
            bareFarHarRett
        );

        expect(antallUker).toEqual(0);
    });
    it('Far skal ha 15 uker minsterett hvis ett barn og 100% dekningsgrad og mor er ufør', () => {
        const antallUker = getBareFarHarRettKontoUtenAktivitetskravUker(
            1,
            morErUfør,
            familiehendelsesdato,
            Dekningsgrad.HUNDRE_PROSENT,
            bareFarHarRett
        );

        expect(antallUker).toEqual(15);
    });
    it('Far skal ha 19 uker minsterett hvis ett barn og 80% dekningsgrad og mor er ufør', () => {
        const antallUker = getBareFarHarRettKontoUtenAktivitetskravUker(
            1,
            morErUfør,
            familiehendelsesdato,
            Dekningsgrad.ÅTTI_PROSENT,
            bareFarHarRett
        );

        expect(antallUker).toEqual(19);
    });
    it('getBareFarHarRettKontoUtenAktivitetskravUker returnerer 0 hvis WLB ikke gjelder og to barn og mor ikke er ufør ', () => {
        const antallUker = getBareFarHarRettKontoUtenAktivitetskravUker(
            2,
            morErIkkeUfør,
            familiehendelsesdato,
            Dekningsgrad.HUNDRE_PROSENT,
            bareFarHarRett
        );

        expect(antallUker).toEqual(0);
    });
    it('getBareFarHarRettKontoUtenAktivitetskravUker returnerer 0 hvis WLB ikke gjelder og tre barn og mor ikke er ufør ', () => {
        const antallUker = getBareFarHarRettKontoUtenAktivitetskravUker(
            3,
            morErIkkeUfør,
            familiehendelsesdato,
            Dekningsgrad.HUNDRE_PROSENT,
            bareFarHarRett
        );

        expect(antallUker).toEqual(0);
    });
});

describe('Minsterett når begge har rett', () => {
    it('getBareFarHarRettKontoUtenAktivitetskravUker skal returnere 0 uker hvis begge har rett', () => {
        const antallUker = getBareFarHarRettKontoUtenAktivitetskravUker(
            1,
            morErIkkeUfør,
            new Date('2022-08-02'),
            Dekningsgrad.HUNDRE_PROSENT,
            ikkeBareFarHarRett
        );

        expect(antallUker).toEqual(0);
    });
});

describe('Flerbarnsuker når bare far har rett og når WLB gjelder', () => {
    MockDate.set(new Date('2022-08-02T00:00:00.000Z'));
    it('getBareFarHarRettFlerbarnsdagerUker skal returnere 0 flerbarnsuker hvis WLB gjelder siden de regnes ut som en del av minsterett i stedet.', () => {
        const antallUker = getBareFarHarRettFlerbarnsuker(
            1,
            new Date('2022-08-02'),
            Dekningsgrad.HUNDRE_PROSENT,
            bareFarHarRett
        );

        expect(antallUker).toEqual(0);
    });
    MockDate.reset();
});

describe('Flerbarnsuker når bare far har rett og når WLB ikke gjelder', () => {
    beforeAll(() => {
        MockDate.set(new Date('2022-08-01T00:00:00.000Z'));
    });
    afterAll(() => {
        MockDate.reset();
    });
    it('getBareFarHarRettFlerbarnsdagerUker skal returnere 0 flerbarnsuker WLB ikke gjelder men begge har rett.', () => {
        const antallUker = getBareFarHarRettFlerbarnsuker(
            2,
            new Date('2021-12-12'),
            Dekningsgrad.HUNDRE_PROSENT,
            ikkeBareFarHarRett
        );

        expect(antallUker).toEqual(0);
    });

    it('Skal ha 17 flerbarnsuker når 2 barn,  WLB ikke gjelder, bare far har rett, 100% dekning', () => {
        const antallUker = getBareFarHarRettFlerbarnsuker(
            2,
            new Date('2021-12-12'),
            Dekningsgrad.HUNDRE_PROSENT,
            bareFarHarRett
        );

        expect(antallUker).toEqual(17);
    });
    it('Skal ha 21 flerbarnsuker når 2 barn, WLB ikke gjelder, bare far har rett, 80% dekning', () => {
        const antallUker = getBareFarHarRettFlerbarnsuker(
            2,
            new Date('2021-12-12'),
            Dekningsgrad.ÅTTI_PROSENT,
            bareFarHarRett
        );

        expect(antallUker).toEqual(21);
    });
    it('Skal ha 46 flerbarnsuker når 3 barn, WLB ikke gjelder, bare far har rett, 100% dekning.', () => {
        const antallUker = getBareFarHarRettFlerbarnsuker(
            3,
            new Date('2021-12-12'),
            Dekningsgrad.HUNDRE_PROSENT,
            bareFarHarRett
        );

        expect(antallUker).toEqual(46);
    });
    it('Skal ha 56 flerbarnsuker når 3 barn, WLB ikke gjelder, bare far har rett, 80% dekning.', () => {
        const antallUker = getBareFarHarRettFlerbarnsuker(
            3,
            new Date('2021-12-12'),
            Dekningsgrad.ÅTTI_PROSENT,
            bareFarHarRett
        );

        expect(antallUker).toEqual(56);
    });
});
