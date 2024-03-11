/* eslint-disable @typescript-eslint/ban-types */
import { Alert, Button, Modal } from '@navikt/ds-react';
import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { v4 as uuid } from 'uuid';
import bemUtils from '../../../utils/bemUtils';
import ConfirmationDialog from '../../helpers/confirmation-dialog/ConfirmationDialog';
import SkjemagruppeQuestion from '../../helpers/skjemagruppe-question/SkjemagruppeQuestion';
import { FormikModalFormWidths, ModalFormAndListLabels, ModalFormAndListListItemBase } from '../types';
import './modalFormAndList.scss';

type ModalFormRenderer<ItemType> = (props: {
    item?: ItemType;
    allItems?: ItemType[];
    onSubmit: (item: ItemType) => void;
    onCancel: () => void;
}) => React.ReactNode;

type ListRenderer<ItemType> = (props: {
    items: ItemType[];
    onEdit: (item: ItemType) => void;
    onDelete: (item: ItemType) => void;
}) => React.ReactNode;

export type ModalFormAndListConfirmDeleteProps<ItemType> = {
    title: string;
    okLabel: string;
    cancelLabel: string;
    contentRenderer: (item: ItemType) => React.ReactNode;
};

export interface ModalFormAndListProps<ItemType extends ModalFormAndListListItemBase> {
    labels: ModalFormAndListLabels;
    maxItems?: number;
    listRenderer: ListRenderer<ItemType>;
    formRenderer: ModalFormRenderer<ItemType>;
    confirmDelete?: ModalFormAndListConfirmDeleteProps<ItemType>;
    dialogWidth?: FormikModalFormWidths;
    onAfterModalClose?: () => void;
}
interface PrivateProps<ItemType> {
    onChange: (data: ItemType[]) => void;
    items: ItemType[];
    error?: React.ReactNode | boolean;
}

type Props<ItemType extends {}> = ModalFormAndListProps<ItemType> & PrivateProps<ItemType>;

const bem = bemUtils('formikModalForm').child('modal');

interface ModalState<ItemType> {
    isVisible: boolean;
    selectedItem?: ItemType;
    ensureFocusOn?: 'addButton' | 'fieldset' | undefined;
}

function ModalFormAndList<ItemType extends ModalFormAndListListItemBase>({
    items = [],
    listRenderer,
    formRenderer,
    labels,
    error,
    dialogWidth = 'narrow',
    maxItems,
    confirmDelete,
    onChange,
}: Props<ItemType>) {
    const [modalState, setModalState] = React.useState<ModalState<ItemType>>({
        isVisible: false,
    });
    const [itemToDelete, setItemToDelete] = useState<ItemType | undefined>();

    const addButtonRef = useRef<HTMLButtonElement>(null);
    const fieldsetRef = useRef<HTMLFieldSetElement>(null);

    const handleOnSubmit = (values: ItemType) => {
        if (values.id) {
            onChange([...items.filter((item) => item.id !== values.id), values]);
        } else {
            onChange([...items, { id: uuid(), ...values }]);
        }
        setModalState({
            ...modalState,
            isVisible: false,
            ensureFocusOn: modalState.selectedItem === undefined ? 'addButton' : 'fieldset',
        });
    };

    useEffect(() => {
        if (modalState.ensureFocusOn) {
            /** Item lagt til - rerender ødelegger for automatisk fokus på knappen, så vi setter den manuelt */
            if (modalState.ensureFocusOn === 'addButton') {
                addButtonRef.current?.focus();
            } else {
                fieldsetRef.current?.focus();
            }
            setModalState({ ...modalState, ensureFocusOn: undefined });
        }
    }, [addButtonRef, modalState.ensureFocusOn, modalState]);

    const handleEdit = (item: ItemType) => {
        setModalState({ isVisible: true, selectedItem: item });
    };

    const doDeleteItem = (item: ItemType) => {
        onChange([...items.filter((i) => i.id !== item.id)]);
        if (itemToDelete) {
            setItemToDelete(undefined);
        }
    };

    const handleDelete = (item: ItemType) => {
        if (confirmDelete) {
            setItemToDelete(item);
        } else {
            doDeleteItem(item);
        }
    };

    const resetModal = () => {
        setModalState({ isVisible: false });
    };

    return (
        <>
            {modalState.isVisible ? (
                <Modal
                    portal={true}
                    open={modalState.isVisible}
                    onClose={resetModal}
                    className={classNames(bem.block, bem.modifier(dialogWidth))}
                    aria-label={labels.modalTitle}
                    header={{
                        heading: labels.modalTitle,
                    }}
                >
                    <Modal.Body>
                        {formRenderer({
                            onSubmit: handleOnSubmit,
                            onCancel: resetModal,
                            item: modalState.selectedItem,
                            allItems: items,
                        })}
                    </Modal.Body>
                </Modal>
            ) : null}
            <SkjemagruppeQuestion
                ref={fieldsetRef}
                legend={labels.listTitle}
                error={error}
                tabIndex={-1}
                className="modalFormAndListFieldset"
            >
                {items.length > 0 && (
                    <div className="modalFormAndList__listWrapper">
                        {listRenderer({ items, onEdit: handleEdit, onDelete: handleDelete })}
                    </div>
                )}
                {items.length === 0 && labels.emptyListText && (
                    <div style={{ marginTop: labels.listTitle ? '1rem' : 'none', paddingBottom: '.5rem' }}>
                        <Alert variant="info">{labels.emptyListText}</Alert>
                    </div>
                )}
                {(maxItems === undefined || maxItems > items.length) && (
                    <div style={{ marginTop: '1rem' }} className={'modalFormAndList__addButton'}>
                        <Button
                            ref={addButtonRef}
                            type="button"
                            onClick={() => setModalState({ ...modalState, isVisible: true })}
                            size="small"
                            variant="secondary"
                        >
                            {labels.addLabel}
                        </Button>
                    </div>
                )}
            </SkjemagruppeQuestion>

            {confirmDelete && itemToDelete && (
                <ConfirmationDialog
                    title={confirmDelete.title}
                    open={itemToDelete !== undefined}
                    okLabel={confirmDelete.okLabel}
                    cancelLabel={confirmDelete.cancelLabel}
                    onConfirm={() => (itemToDelete ? doDeleteItem(itemToDelete) : null)}
                    onCancel={() => setItemToDelete(undefined)}
                >
                    {confirmDelete.contentRenderer(itemToDelete)}
                </ConfirmationDialog>
            )}
        </>
    );
}

export default ModalFormAndList;
