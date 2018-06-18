import { Attachment } from 'common/storage/attachment/types/Attachment';
import { Operation } from '../types/Operation';
import { SøknadPartial } from '../../types/søknad/Søknad';

export const editAttachmentInState = (
    attachment: Attachment,
    state: SøknadPartial
): SøknadPartial => {
    return updateAttachmentState(attachment, state, Operation.EDIT);
};

export const removeAttachmentFromState = (
    attachment: Attachment,
    state: SøknadPartial
) => {
    return updateAttachmentState(attachment, state, Operation.DELETE);
};

export const addAttachmentToState = (
    attachment: Attachment,
    state: SøknadPartial
) => {
    return updateAttachmentState(attachment, state, Operation.ADD);
};

const updateAttachmentState = (
    attachment: Attachment,
    state: SøknadPartial,
    operation: Operation
): SøknadPartial => {
    const { type } = attachment;
    const isAttachmentForBarn =
        type === 'terminbekreftelse' ||
        type === 'fødselsattest' ||
        type === 'omsorgsovertakelse' ||
        type === 'adopsjonsvedtak';
    const isAttachmentForAnnenInntekt = type === 'anneninntektdokumentasjon';

    let attachmentList = [];
    if (isAttachmentForBarn) {
        attachmentList = state.barn[type] || [];
    } else if (isAttachmentForAnnenInntekt) {
    }

    if (operation === Operation.ADD) {
        attachmentList.push(attachment);
    } else if (operation === Operation.EDIT) {
        attachmentList[attachmentList.indexOf(attachment)] = attachment;
    } else if (operation === Operation.DELETE) {
        attachmentList.splice(attachmentList.indexOf(attachment), 1);
    }

    return {
        ...state,
        barn: isAttachmentForBarn
            ? { ...state.barn, [type]: attachmentList }
            : state.barn
    };
};
