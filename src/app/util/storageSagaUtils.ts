import { RegistrertBarn } from '../types/Person';
import Søknad from '../types/søknad/Søknad';

const getValgteRegistrerteBarnISøknaden = (søknad: Søknad): RegistrertBarn[] | undefined => {
    const { søknadenGjelderBarnValg } = søknad.ekstrainfo;
    return søknadenGjelderBarnValg !== undefined && søknadenGjelderBarnValg.valgteBarn.length > 0
        ? søknadenGjelderBarnValg.valgteBarn
        : undefined;
};

const stemmerValgteBarnISøknadMedSøkersBarn = (
    valgteBarn: RegistrertBarn[],
    registrerteBarn?: RegistrertBarn[]
): boolean => {
    if (valgteBarn.length === 0) {
        return true;
    }
    if (registrerteBarn === undefined) {
        return false;
    }
    const barnSomIkkeErRegistrert = valgteBarn.filter((vBarn) => {
        const barn = registrerteBarn.find((rBarn) => {
            return rBarn.fnr === vBarn.fnr;
        });
        return barn !== undefined;
    });
    return barnSomIkkeErRegistrert.length > 0;
};

const StorageSagaUtils = {
    stemmerValgteBarnISøknadMedSøkersBarn,
    getValgteRegistrerteBarnISøknaden,
};
export default StorageSagaUtils;
