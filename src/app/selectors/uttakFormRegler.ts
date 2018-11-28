import { StønadskontoType, Periode } from '../types/uttaksplan/periodetyper';
import { Søknadsinfo } from './s\u00F8knadsinfoSelector';
import { erUttakEgenKvote } from '../util/uttaksplan/uttakUtils';
import { erUttakInnenFørsteSeksUkerFødselFarMedmor } from '../regler/perioder/erUttakInnenF\u00F8rsteSeksUkerF\u00F8dselFarMedmor';
import { Tidsperiode } from 'nav-datovelger/src/datovelger/types';
import { RecursivePartial } from '../types/Partial';
import { erUttakFørFødsel } from './Perioderegler';

export interface UttakFormRegler {
    erUttakFørFødsel: (periode: Periode) => boolean;
    erUttakEgenKvote: (konto: StønadskontoType | undefined) => boolean;
    erUttakInnenFørsteSeksUkerFødselFarMedmor: (
        tidsperiode: Tidsperiode | Partial<Tidsperiode> | RecursivePartial<Tidsperiode> | undefined
    ) => boolean;
}

export const getUttakFormRegler = (info: Søknadsinfo): UttakFormRegler => ({
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

export default getUttakFormRegler;
