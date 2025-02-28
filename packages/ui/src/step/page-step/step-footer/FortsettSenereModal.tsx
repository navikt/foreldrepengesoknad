import { useIntl } from 'react-intl';

import { BodyLong, Button, Heading, Modal } from '@navikt/ds-react';

interface Props {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onFortsettSenere?: () => void;
}

export const FortsettSenereModal = ({ isOpen, setIsOpen, onFortsettSenere }: Props) => {
    const intl = useIntl();

    return (
        <Modal
            open={isOpen}
            onClose={() => setIsOpen(false)}
            aria-label={intl.formatMessage({ id: 'FortsettSenereModal.Tittel' })}
        >
            <Modal.Header>
                <Heading size="medium">{intl.formatMessage({ id: 'FortsettSenereModal.Tittel' })}</Heading>
            </Modal.Header>
            <Modal.Body>
                <BodyLong>{intl.formatMessage({ id: 'FortsettSenereModal.Info' })}</BodyLong>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={() => {
                            if (onFortsettSenere) {
                                onFortsettSenere();
                            }
                            setIsOpen(false);
                        }}
                    >
                        {intl.formatMessage({ id: 'FortsettSenereModal.Ok' })}
                    </Button>
                </Modal.Footer>
            </Modal.Body>
        </Modal>
    );
};
