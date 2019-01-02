import { Periode, Periodetype, isUttaksperiode, StønadskontoType } from '../../types/uttaksplan/periodetyper';
import { erUttakEgenKvote } from '../../util/uttaksplan/uttakUtils';
import { isValidTidsperiode } from '../../util/uttaksplan/Tidsperioden';
import { Søknadsinfo } from '../../selectors/types';
import { harAktivitetskrav } from '../periodeegenskaper/harAktivitetskrav';
import { erInnenFørsteSeksUkerFødselFarMedmor } from '../periodeegenskaper/erInnenF\u00F8rsteSeksUkerF\u00F8dselFarMedmor';
import { erUttakFørFødsel } from '../periodeegenskaper/erUttakF\u00F8rF\u00F8dsel';

export interface Søknadsperiode {
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

export const getSøknadsperiode = (søknadsinfo: Søknadsinfo, periode: Periode): Søknadsperiode => ({
    erUttaksperiode: () => periode.type === Periodetype.Uttak,
    erOverføringsperiode: () => periode.type === Periodetype.Overføring,
    erUttakFørFødsel: () => erUttakFørFødsel(periode, søknadsinfo.søknaden.familiehendelsesdato),
    erUttakEtterFødsel: () => getSøknadsperiode(søknadsinfo, periode).erUttakFørFødsel() === false,
    erUttakEgenKvote: () =>
        isUttaksperiode(periode) && erUttakEgenKvote(periode.konto, søknadsinfo.søker.erFarEllerMedmor),
    erUttakAnnenForeldersKvote: () => getSøknadsperiode(søknadsinfo, periode).erUttakEgenKvote() === false,
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

export default getSøknadsperiode;
