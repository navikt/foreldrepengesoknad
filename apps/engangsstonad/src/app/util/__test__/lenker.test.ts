import Axios from 'axios';
import { lenker } from '../lenker';

const testLenke = (href: string): Promise<any> => {
    return new Promise((resolve, reject) =>
        Axios.get(href)
            .then((req) => resolve(req.status))
            .catch(() => reject(new Error('Kunne ikke hente: ' + href)))
    );
};

describe('eksterne lenker', () => {
    xit('alle lenker skal returnere 200', () => {
        return Promise.all(Object.values(lenker).map(testLenke)).then((results) => {
            results.forEach((result) => expect(result).toEqual(200));
        });
    });
});
