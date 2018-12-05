import moment from 'moment';

import { Søkersituasjon } from '../../types/søknad/Søknad';
import { isValidTidsperiode } from '../../util/uttaksplan/Tidsperioden';
import { Tidsperiode } from 'common/types';

export const erInnenFørsteSeksUkerFødselFarMedmor = (
    tidsperiode: Partial<Tidsperiode>,
    situasjon: Søkersituasjon,
    søkerErFarEllerMedmor: boolean,
    førsteUttaksdagEtterSeksUker: Date
): boolean => {
    if (
        situasjon !== Søkersituasjon.FØDSEL ||
        !søkerErFarEllerMedmor ||
        tidsperiode === undefined ||
        isValidTidsperiode(tidsperiode) === false
    ) {
        return false;
    }
    return moment(tidsperiode.fom).isBefore(moment(førsteUttaksdagEtterSeksUker), 'day');
};
