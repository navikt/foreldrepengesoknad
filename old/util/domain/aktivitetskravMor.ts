import { OmAnnenForelder } from 'app/selectors/types';
import moment from 'moment';

const aktivitetskravMorUtil = {
    skalBesvaresVedUtsettelse(søkerErFarEllerMedmor: boolean, annenForelder: OmAnnenForelder): boolean {
        const reglerFørFørsteOkt2021 = moment(new Date()).isBefore(new Date('2021-10-01'));

        return !søkerErFarEllerMedmor ||
            (annenForelder.harRett === false && annenForelder.erUfør === true && !reglerFørFørsteOkt2021)
            ? false
            : annenForelder.harRett === false;
    },
};

export default aktivitetskravMorUtil;
