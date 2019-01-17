import { Utsettelsesperiode, Periodetype, UtsettelseÅrsakType } from '../../../types/uttaksplan/periodetyper';
import { Forelder } from 'common/types';
import { splittPeriodeMedHelligdager, getFriperioderITidsperiode } from '../builder/UttaksplanBuilder';
import { Tidsperiode } from 'nav-datovelger/src/datovelger/types';

describe('UttaksplanBuilder', () => {
    it('should split jul 2018 med periodehull correctly', () => {
        const periode: Utsettelsesperiode = {
            id: 'sdf',
            type: Periodetype.Utsettelse,
            årsak: UtsettelseÅrsakType.Ferie,
            tidsperiode: {
                fom: new Date(2018, 11, 20),
                tom: new Date(2018, 11, 28)
            },
            forelder: Forelder.MOR,
            erArbeidstaker: false
        };

        const perioder = splittPeriodeMedHelligdager(periode);
        expect(perioder.length).toBe(3);
    });
    it('should split christmas and new years eve 2018/2019 med periodehull correctly', () => {
        const periode: Utsettelsesperiode = {
            id: 'sdf',
            type: Periodetype.Utsettelse,
            årsak: UtsettelseÅrsakType.Ferie,
            tidsperiode: {
                fom: new Date(2018, 11, 20),
                tom: new Date(2019, 0, 5)
            },
            forelder: Forelder.MOR,
            erArbeidstaker: false
        };

        const perioder = splittPeriodeMedHelligdager(periode);
        expect(perioder.length).toBe(5);
    });
    it('should find 2 friperioder during christmas and new year', () => {
        const tidsperiode: Tidsperiode = {
            fom: new Date(2018, 11, 20),
            tom: new Date(2019, 0, 3)
        };
        const friperioder = getFriperioderITidsperiode(tidsperiode);
        expect(friperioder.length).toBe(2);
    });
    it('should find 0 friperioder in february', () => {
        const tidsperiode: Tidsperiode = {
            fom: new Date(2019, 1, 1),
            tom: new Date(2019, 1, 27)
        };
        const friperioder = getFriperioderITidsperiode(tidsperiode);
        expect(friperioder.length).toBe(0);
    });
    it('should find 8 friperioder in 2018', () => {
        const tidsperiode: Tidsperiode = {
            fom: new Date(2018, 0, 1),
            tom: new Date(2018, 11, 31)
        };
        const friperioder = getFriperioderITidsperiode(tidsperiode);
        expect(friperioder.length).toBe(8);
    });
    it('should find 1. of january 2018', () => {
        const tidsperiode: Tidsperiode = {
            fom: new Date(2017, 11, 31),
            tom: new Date(2018, 0, 2)
        };
        const friperioder = getFriperioderITidsperiode(tidsperiode);
        expect(friperioder.length).toBe(1);
    });
    it('should not find 1. of january 2017 because it is a sunday (not uttaksdag)', () => {
        const tidsperiode: Tidsperiode = {
            fom: new Date(2016, 11, 31),
            tom: new Date(2017, 0, 2)
        };
        const friperioder = getFriperioderITidsperiode(tidsperiode);
        expect(friperioder.length).toBe(0);
    });
});
