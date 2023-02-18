import React from 'react';
import { Button, Heading, Modal, ModalProps } from '@navikt/ds-react';
import Block from '../../block/Block';

export interface BekreftDialogProps extends ModalProps {
    tittel?: string;
    onBekreft: () => void;
    onAvbryt?: () => void;
    bekreftLabel: string;
    avbrytLabel: string;
}

const BekreftDialog: React.FunctionComponent<BekreftDialogProps> = (props) => {
    const { tittel, onAvbryt, onBekreft, avbrytLabel, bekreftLabel, children, ...modalProps } = props;

    return (
        <Modal {...modalProps} closeButton={false}>
            <Modal.Content>
                {tittel && (
                    <Heading level="2" size="medium">
                        {tittel}
                    </Heading>
                )}
                <Block padBottom="m">{children}</Block>
                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
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
                        onClick={() => (onAvbryt ? onAvbryt() : props.onClose())}
                        className="bekreftDialog__avbrytKnapp"
                    >
                        {avbrytLabel}
                    </Button>
                </div>
            </Modal.Content>
        </Modal>
    );
};
export default BekreftDialog;
