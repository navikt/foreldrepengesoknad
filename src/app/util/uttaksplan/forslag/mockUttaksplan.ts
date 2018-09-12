import { Barn, FødtBarn, UfødtBarn, Adopsjonsbarn, ForeldreansvarBarn } from '../../../types/søknad/Barn';
import Søknad, { Søkersituasjon, SøkerRolle } from '../../../types/søknad/Søknad';
import { Uttaksperiode, Utsettelsesperiode } from '../../../types/uttaksplan/periodetyper';
import { opprettUttaksperioderAleneomsorgMor } from './aleneomsorgMor';
import { getPermisjonsregler } from '../permisjonsregler';
import { opprettUttaksperioderToForeldreEttBarn } from './toForeldreEttBarn';

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

export const lagMockUttaksplan = (søknad: Søknad): Array<Uttaksperiode | Utsettelsesperiode> => {
    const { søker, barn, situasjon } = søknad;
    const famDato = getFamiliehendelsesdato(barn, situasjon);

    if (famDato) {
        if (søknad.situasjon === Søkersituasjon.FØDSEL) {
            if (søker.erAleneOmOmsorg && søker.rolle === SøkerRolle.MOR) {
                return opprettUttaksperioderAleneomsorgMor(famDato, '100', getPermisjonsregler());
            }
            if (!søker.erAleneOmOmsorg && søker.rolle === SøkerRolle.MOR) {
                return opprettUttaksperioderToForeldreEttBarn(famDato, '100', 13, 13, getPermisjonsregler());
            }
        } else if (søknad.situasjon === Søkersituasjon.ADOPSJON) {
            if (søker.erAleneOmOmsorg && søker.rolle === SøkerRolle.MOR) {
                const perioder = opprettUttaksperioderAleneomsorgMor(famDato, '100', getPermisjonsregler());
                perioder.shift();
                return perioder;
            }
            if (!søker.erAleneOmOmsorg && søker.rolle === SøkerRolle.MOR) {
                const perioder = opprettUttaksperioderToForeldreEttBarn(famDato, '100', 13, 13, getPermisjonsregler());
                perioder.shift();
                return perioder;
            }
        } else if (søknad.situasjon === Søkersituasjon.FORELDREANSVAR) {
            if (søker.erAleneOmOmsorg && søker.rolle === SøkerRolle.MOR) {
                const perioder = opprettUttaksperioderAleneomsorgMor(famDato, '100', getPermisjonsregler());
                perioder.shift();
                return perioder;
            }
            if (!søker.erAleneOmOmsorg && søker.rolle === SøkerRolle.MOR) {
                const perioder = opprettUttaksperioderToForeldreEttBarn(famDato, '100', 13, 13, getPermisjonsregler());
                perioder.shift();
                return perioder;
            }
        }
    }

    return [];
};
