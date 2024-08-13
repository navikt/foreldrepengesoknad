import classNames from 'classnames';
import React from 'react';

import { Button, Modal, Panel } from '@navikt/ds-react';

import bemUtils from './../../../utils/bemUtils';
import SkjemagruppeQuestion from './../../helpers/skjemagruppe-question/SkjemagruppeQuestion';
import { FormikModalFormWidths, ModalFormAndInfoLabels } from './../types';
import './modalFormAndInfo.scss';

type ModalFormRenderer<DataType> = (props: {
    data?: DataType;
    onSubmit: (data: DataType) => void;
    onCancel: () => void;
}) => React.ReactNode;

type InfoRenderer<DataType> = (props: {
    data: DataType;
    onEdit: (data: DataType) => void;
    onDelete: (data: DataType) => void;
}) => React.ReactNode;

export interface ModalFormAndInfoProps<DataType> {
    labels: ModalFormAndInfoLabels;
    infoRenderer: InfoRenderer<DataType>;
    formRenderer: ModalFormRenderer<DataType>;
    wrapInfoInFieldset?: boolean;
    renderEditButtons?: boolean;
    renderDeleteButton?: boolean;
    dialogWidth?: FormikModalFormWidths;
    dialogClassName?: string;
    wrapInfoInPanel?: boolean;
}
interface PrivateProps<DataType> {
    onDelete: () => void;
    onChange: (data: DataType) => void;
    data?: DataType;
    error?: React.ReactNode | boolean;
}

type Props<DataType> = ModalFormAndInfoProps<DataType> & PrivateProps<DataType>;

const bem = bemUtils('formikModalForm').child('modal');

function ModalFormAndInfo<DataType>({
    data,
    labels,
    error,
    dialogWidth,
    renderEditButtons = false,
    renderDeleteButton = true,
    dialogClassName,
    wrapInfoInPanel = true,
    wrapInfoInFieldset = true,
    infoRenderer,
    formRenderer,
    onDelete,
    onChange,
}: Props<DataType>) {
    const [modalState, setModalState] = React.useState<{ isVisible: boolean; data?: DataType }>({
        isVisible: false,
    });

    const handleOnSubmit = (values: DataType) => {
        onChange(values);
        setModalState({ isVisible: false });
    };

    const handleEdit = (dataEdit: DataType) => {
        setModalState({ isVisible: true, data: dataEdit });
    };

    const handleDelete = () => {
        onDelete();
    };

    const resetModal = () => {
        setModalState({ isVisible: false, data: undefined });
    };

    const content =
        data === undefined ? (
            <Button
                type="button"
                onClick={() => setModalState({ isVisible: true, data })}
                size="small"
                variant="secondary"
            >
                {labels.addLabel}
            </Button>
        ) : (
            <>
                <div className="modalFormAndInfo__infoWrapper">
                    {wrapInfoInPanel ? (
                        <Panel border={true} className={'modalFormAndInfo__infoWrapper__panel'}>
                            {infoRenderer({ data, onEdit: handleEdit, onDelete: handleDelete })}
                        </Panel>
                    ) : (
                        infoRenderer({ data, onEdit: handleEdit, onDelete: handleDelete })
                    )}
                </div>
                {renderEditButtons && (
                    <div className={'modalFormAndInfo__buttons'}>
                        <Button
                            type="button"
                            onClick={() => setModalState({ isVisible: true, data })}
                            size="small"
                            variant="secondary"
                        >
                            {data ? labels.editLabel : labels.addLabel}
                        </Button>
                        {renderDeleteButton && (
                            <Button type="button" onClick={onDelete} size="small" variant="secondary">
                                {labels.deleteLabel}
                            </Button>
                        )}
                    </div>
                )}
            </>
        );

    return (
        <>
            {modalState.isVisible ? (
                <Modal
                    portal={true}
                    open={modalState.isVisible}
                    className={classNames(bem.block, bem.modifier(dialogWidth), dialogClassName)}
                    onClose={resetModal}
                    aria-label={labels.modalTitle}
                    header={{
                        heading: labels.modalTitle,
                    }}
                >
                    <Modal.Body>
                        {formRenderer({
                            onSubmit: handleOnSubmit,
                            onCancel: resetModal,
                            data: modalState.data,
                        })}
                    </Modal.Body>
                </Modal>
            ) : null}
            {wrapInfoInFieldset === true ? (
                <SkjemagruppeQuestion error={error} legend={labels.infoTitle}>
                    {content}
                </SkjemagruppeQuestion>
            ) : (
                content
            )}
        </>
    );
}

export default ModalFormAndInfo;
