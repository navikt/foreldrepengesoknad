import { dateStringToDateObjectMapper } from '../parser';

describe('parser', () => {
    it('skal ignorere string som ikke er på formatet YYYY-MM-DD eller YYYY-MM-DDTHH:mm:ss.SSS', () => {
        expect(dateStringToDateObjectMapper('19700101')).toEqual('19700101');
    });

    it('skal gjøre som string som er på formatet YYYY-MM-DD om til date objekt', () => {
        expect(dateStringToDateObjectMapper('1970-01-01')).toEqual(new Date('1970-01-01'));
    });

    it('skal gjøre som string som er på formatet YYYY-MM-DDTHH:mm:ss.SSSZ om til date objekt', () => {
        expect(dateStringToDateObjectMapper('2019-10-11T00:00:00.000Z')).toEqual(new Date('2019-10-11T00:00:00.000Z'));
    });
});
