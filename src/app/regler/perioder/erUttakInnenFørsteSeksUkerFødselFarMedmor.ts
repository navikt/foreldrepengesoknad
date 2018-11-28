import moment from 'moment';

import { Søkersituasjon } from '../../types/s\u00F8knad/S\u00F8knad';
import { isValidTidsperiode } from '../../util/uttaksplan/Tidsperioden';
import { Tidsperiode } from 'common/types';
import { Uttaksdatoer } from '../../selectors/types';

export const erUttakInnenFørsteSeksUkerFødselFarMedmor = (
    tidsperiode: Partial<Tidsperiode> | undefined,
    situasjon: Søkersituasjon,
    søkerErFarEllerMedmor: boolean,
    uttaksdatoer: Uttaksdatoer
): boolean => {
    if (
        situasjon === Søkersituasjon.ADOPSJON ||
        !søkerErFarEllerMedmor ||
        tidsperiode === undefined ||
        isValidTidsperiode(tidsperiode) === false
    ) {
        return false;
    }
    return moment(tidsperiode.fom).isBefore(moment(uttaksdatoer.etterFødsel.førsteUttaksdagEtterSeksUker), 'day');
};
