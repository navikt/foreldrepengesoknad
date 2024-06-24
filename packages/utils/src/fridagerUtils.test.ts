import dayjs from 'dayjs';

import { getOffentligeFridager } from './fridagerUtils';

describe('fridagerUtils', () => {
    it('skal finne antall offentlige fridager i en tidsperiode', () => {
        const tidsperiode = {
            fom: dayjs('2021-05-02').toDate(),
            tom: dayjs('2021-05-30').toDate(),
        };
        const kalkFridager = getOffentligeFridager(tidsperiode);
        expect(kalkFridager.length).toBe(4);
    });
});
