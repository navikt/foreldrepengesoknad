import moment from 'moment';
import { normaliserDato } from 'common/util/datoUtils';
import { Uttaksdagen } from 'uttaksplan/utils/Uttaksdagen';

const fredagForrigeUke = moment.utc('2018-08-24').toDate();
const mandag: Date = moment.utc('2018-08-27').toDate();
const tirsdag1 = normaliserDato(new Date(2018, 7, 28));
const tirsdag = moment.utc('2018-08-28').toDate();

describe('Uttaksdagen', () => {
    describe('forrige', () => {
        it('mandags forrige dag er fredag ', () => {
            expect(Uttaksdagen(mandag).forrige()).toEqual(fredagForrigeUke);
        });
        it('tirsdags forrige dag er mandag ', () => {
            console.log(tirsdag);
            console.log(mandag);
            expect(Uttaksdagen(tirsdag).forrige()).toEqual(mandag);
        });
    });
});
