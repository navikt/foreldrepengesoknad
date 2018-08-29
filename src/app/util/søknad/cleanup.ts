import _ from 'lodash';
import Søknad, { Søkersituasjon } from '../../types/søknad/Søknad';
import Barn, { FødtBarn, UfødtBarn } from '../../types/søknad/Barn';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { isAttachmentWithError } from 'common/storage/attachment/components/util';

const cleanUpBarn = (barn: Barn, søkersituasjon: Søkersituasjon): Barn => {
    const barnBaseInterfaceKeys = ['antallBarn', 'erBarnetFødt'];
    switch (søkersituasjon) {
        case Søkersituasjon.FØDSEL:
            return barn.erBarnetFødt
                ? (_.pick(barn, [...barnBaseInterfaceKeys, 'fødselsattest', 'fødselsdatoer']) as FødtBarn)
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

const removeAttachmentsWithUploadError = (attachments: Attachment[]) =>
    attachments.filter((a: Attachment) => !isAttachmentWithError(a));

const fetchAndCleanUpAttachments = (object: object): Attachment[] => {
    const foundAttachments = [] as Attachment[];
    Object.keys(object).forEach((key: string) => {
        if (typeof object[key] === 'object') {
            if (isArrayOfAttachments(object[key])) {
                foundAttachments.push(...removeAttachmentsWithUploadError(object[key]));
                object[key] = (object[key] as Attachment[]).map((attachment: Attachment) => attachment.id);
            } else {
                foundAttachments.push(...fetchAndCleanUpAttachments(object[key]));
            }
        }
    });
    return foundAttachments;
};

export const cleanUpSøknad = (søknad: Søknad): Søknad => {
    const { barn } = søknad;
    søknad.barn = cleanUpBarn(barn, søknad.situasjon);
    søknad.vedlegg = fetchAndCleanUpAttachments(søknad);
    return søknad;
};
