import { StønadskontoType, Periode } from '../../types/uttaksplan/periodetyper';
import { Søknadsinfo } from '../../selectors/søknadsinfoSelector';
import { erUttakEgenKvote } from '../../util/uttaksplan/uttakUtils';
import { erUttakInnenFørsteSeksUkerFødselFarMedmor } from '../perioder/erUttakInnenFørsteSeksUkerFødselFarMedmor';
import { Tidsperiode } from 'nav-datovelger/src/datovelger/types';
import { erUttakFørFødsel } from '../perioder/erUttakFørFødsel';

export const PeriodeRegler = (info: Søknadsinfo) => ({
    erUttakFørFødsel: (periode: Periode) => erUttakFørFødsel(periode, info.søknaden.familiehendelsesdato),
    erUttakEgenKvote: (konto: StønadskontoType | undefined) => erUttakEgenKvote(konto, info.søker.erFarEllerMedmor),
    erUttakInnenFørsteSeksUkerFødselFarMedmor: (periode: Periode) =>
        erUttakInnenFørsteSeksUkerFødselFarMedmor(
            periode.tidsperiode as Partial<Tidsperiode>,
            info.søknaden.situasjon,
            info.søker.erFarEllerMedmor,
            info.uttaksdatoer
        )
});

export default PeriodeRegler;
