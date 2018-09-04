import { Barn, FødtBarn, UfødtBarn } from '../../../types/søknad/Barn';
import Søknad, { Søkersituasjon, SøkerRolle } from '../../../types/søknad/Søknad';
import { Periode } from '../../../types/uttaksplan/periodetyper';
import { opprettUttaksperioderAleneomsorgMor } from './aleneomsorgMor';
import { getPermisjonsregler } from '../permisjonsregler';
import { opprettUttaksperioderToForeldreEttBarn } from './toForeldreEttBarn';

const getFamiliehendelsesdato = (barn: Barn, situasjon: Søkersituasjon): Date | undefined => {
    if (situasjon === Søkersituasjon.FØDSEL) {
        return barn.erBarnetFødt ? (barn as FødtBarn).fødselsdatoer[0] : (barn as UfødtBarn).termindato;
    }
    return undefined;
};

export const lagMockUttaksplan = (søknad: Søknad): Periode[] => {
    const { søker, barn, situasjon } = søknad;

    if (søknad.situasjon === Søkersituasjon.FØDSEL) {
        const famDato = getFamiliehendelsesdato(barn, situasjon);
        if (famDato) {
            if (søker.erAleneOmOmsorg && søker.rolle === SøkerRolle.MOR) {
                return opprettUttaksperioderAleneomsorgMor(famDato, '100%', getPermisjonsregler());
            }
            if (!søker.erAleneOmOmsorg && søker.rolle === SøkerRolle.MOR) {
                return opprettUttaksperioderToForeldreEttBarn(famDato, '100%', 13, 13, getPermisjonsregler());
            }
        }
    }
    return [];
};
