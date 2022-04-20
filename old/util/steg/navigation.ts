import { Søkersituasjon } from '../../types/søknad/Søknad';
import { AppState } from '../../redux/reducers';
import { StegID } from '../routing/stegConfig';
import { Attachment } from 'app/components/storage/attachment/types/Attachment';
import { AttachmentType } from 'app/components/storage/attachment/types/AttachmentType';
import _ from 'lodash';

export const resolveStegToRender = (state: AppState): StegID | undefined => {
    const { situasjon } = state.søknad;
    if (situasjon === Søkersituasjon.FØDSEL) {
        return StegID.RELASJON_TIL_BARN_FØDSEL;
    } else if (situasjon === Søkersituasjon.FORELDREANSVAR) {
        return StegID.RELASJON_TIL_BARN_FORELDREANSVAR;
    } else if (situasjon === Søkersituasjon.ADOPSJON) {
        return StegID.RELASJON_TIL_BARN_ADOPSJON;
    }
    return;
};

export const skalViseManglendeVedleggSteg = (attachmentMap: Map<string, Attachment[]>): boolean => {
    const alleVedlegg = _.flatten(Array.from(attachmentMap.values()).map((v) => [...v]));
    return alleVedlegg.filter((v) => v.type !== AttachmentType.SEN_ENDRING && !!v.filesize === false).length > 0;
};
