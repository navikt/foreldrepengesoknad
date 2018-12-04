import { Periode, Periodetype, isUttaksperiode, StønadskontoType } from '../../types/uttaksplan/periodetyper';
import { erUttakEgenKvote } from '../../util/uttaksplan/uttakUtils';
import { erInnenFørsteSeksUkerFødselFarMedmor } from './erInnenFørsteSeksUkerFødselFarMedmor';
import { erUttakFørFødsel } from './erUttakFørFødsel';
import { harAktivitetskrav } from './harAktivitetskrav';
import { isValidTidsperiode } from '../../util/uttaksplan/Tidsperioden';
import { Søknadsinfo } from '../../selectors/types';

export const Søknadsperioden = (søknadsinfo: Søknadsinfo, periode: Periode) => ({
    erUttaksperiode: () => periode.type === Periodetype.Uttak,
    erOverføringsperiode: () => periode.type === Periodetype.Overføring,
    erUttakFørFødsel: () => erUttakFørFødsel(periode, søknadsinfo.søknaden.familiehendelsesdato),
    erUttakEgenKvote: () =>
        isUttaksperiode(periode) && erUttakEgenKvote(periode.konto, søknadsinfo.søker.erFarEllerMedmor),
    erUttakAnnenForeldersKvote: () => Søknadsperioden(søknadsinfo, periode).erUttakEgenKvote() === false,
    erUttakFedrekvote: () => isUttaksperiode(periode) && periode.konto === StønadskontoType.Fedrekvote,
    erInnenFørsteSeksUkerFødselFarMedmor: () =>
        erInnenFørsteSeksUkerFødselFarMedmor(
            periode,
            søknadsinfo.søknaden.situasjon,
            søknadsinfo.søker.erFarEllerMedmor,
            søknadsinfo.uttaksdatoer
        ),
    harAktivitetskrav: () => isUttaksperiode(periode) && harAktivitetskrav(periode.konto),
    harGyldigTidsperiode: () => isValidTidsperiode(periode.tidsperiode)
});

export default Søknadsperioden;
