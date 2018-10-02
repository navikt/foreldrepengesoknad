import { getVariantFromPeriode } from '../../../components/utsettelse-form/UtsettelseForm';
import { validerUtsettelseForm } from './utsettelseForm';
import { erFarEllerMedmor } from '../../domain/personUtil';
import { getVelgbareStønadskontotyper } from '../../uttaksplan/st\u00F8nadskontoer';
import { validerUttakForm } from './uttakForm';
import { Søker } from '../../../types/s\u00F8knad/S\u00F8ker';
import { TilgjengeligStønadskonto, Periode, Periodetype } from '../../../types/uttaksplan/periodetyper';
import AnnenForelder from '../../../types/s\u00F8knad/AnnenForelder';

export const validerPeriodeForm = (
    periode: Periode,
    søker: Søker,
    annenForelder: AnnenForelder,
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[]
) => {
    if (periode.type === Periodetype.Overføring || periode.type === Periodetype.Uttak) {
        return validerUttakForm({
            periode,
            velgbareStønadskontotyper: getVelgbareStønadskontotyper(tilgjengeligeStønadskontoer),
            kanEndreStøndskonto: false,
            annenForelderHarRett: annenForelder.harRettPåForeldrepenger,
            søkerErAleneOmOmsorg: søker.erAleneOmOmsorg,
            søkerErFarEllerMedmor: erFarEllerMedmor(søker.rolle)
        });
    }
    return validerUtsettelseForm({
        periode,
        variant: getVariantFromPeriode(periode),
        søkerErAleneOmOmsorg: søker.erAleneOmOmsorg,
        søkerErFarEllerMedmor: erFarEllerMedmor(søker.rolle)
    });
};
