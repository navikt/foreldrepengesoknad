import React from 'react';
import { Button, Heading, Modal, ModalProps } from '@navikt/ds-react';
import Block from '../../block/Block';

export interface BekreftDialogProps extends ModalProps {
    tittel?: string;
    onBekreft: () => void;
    onAvbryt?: () => void;
    onClose: () => void;
    bekreftLabel: string;
    avbrytLabel: string;
}

const BekreftDialog: React.FunctionComponent<BekreftDialogProps> = (props) => {
    const { tittel, onAvbryt, onBekreft, onClose, avbrytLabel, bekreftLabel, children, ...modalProps } = props;

    return (
        <Modal {...modalProps}>
            <Modal.Body>
                {tittel && (
                    <Heading level="2" size="medium">
                        {tittel}
                    </Heading>
                )}
                <Block padBottom="m">{children}</Block>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    type="button"
                    variant="primary"
                    onClick={() => onBekreft()}
                    className="bekreftDialog__bekreftKnapp"
                >
                    {bekreftLabel}
                </Button>
                <Button
                    type="button"
                    variant="secondary"
                    onClick={() => (onAvbryt ? onAvbryt() : onClose())}
                    className="bekreftDialog__avbrytKnapp"
                >
                    {avbrytLabel}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
export default BekreftDialog;
