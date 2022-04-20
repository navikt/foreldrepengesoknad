import { Attachment } from 'app/components/storage/attachment/types/Attachment';
import { Operation } from '../types/Operation';
import { SøknadPartial } from '../../types/søknad/Søknad';
import { isAttachmentForAnnenInntekt, isAttachmentForBarn } from 'app/components/storage/attachment/components/util';

export const editAttachmentInState = (attachment: Attachment, state: SøknadPartial): SøknadPartial => {
    return updateAttachmentState(attachment, state, Operation.EDIT);
};

export const removeAttachmentFromState = (attachment: Attachment, state: SøknadPartial) => {
    return updateAttachmentState(attachment, state, Operation.DELETE);
};

export const addAttachmentToState = (attachment: Attachment, state: SøknadPartial) => {
    return updateAttachmentState(attachment, state, Operation.ADD);
};

export const updateAttachmentList = (
    attachments: Attachment[],
    attachment: Attachment,
    operation: Operation
): Attachment[] => {
    if (operation === Operation.ADD) {
        attachments.push(attachment);
    } else if (operation === Operation.EDIT) {
        attachments[attachments.indexOf(attachment)] = attachment;
    } else if (operation === Operation.DELETE) {
        attachments.splice(attachments.indexOf(attachment), 1);
    }
    return attachments;
};

const stateWithUpdatedBarnAttachments = (
    attachment: Attachment,
    state: SøknadPartial,
    operation: Operation
): SøknadPartial => {
    const attachments = state.barn[attachment.type] || [];
    const updatedAttachments = updateAttachmentList(attachments, attachment, operation);
    return {
        ...state,
        barn: { ...state.barn, [attachment.type]: updatedAttachments },
    };
};

const stateWithUpdatedAndreInntekterAttachments = (
    attachment: Attachment,
    state: SøknadPartial,
    operation: Operation
): SøknadPartial => {
    const andreInntekter = state.søker.andreInntekterSiste10Mnd;
    if (andreInntekter) {
        const annenInntekt = andreInntekter.find(
            (currentAnnenInntekt) =>
                currentAnnenInntekt.vedlegg.find((currentVedlegg) => currentVedlegg.id === attachment.id) !== undefined
        );
        if (annenInntekt) {
            const attachments = annenInntekt.vedlegg;
            const annenInntektIndex = andreInntekter.indexOf(annenInntekt);
            annenInntekt.vedlegg = updateAttachmentList(attachments, attachment, operation);
            andreInntekter[annenInntektIndex] = annenInntekt;
            return {
                ...state,
                søker: {
                    ...state.søker,
                    andreInntekterSiste10Mnd: andreInntekter,
                },
            };
        }
    }
    return state;
};

const updateAttachmentState = (attachment: Attachment, state: SøknadPartial, operation: Operation): SøknadPartial => {
    if (isAttachmentForBarn(attachment.type)) {
        return stateWithUpdatedBarnAttachments(attachment, state, operation);
    } else if (isAttachmentForAnnenInntekt(attachment.type)) {
        return stateWithUpdatedAndreInntekterAttachments(attachment, state, operation);
    }
    return state;
};
