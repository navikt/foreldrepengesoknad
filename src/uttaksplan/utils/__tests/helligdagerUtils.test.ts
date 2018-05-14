/* tslint:disable */
import { getOffentligeFridager } from '../fridagerUtils';

describe('fridagerUtils', () => {
    it('henter ut første nyttårsdag', () => {
        const fridager = getOffentligeFridager({
            startdato: new Date(2018, 0, 1),
            sluttdato: new Date(2018, 0, 1)
        });
        expect(fridager.length).toBe(1);
        expect(fridager[0].name).toBe('Første nyttårsdag');
    });
    it('henter ut alle fridager i 2018', () => {
        const fridager = getOffentligeFridager({
            startdato: new Date(2018, 0, 1),
            sluttdato: new Date(2018, 11, 31)
        });
        expect(fridager.length).toBe(12);
    });
    it('henter ut alle fridager i 2018-2021', () => {
        const fridager = getOffentligeFridager({
            startdato: new Date(2018, 0, 1),
            sluttdato: new Date(2021, 11, 31)
        });
        expect(fridager.length).toBe(48);
    });
});
