import { useIntl } from 'react-intl';

import { BodyLong, Button, Heading, Modal } from '@navikt/ds-react';

interface Props {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onAvsluttOgSlett?: () => void;
}

export const AvsluttModal = ({ isOpen, setIsOpen, onAvsluttOgSlett }: Props) => {
    const intl = useIntl();
    return (
        <Modal
            open={isOpen}
            onClose={() => setIsOpen(false)}
            aria-label={intl.formatMessage({ id: 'AvsluttModal.Tittel' })}
        >
            <Modal.Header>
                <Heading size="medium">{intl.formatMessage({ id: 'AvsluttModal.Tittel' })}</Heading>
            </Modal.Header>
            <Modal.Body>
                <BodyLong>{intl.formatMessage({ id: 'AvsluttModal.Info' })}</BodyLong>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onAvsluttOgSlett}>
                    {intl.formatMessage({ id: 'AvsluttModal.Delete' })}
                </Button>
                <Button variant="tertiary" onClick={() => setIsOpen(false)}>
                    {intl.formatMessage({ id: 'AvsluttModal.Cancel' })}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
