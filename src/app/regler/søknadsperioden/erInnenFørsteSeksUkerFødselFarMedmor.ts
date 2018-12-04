import moment from 'moment';

import { Søkersituasjon } from '../../types/søknad/Søknad';
import { isValidTidsperiode } from '../../util/uttaksplan/Tidsperioden';
import { Uttaksdatoer } from '../../selectors/types';
import { Periode } from '../../types/uttaksplan/periodetyper';

export const erInnenFørsteSeksUkerFødselFarMedmor = (
    periode: Partial<Periode>,
    situasjon: Søkersituasjon,
    søkerErFarEllerMedmor: boolean,
    uttaksdatoer: Uttaksdatoer
): boolean => {
    if (
        situasjon === Søkersituasjon.ADOPSJON ||
        !søkerErFarEllerMedmor ||
        periode.tidsperiode === undefined ||
        isValidTidsperiode(periode.tidsperiode) === false
    ) {
        return false;
    }
    return moment(periode.tidsperiode.fom).isBefore(
        moment(uttaksdatoer.etterFødsel.førsteUttaksdagEtterSeksUker),
        'day'
    );
};
