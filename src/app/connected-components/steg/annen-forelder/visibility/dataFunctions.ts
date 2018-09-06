import { Barn, Adopsjonsbarn } from '../../../../types/søknad/Barn';
import { Søker } from '../../../../types/søknad/Søker';
import Person, { RegistrertAnnenForelder } from '../../../../types/Person';
import { erFarEllerMedmor } from '../../../../util/domain/personUtil';

const getHarAnnenForelderOpplystOmSinPågåendeSak = (registrertAnnenForelder: RegistrertAnnenForelder): boolean => {
    return registrertAnnenForelder !== undefined && registrertAnnenForelder.harOpplystOmSinPågåendeSak === true;
};

const getGjelderAdopsjonAvEktefellesBarn = (barn: Barn): boolean => {
    return (barn as Adopsjonsbarn).adopsjonAvEktefellesBarn === true;
};

const getErFarEllerMedmor = (søker: Søker, person: Person): boolean => {
    return erFarEllerMedmor(person.kjønn, søker.rolle);
};

export const AnnenForelderDataFunctions = {
    getHarAnnenForelderOpplystOmSinPågåendeSak,
    getGjelderAdopsjonAvEktefellesBarn,
    getErFarEllerMedmor
};
