import {
    SøknadsvedleggType,
    SøknadsvedleggMetadata,
    Søknadsvedlegginfo
} from '../types/søknad/Søknad';
import { AttachmentAppState } from 'common/storage/attachment/redux/attachmentReducer';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { getAttachmentsInGroup } from 'common/storage/attachment/util/attachmentUtil';

export const getSøknadsvedlegg = (
    type: SøknadsvedleggType,
    state: AttachmentAppState
): Attachment[] => getAttachmentsInGroup(state, type);

export const getMetadataForSøknadsvedlegg = (
    type: SøknadsvedleggType
): SøknadsvedleggMetadata => {
    switch (type) {
        case 'adopsjonsvedtak':
            return {
                skjemanummer: 'skjema-adopsjonsvedtak',
                beskrivelse: 'tom'
            };
        case 'fødselsattest':
            return {
                skjemanummer: 'skjema-fødselsattest',
                beskrivelse: 'tom'
            };
        case 'omsorgsovertakelse':
            return {
                skjemanummer: 'skjema-omsorgsovertakelse',
                beskrivelse: 'tom'
            };
        case 'overtakelsedokumentasjon':
            return {
                skjemanummer: 'skjema-overtakelsedokumentasjon',
                beskrivelse: 'tom'
            };
        case 'terminbekreftelse':
            return {
                skjemanummer: 'skjema-terminbekreftelse',
                beskrivelse: 'tom'
            };
        case 'annenInntektDokumentasjon':
            return {
                skjemanummer: 'skjema-annenInntektDokumentasjon',
                beskrivelse: 'tom'
            };
    }
};

export const mapAttachmentTilSøknadsvedlegginfo = (
    attachment: Attachment
): Søknadsvedlegginfo => {
    const type = attachment.group as SøknadsvedleggType;
    return {
        id: attachment.id,
        filnavn: attachment.filename,
        url: attachment.url as string,
        type,
        filstørrelse: attachment.filesize,
        metadata: getMetadataForSøknadsvedlegg(type)
    };
};
