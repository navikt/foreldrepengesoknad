export interface ModalFormAndListListItemBase {
    id?: string;
}

export interface ModalFormAndListLabels {
    modalTitle: string;
    listTitle?: string;
    emptyListText?: string;
    addLabel: string;
}

export interface ModalFormAndInfoLabels {
    modalTitle: string;
    infoTitle?: React.ReactNode;
    addLabel: string;
    editLabel: string;
    deleteLabel: string;
}
export type FormikModalFormWidths = 'narrow' | 'wide';
