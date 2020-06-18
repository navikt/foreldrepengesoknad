import moment from 'moment';
import { Periode } from '../../../types/uttaksplan/periodetyper';
import { Periodene } from '../../uttaksplan/Periodene';
import { today } from '../values';

export const førsteUttakErInnenforKommendeSeksUker = (perioder: Periode[]): boolean => {
    const førsteUttaksdag = Periodene(perioder).getFørsteUttaksdag();
    const førsteUttaksDagErFør20190101 = moment(førsteUttaksdag).isSameOrBefore(new Date(2019, 0, 1));
    if (førsteUttaksdag) {
        const førsteMuligeSøknadsdag = getFørsteMuligeSøknadsdagGittUttak(førsteUttaksdag);
        return (
            førsteUttaksDagErFør20190101 ||
            (moment(førsteMuligeSøknadsdag).isSameOrBefore(today, 'day') && !førsteUttaksDagErFør20190101)
        );
    }
    return true;
};

export const getFørsteMuligeSøknadsdagGittUttak = (førsteUttak: Date): Date => {
    return moment(førsteUttak).subtract(6, 'weeks').toDate();
};
