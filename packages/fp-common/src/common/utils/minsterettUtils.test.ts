import MockDate from 'mockdate';
import {
    getBareFarHarRettFlerbarnsdagerUker as getBareFarHarRettFlerbarnsuker,
    getBareFarHarRettAntallUkerPåÅTaUtDagerUtenAktivitetskravFørWLB,
} from './minsterettUtils';
import { Dekningsgrad } from '../types';

const bareFarHarRett = true;
const ikkeBareFarHarRett = false;

describe('Flerbarnsuker når bare far har rett og når WLB gjelder', () => {
    MockDate.set(new Date('2022-08-02T00:00:00.000Z'));
    it('getBareFarHarRettFlerbarnsdagerUker skal returnere 0 flerbarnsuker hvis WLB gjelder siden de regnes ut som en del av minsterett i stedet.', () => {
        const antallUker = getBareFarHarRettFlerbarnsuker(
            1,
            new Date('2022-08-02'),
            Dekningsgrad.HUNDRE_PROSENT,
            bareFarHarRett,
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
            ikkeBareFarHarRett,
        );

        expect(antallUker).toEqual(0);
    });

    it('Skal ha 17 flerbarnsuker når 2 barn,  WLB ikke gjelder, bare far har rett, 100% dekning', () => {
        const antallUker = getBareFarHarRettFlerbarnsuker(
            2,
            new Date('2021-12-12'),
            Dekningsgrad.HUNDRE_PROSENT,
            bareFarHarRett,
        );

        expect(antallUker).toEqual(17);
    });
    it('Skal ha 21 flerbarnsuker når 2 barn, WLB ikke gjelder, bare far har rett, 80% dekning', () => {
        const antallUker = getBareFarHarRettFlerbarnsuker(
            2,
            new Date('2021-12-12'),
            Dekningsgrad.ÅTTI_PROSENT,
            bareFarHarRett,
        );

        expect(antallUker).toEqual(21);
    });
    it('Skal ha 46 flerbarnsuker når 3 barn, WLB ikke gjelder, bare far har rett, 100% dekning.', () => {
        const antallUker = getBareFarHarRettFlerbarnsuker(
            3,
            new Date('2021-12-12'),
            Dekningsgrad.HUNDRE_PROSENT,
            bareFarHarRett,
        );

        expect(antallUker).toEqual(46);
    });
    it('Skal ha 56 flerbarnsuker når 3 barn, WLB ikke gjelder, bare far har rett, 80% dekning.', () => {
        const antallUker = getBareFarHarRettFlerbarnsuker(
            3,
            new Date('2021-12-12'),
            Dekningsgrad.ÅTTI_PROSENT,
            bareFarHarRett,
        );

        expect(antallUker).toEqual(56);
    });
});

describe('getBareFarHarRettAntallUkerPåÅTaUtDagerUtenAktivitetskravFørWLB', () => {
    it('Skal returnere 46 uker hvis 1 barn og 100 % dekning', () => {
        const antallUker = getBareFarHarRettAntallUkerPåÅTaUtDagerUtenAktivitetskravFørWLB(
            1,
            new Date('2021-12-12'),
            Dekningsgrad.HUNDRE_PROSENT,
            bareFarHarRett,
        );

        expect(antallUker).toEqual(46);
    });
    it('Skal returnere 56 uker hvis 1 barn og 80 % dekning', () => {
        const antallUker = getBareFarHarRettAntallUkerPåÅTaUtDagerUtenAktivitetskravFørWLB(
            1,
            new Date('2021-12-12'),
            Dekningsgrad.ÅTTI_PROSENT,
            bareFarHarRett,
        );

        expect(antallUker).toEqual(56);
    });
    it('Skal returnere 63 uker hvis 2 barn og 100 % dekning', () => {
        const antallUker = getBareFarHarRettAntallUkerPåÅTaUtDagerUtenAktivitetskravFørWLB(
            2,
            new Date('2021-12-12'),
            Dekningsgrad.HUNDRE_PROSENT,
            bareFarHarRett,
        );

        expect(antallUker).toEqual(63);
    });
    it('Skal returnere 77 uker hvis 2 barn og 80 % dekning', () => {
        const antallUker = getBareFarHarRettAntallUkerPåÅTaUtDagerUtenAktivitetskravFørWLB(
            2,
            new Date('2021-12-12'),
            Dekningsgrad.ÅTTI_PROSENT,
            bareFarHarRett,
        );

        expect(antallUker).toEqual(77);
    });
    it('Skal returnere 92 uker hvis 3 barn og 100 % dekning', () => {
        const antallUker = getBareFarHarRettAntallUkerPåÅTaUtDagerUtenAktivitetskravFørWLB(
            3,
            new Date('2021-12-12'),
            Dekningsgrad.HUNDRE_PROSENT,
            bareFarHarRett,
        );

        expect(antallUker).toEqual(92);
    });
    it('Skal returnere 112 uker hvis 3 barn og 80 % dekning', () => {
        const antallUker = getBareFarHarRettAntallUkerPåÅTaUtDagerUtenAktivitetskravFørWLB(
            3,
            new Date('2021-12-12'),
            Dekningsgrad.ÅTTI_PROSENT,
            bareFarHarRett,
        );

        expect(antallUker).toEqual(112);
    });
});
