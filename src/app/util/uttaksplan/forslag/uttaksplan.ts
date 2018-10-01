import { Barn, FødtBarn, UfødtBarn, Adopsjonsbarn, ForeldreansvarBarn } from '../../../types/søknad/Barn';
import Søknad, { Søkersituasjon, SøkerRolle } from '../../../types/søknad/Søknad';
import { Periode, TilgjengeligStønadskonto } from '../../../types/uttaksplan/periodetyper';
import { opprettUttaksperioderAleneomsorgMor } from './aleneomsorgMor';
import { opprettUttaksperioderToForeldreEttBarnMor } from './toForeldreEttBarnMor';
import { opprettUttaksperioderAleneomsorgFarEllerMedmor } from './aleneomsorgFarEllerMedmor';
import { opprettUttaksperioderToForeldreEttBarnFarEllerMedmor } from './toForeldreEttBarnFarEllerMedmor';

const getFamiliehendelsesdato = (barn: Barn, situasjon: Søkersituasjon): Date | undefined => {
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
    const { søker, barn, situasjon, ekstrainfo, annenForelder } = søknad;
    const {
        uttaksplanSkjema: { fellesperiodeukerMor, startdatoPermisjon, morSinSisteUttaksdag }
    } = ekstrainfo;
    const { erAleneOmOmsorg, rolle } = søker;
    const { kanIkkeOppgis } = annenForelder;
    const famDato = getFamiliehendelsesdato(barn, situasjon);
    const fellesUkerMor = fellesperiodeukerMor || 0;

    if (famDato) {
        if (situasjon === Søkersituasjon.FØDSEL) {
            if (erAleneOmOmsorg || kanIkkeOppgis) {
                if (rolle === SøkerRolle.MOR) {
                    return opprettUttaksperioderAleneomsorgMor(
                        famDato,
                        tilgjengeligeStønadskontoer,
                        startdatoPermisjon
                    );
                } else {
                    return opprettUttaksperioderAleneomsorgFarEllerMedmor(famDato, tilgjengeligeStønadskontoer);
                }
            }
            if (!erAleneOmOmsorg) {
                if (rolle === SøkerRolle.MOR) {
                    return opprettUttaksperioderToForeldreEttBarnMor(
                        famDato,
                        fellesUkerMor,
                        tilgjengeligeStønadskontoer,
                        startdatoPermisjon
                    );
                } else {
                    return opprettUttaksperioderToForeldreEttBarnFarEllerMedmor(
                        tilgjengeligeStønadskontoer,
                        morSinSisteUttaksdag
                    );
                }
            }
        }

        if (situasjon === Søkersituasjon.ADOPSJON) {
            if (erAleneOmOmsorg || kanIkkeOppgis) {
                if (rolle === SøkerRolle.MOR) {
                    return opprettUttaksperioderAleneomsorgMor(
                        famDato,
                        tilgjengeligeStønadskontoer,
                        startdatoPermisjon
                    );
                } else {
                    return opprettUttaksperioderAleneomsorgFarEllerMedmor(famDato, tilgjengeligeStønadskontoer);
                }
            }

            if (!erAleneOmOmsorg) {
                if (rolle === SøkerRolle.MOR) {
                    return opprettUttaksperioderToForeldreEttBarnMor(
                        famDato,
                        fellesUkerMor,
                        tilgjengeligeStønadskontoer,
                        startdatoPermisjon
                    );
                } else {
                    return opprettUttaksperioderToForeldreEttBarnFarEllerMedmor(
                        tilgjengeligeStønadskontoer,
                        morSinSisteUttaksdag
                    );
                }
            }
        }
    }

    return [];
};
