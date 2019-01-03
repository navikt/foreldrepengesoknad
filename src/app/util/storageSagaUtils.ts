import { RegistrertBarn } from '../types/Person';
import Søknad from '../types/søknad/Søknad';
import Søker from 'app/types/søknad/Søker';
import { AnnenInntektType } from 'app/types/søknad/AnnenInntekt';

const getValgteRegistrerteBarnISøknaden = (søknad: Søknad): RegistrertBarn[] | undefined => {
    const { søknadenGjelderBarnValg } = søknad.ekstrainfo;
    return søknadenGjelderBarnValg !== undefined && søknadenGjelderBarnValg.valgteBarn.length > 0
        ? søknadenGjelderBarnValg.valgteBarn
        : undefined;
};

const upgradeAndreInntekterFromV1ToV2 = (søker: Søker) => {
    const { andreInntekterSiste10Mnd } = søker;

    if (andreInntekterSiste10Mnd !== undefined) {
        const newAndreInntekter = andreInntekterSiste10Mnd.map((annenInntekt) => {
            if (annenInntekt.type === AnnenInntektType.VENTELØNN_V1) {
                annenInntekt.type = AnnenInntektType.VENTELØNN;
            }

            if (annenInntekt.type === AnnenInntektType.SLUTTPAKKE_V1) {
                annenInntekt.type = AnnenInntektType.SLUTTPAKKE;
            }

            return annenInntekt;
        });

        søker.andreInntekterSiste10Mnd = newAndreInntekter;
    }

    return søker;
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
    upgradeAndreInntekterFromV1ToV2
};
export default StorageSagaUtils;
