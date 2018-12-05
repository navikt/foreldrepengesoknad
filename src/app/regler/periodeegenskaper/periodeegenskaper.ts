import { Periode, Periodetype, isUttaksperiode, StønadskontoType } from '../../types/uttaksplan/periodetyper';
import { erUttakEgenKvote } from '../../util/uttaksplan/uttakUtils';
import { erInnenFørsteSeksUkerFødselFarMedmor } from './erInnenFørsteSeksUkerFødselFarMedmor';
import { erUttakFørFødsel } from './erUttakFørFødsel';
import { harAktivitetskrav } from './harAktivitetskrav';
import { isValidTidsperiode } from '../../util/uttaksplan/Tidsperioden';
import { Søknadsinfo } from '../../selectors/types';

export interface Periodeegenskaper {
    erUttaksperiode: () => boolean;
    erOverføringsperiode: () => boolean;
    erUttakFørFødsel: () => boolean;
    erUttakEtterFødsel: () => boolean;
    erUttakEgenKvote: () => boolean;
    erUttakAnnenForeldersKvote: () => boolean;
    erUttakFedrekvote: () => boolean;
    erInnenFørsteSeksUkerFødselFarMedmor: () => boolean;
    harAktivitetskrav: () => boolean;
    harGyldigTidsperiode: () => boolean;
}

export const getPeriodeegenskaper = (søknadsinfo: Søknadsinfo, periode: Periode): Periodeegenskaper => ({
    erUttaksperiode: () => periode.type === Periodetype.Uttak,
    erOverføringsperiode: () => periode.type === Periodetype.Overføring,
    erUttakFørFødsel: () => erUttakFørFødsel(periode, søknadsinfo.søknaden.familiehendelsesdato),
    erUttakEtterFødsel: () => getPeriodeegenskaper(søknadsinfo, periode).erUttakFørFødsel() === false,
    erUttakEgenKvote: () =>
        isUttaksperiode(periode) && erUttakEgenKvote(periode.konto, søknadsinfo.søker.erFarEllerMedmor),
    erUttakAnnenForeldersKvote: () => getPeriodeegenskaper(søknadsinfo, periode).erUttakEgenKvote() === false,
    erUttakFedrekvote: () => isUttaksperiode(periode) && periode.konto === StønadskontoType.Fedrekvote,
    erInnenFørsteSeksUkerFødselFarMedmor: () =>
        erInnenFørsteSeksUkerFødselFarMedmor(
            periode.tidsperiode,
            søknadsinfo.søknaden.situasjon,
            søknadsinfo.søker.erFarEllerMedmor,
            søknadsinfo.uttaksdatoer.etterFødsel.førsteUttaksdagEtterSeksUker
        ),
    harAktivitetskrav: () => isUttaksperiode(periode) && harAktivitetskrav(periode.konto),
    harGyldigTidsperiode: () => isValidTidsperiode(periode.tidsperiode)
});

export default getPeriodeegenskaper;
