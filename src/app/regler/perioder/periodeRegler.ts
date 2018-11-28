import { StønadskontoType, Periode } from '../../types/uttaksplan/periodetyper';
import { Søknadsinfo } from '../../selectors/søknadsinfoSelector';
import { erUttakEgenKvote } from '../../util/uttaksplan/uttakUtils';
import { erUttakInnenFørsteSeksUkerFødselFarMedmor } from '../perioder/erUttakInnenFørsteSeksUkerFødselFarMedmor';
import { Tidsperiode } from 'nav-datovelger/src/datovelger/types';
import { RecursivePartial } from '../../types/Partial';
import { erUttakFørFødsel } from '../perioder/erUttakFørFødsel';

export interface PeriodeRegler {
    erUttakFørFødsel: (periode: Periode) => boolean;
    erUttakEgenKvote: (konto: StønadskontoType | undefined) => boolean;
    erUttakInnenFørsteSeksUkerFødselFarMedmor: (
        tidsperiode: Tidsperiode | Partial<Tidsperiode> | RecursivePartial<Tidsperiode> | undefined
    ) => boolean;
}

export const getPeriodeRegler = (info: Søknadsinfo): PeriodeRegler => ({
    erUttakFørFødsel: (periode: Periode) => erUttakFørFødsel(periode, info.søknaden.familiehendelsesdato),
    erUttakEgenKvote: (konto: StønadskontoType | undefined) => erUttakEgenKvote(konto, info.søker.erFarEllerMedmor),
    erUttakInnenFørsteSeksUkerFødselFarMedmor: (
        tidsperiode: Tidsperiode | Partial<Tidsperiode> | RecursivePartial<Tidsperiode> | undefined
    ) =>
        erUttakInnenFørsteSeksUkerFødselFarMedmor(
            tidsperiode as Partial<Tidsperiode>,
            info.søknaden.situasjon,
            info.søker.erFarEllerMedmor,
            info.uttaksdatoer
        )
});

export default getPeriodeRegler;
