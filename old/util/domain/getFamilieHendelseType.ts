import { FamiliehendelsesType } from 'app/types/EksisterendeSak';
import { FamiliehendelseDatoer } from 'app/types/søknad/FamiliehendelseDatoer';

export const getFamilieHendelseType = (datoer: FamiliehendelseDatoer) => {
    if (datoer.fødselsdato !== undefined) {
        return FamiliehendelsesType.FØDSEL;
    } else {
        return datoer.termindato !== undefined ? FamiliehendelsesType.TERM : FamiliehendelsesType.ADOPSJON;
    }
};
