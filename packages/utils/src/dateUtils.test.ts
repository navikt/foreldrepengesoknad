import dayjs from 'dayjs';

import { dateIsSameOrAfter, dateIsSameOrBefore } from './dateUtils';
import { erFridag } from './fridagerUtils';

describe('dateUtils', () => {
    it('skal returnere true når dato er før annen dato', () => {
        const erDatoFørAnnenDato = dateIsSameOrBefore(new Date('2021-01-01'), new Date('2021-01-02'));
        expect(erDatoFørAnnenDato).toBe(true);
    });

    it('skal returnere true når dato er etter annen dato', () => {
        const erDatoEtterAnnenDato = dateIsSameOrAfter(new Date('2021-01-02'), new Date('2021-01-01'));
        expect(erDatoEtterAnnenDato).toBe(true);
    });

    it('skal finne ut at dato er en fridag', () => {
        expect(erFridag(dayjs('2021-05-01').toDate())).toBe('Arbeidernes dag');
    });

    it('skal finne ut at dato ikke er en fridag', () => {
        expect(erFridag(dayjs('2021-05-02').toDate())).toBeUndefined();
    });
});
