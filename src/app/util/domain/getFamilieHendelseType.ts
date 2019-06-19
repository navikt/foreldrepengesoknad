import { FamiliehendelseDatoer } from 'app/types/søknad/FamilieHendelseDatoer';
import { FamiliehendelsesType } from 'app/types/EksisterendeSak';

export const getFamilieHendelseType = (datoer: FamiliehendelseDatoer) => {
    if (datoer.fødselsdato !== undefined) {
        return FamiliehendelsesType.FØDSEL;
    } else {
        return datoer.termindato !== undefined ? FamiliehendelsesType.TERM : FamiliehendelsesType.ADOPSJON;
    }
};
