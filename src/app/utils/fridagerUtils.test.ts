import dayjs from 'dayjs';
import MockDate from 'mockdate';
import { getOffentligeFridager, getOffentligeFridagerIMåned, erFridag } from './fridagerUtils';

describe('fridagerUtils', () => {
    beforeAll(() => {
        MockDate.set('2021-07-08');
    });

    afterAll(() => {
        MockDate.reset();
    });

    //TODO Kvifor må ein legge på og trekke frå ein dag for å få same resultat som ein månad?
    it('skal finne antall offentlige fridager i en tidsperiode', () => {
        const tidsperiode = {
            fom: dayjs('2021-05-02').toDate(),
            tom: dayjs('2021-05-30').toDate(),
        };
        const kalkFridager = getOffentligeFridager(tidsperiode);
        expect(kalkFridager.length).toBe(4);
    });

    it('skal finne antall offentlige fridager i en måned', () => {
        const førsteDagIMai = dayjs('2021-05-01').toDate();
        const kalkFridager = getOffentligeFridagerIMåned(førsteDagIMai);
        expect(kalkFridager.length).toBe(4);
    });

    it('skal finne ut at dato er en fridag', () => {
        expect(erFridag(dayjs('2021-05-01').toDate())).toBe('Arbeidernes dag');
    });

    it('skal finne ut at dato ikke er en fridag', () => {
        expect(erFridag(dayjs('2021-05-02').toDate())).toBeUndefined();
    });
});
