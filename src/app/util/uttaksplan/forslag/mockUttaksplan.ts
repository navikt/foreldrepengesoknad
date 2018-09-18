import { Barn, FødtBarn, UfødtBarn, Adopsjonsbarn, ForeldreansvarBarn } from '../../../types/søknad/Barn';
import Søknad, { Søkersituasjon, SøkerRolle } from '../../../types/søknad/Søknad';
import { Periode, TilgjengeligStønadskonto } from '../../../types/uttaksplan/periodetyper';
import { opprettUttaksperioderAleneomsorgMor } from './aleneomsorgMor';
import { getPermisjonsregler } from '../permisjonsregler';
import { opprettUttaksperioderMorToForeldreEttBarn } from './toForeldreEttBarn';
import { opprettUttaksperioderAleneomsorgFarEllerMedmor } from './aleneomsorgFarEllerMedmor';

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

export const lagMockUttaksplan = (
    søknad: Søknad,
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[]
): Periode[] => {
    const { søker, barn, situasjon } = søknad;
    const { erAleneOmOmsorg, rolle } = søker;
    const famDato = getFamiliehendelsesdato(barn, situasjon);

    if (famDato) {
        if (situasjon === Søkersituasjon.FØDSEL) {
            if (erAleneOmOmsorg) {
                if (rolle === SøkerRolle.MOR) {
                    return opprettUttaksperioderAleneomsorgMor(
                        famDato,
                        getPermisjonsregler(),
                        tilgjengeligeStønadskontoer
                    );
                } else {
                    return opprettUttaksperioderAleneomsorgFarEllerMedmor(famDato, tilgjengeligeStønadskontoer);
                }
            }
            if (!erAleneOmOmsorg) {
                if (rolle === SøkerRolle.MOR) {
                    return opprettUttaksperioderMorToForeldreEttBarn(famDato, 13, tilgjengeligeStønadskontoer);
                } else {
                    return opprettUttaksperioderMorToForeldreEttBarn(famDato, 13, tilgjengeligeStønadskontoer);
                }
            }
        } else if (situasjon === Søkersituasjon.ADOPSJON) {
            if (erAleneOmOmsorg && rolle === SøkerRolle.MOR) {
                const perioder = opprettUttaksperioderAleneomsorgMor(
                    famDato,
                    getPermisjonsregler(),
                    tilgjengeligeStønadskontoer
                );
                perioder.shift();
                return perioder;
            }
            if (!erAleneOmOmsorg && rolle === SøkerRolle.MOR) {
                const perioder = opprettUttaksperioderMorToForeldreEttBarn(famDato, 13, tilgjengeligeStønadskontoer);
                perioder.shift();
                return perioder;
            }
        } else if (situasjon === Søkersituasjon.FORELDREANSVAR) {
            if (erAleneOmOmsorg && rolle === SøkerRolle.MOR) {
                const perioder = opprettUttaksperioderAleneomsorgMor(
                    famDato,
                    getPermisjonsregler(),
                    tilgjengeligeStønadskontoer
                );
                perioder.shift();
                return perioder;
            }
            if (!erAleneOmOmsorg && rolle === SøkerRolle.MOR) {
                const perioder = opprettUttaksperioderMorToForeldreEttBarn(famDato, 13, tilgjengeligeStønadskontoer);
                perioder.shift();
                return perioder;
            }
        }
    }

    return [];
};
