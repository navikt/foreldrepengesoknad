import {
    SøknadAction,
    SøknadActionKeys
} from '../actions/søknad/søknadActionDefinitions';
import { SøknadPartial } from '../../types/søknad/Søknad';
import { Attachment } from 'common/storage/attachment/types/Attachment';

const getDefaultState = (): SøknadPartial => {
    return {
        type: 'foreldrepenger',
        annenForelder: {},
        barn: {
            fødselsdatoer: []
        },
        utenlandsopphold: {
            tidligerePerioder: [],
            senerePerioder: []
        },
        søker: {
            erAleneOmOmsorg: false,
            andreInntekterSiste10Mnd: []
        },
        harGodkjentVilkår: false
    };
};

const buildStateWithAttachment = (
    attachment: Attachment,
    state: SøknadPartial
) => {
    const { type } = attachment;
    if (
        type === 'terminbekreftelse' ||
        type === 'fødselsattest' ||
        type === 'omsorgsovertakelse' ||
        type === 'adopsjonsvedtak'
    ) {
        const attachmentList = [
            ...(state.barn[type] ? state.barn[type] : [])
        ].filter(
            (currentAttachment: Attachment) =>
                currentAttachment.id !== attachment.id
        );
        return {
            ...state,
            barn: {
                ...state.barn,
                [type]: [...attachmentList, attachment]
            }
        };
    }
    return state;
};

const søknadReducer = (state = getDefaultState(), action: SøknadAction) => {
    switch (action.type) {
        case SøknadActionKeys.UPDATE_BARN:
            return {
                ...state,
                barn: { ...state.barn, ...action.payload }
            };
        case SøknadActionKeys.UPDATE_ANNEN_FORELDER:
            return {
                ...state,
                annenForelder: { ...state.annenForelder, ...action.payload }
            };
        case SøknadActionKeys.UPDATE_UTENLANDSOPPHOLD:
            return {
                ...state,
                utenlandsopphold: {
                    ...state.utenlandsopphold,
                    ...action.payload
                }
            };
        case SøknadActionKeys.UPDATE_SØKER:
            return {
                ...state,
                søker: {
                    ...state.søker,
                    ...action.payload
                }
            };
        case SøknadActionKeys.UPDATE_SØKNAD:
            return {
                ...state,
                ...action.payload
            };

        case SøknadActionKeys.UPLOAD_ATTACHMENT:
            const pendingAttachment = action.payload;
            pendingAttachment.pending = true;
            return buildStateWithAttachment(pendingAttachment, state);

        case SøknadActionKeys.UPLOAD_ATTACHMENT_SUCCESS:
            const uploadedAttachment = action.attachment;
            const url = action.url;

            uploadedAttachment.url = url;
            uploadedAttachment.pending = false;
            uploadedAttachment.uploaded = true;
            return buildStateWithAttachment(uploadedAttachment, state);

        case SøknadActionKeys.UPLOAD_ATTACHMENT_FAILED:
            const failedAttachment = action.attachment;
            failedAttachment.pending = false;
            return buildStateWithAttachment(failedAttachment, state);
    }
    return state;
};

export default søknadReducer;
