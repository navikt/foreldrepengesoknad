import { Periode, Periodetype, isUttaksperiode } from '../../types/uttaksplan/periodetyper';
import { Søknadsinfo } from '../../selectors/søknadsinfoSelector';
import { erUttakEgenKvote } from '../../util/uttaksplan/uttakUtils';
import { erInnenFørsteSeksUkerFødselFarMedmor } from './erInnenFørsteSeksUkerFødselFarMedmor';
import { erUttakFørFødsel } from './erUttakFørFødsel';
import { harAktivitetskrav } from './harAktivitetskrav';

export const Søknadsperioden = (søknadsinfo: Søknadsinfo, periode: Periode) => ({
    erUttaksperiode: () => periode.type === Periodetype.Uttak,
    erOverføringsperiode: () => periode.type === Periodetype.Overføring,
    erUttakFørFødsel: () => erUttakFørFødsel(periode, søknadsinfo.søknaden.familiehendelsesdato),
    erUttakEgenKvote: () =>
        isUttaksperiode(periode) && erUttakEgenKvote(periode.konto, søknadsinfo.søker.erFarEllerMedmor),
    erUttakAnnenForeldersKvote: () => Søknadsperioden(søknadsinfo, periode).erUttakEgenKvote() === false,
    erInnenFørsteSeksUkerFødselFarMedmor: () =>
        erInnenFørsteSeksUkerFødselFarMedmor(
            periode,
            søknadsinfo.søknaden.situasjon,
            søknadsinfo.søker.erFarEllerMedmor,
            søknadsinfo.uttaksdatoer
        ),
    harAktivitetskrav: () => isUttaksperiode(periode) && harAktivitetskrav(periode.konto)
});

export default Søknadsperioden;
