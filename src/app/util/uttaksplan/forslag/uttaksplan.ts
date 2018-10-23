import { Barn, FødtBarn, UfødtBarn, Adopsjonsbarn, ForeldreansvarBarn } from '../../../types/søknad/Barn';
import Søknad, { Søkersituasjon } from '../../../types/søknad/Søknad';
import { Periode, TilgjengeligStønadskonto } from '../../../types/uttaksplan/periodetyper';
import { ikkeDeltUttak } from './ikkeDeltUttak';
import { deltUttak } from './deltUttak';
import { erFarEllerMedmor } from '../../domain/personUtil';
import { DateValue } from '../../../types/common';
import { getDeltUttak } from './util';

const getFamiliehendelsesdato = (barn: Barn, situasjon: Søkersituasjon): DateValue => {
    if (situasjon === Søkersituasjon.FØDSEL) {
        return barn.erBarnetFødt ? (barn as FødtBarn).fødselsdatoer[0] : (barn as UfødtBarn).termindato;
    } else if (situasjon === Søkersituasjon.ADOPSJON) {
        return (barn as Adopsjonsbarn).adopsjonsdato;
    } else if (situasjon === Søkersituasjon.FORELDREANSVAR) {
        return (barn as ForeldreansvarBarn).foreldreansvarsdato;
    }
    return undefined;
};

export const lagUttaksplan = (søknad: Søknad, tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[]): Periode[] => {
    const { barn, situasjon, ekstrainfo, annenForelder } = søknad;
    const { erUfør } = annenForelder;
    const { uttaksplanSkjema } = ekstrainfo;
    const { startdatoPermisjon, fellesperiodeukerMor } = uttaksplanSkjema;
    const famDato = getFamiliehendelsesdato(barn, situasjon);
    const erDeltUttak: boolean = getDeltUttak(tilgjengeligeStønadskontoer);

    if (famDato) {
        if (erDeltUttak) {
            return deltUttak(
                situasjon,
                famDato,
                erFarEllerMedmor(søknad.søker.rolle),
                tilgjengeligeStønadskontoer,
                startdatoPermisjon,
                fellesperiodeukerMor
            );
        } else {
            return ikkeDeltUttak(
                situasjon,
                famDato,
                erFarEllerMedmor(søknad.søker.rolle),
                tilgjengeligeStønadskontoer,
                startdatoPermisjon,
                erUfør
            );
        }
    }

    return [];
};
