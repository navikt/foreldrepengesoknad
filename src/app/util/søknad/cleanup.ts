import _ from 'lodash';
import Søknad, { Søkersituasjon } from '../../types/søknad/Søknad';
import Barn, { FødtBarn, UfødtBarn } from '../../types/søknad/Barn';
import { Attachment } from 'common/storage/attachment/types/Attachment';

const cleanUpBarn = (barn: Barn, søkersituasjon: Søkersituasjon): Barn => {
    const barnBaseInterfaceKeys = ['antallBarn', 'erBarnetFødt'];
    switch (søkersituasjon) {
        case Søkersituasjon.FØDSEL:
            return barn.erBarnetFødt
                ? (_.pick(barn, [
                      ...barnBaseInterfaceKeys,
                      'fødselsattest',
                      'fødselsdatoer'
                  ]) as FødtBarn)
                : (_.pick(barn, [
                      ...barnBaseInterfaceKeys,
                      'termindato',
                      'terminbekreftelseDato',
                      'terminbekreftelse'
                  ]) as UfødtBarn);
        default:
            return barn as Barn;
    }
};

const isArrayOfAttachments = (object: object) => {
    return Array.isArray(object) && object.some((element) => element.filename);
};

const fetchAndCleanUpAttachments = (object: object): Attachment[] => {
    const foundAttachments = [] as Attachment[];
    Object.keys(object).forEach((key: string) => {
        if (typeof object[key] === 'object') {
            if (isArrayOfAttachments(object[key])) {
                console.log(object[key]);
                foundAttachments.push(...object[key]);
                delete object[key];
            } else {
                foundAttachments.push(
                    ...fetchAndCleanUpAttachments(object[key])
                );
            }
        }
    });
    return foundAttachments;
};

export const cleanUpSøknad = (søknad: Søknad): Søknad => {
    const { barn } = søknad;
    søknad.barn = cleanUpBarn(barn, søknad.situasjon);
    søknad.vedlegg = fetchAndCleanUpAttachments(søknad);
    console.log(søknad);
    return søknad;
};
