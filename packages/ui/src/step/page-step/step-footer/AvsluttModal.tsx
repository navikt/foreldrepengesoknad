import { useIntl } from 'react-intl';

import { BodyLong, Button, Heading, Modal } from '@navikt/ds-react';

interface Props {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onAvbrytOgFortsettSenere?: () => void;
    onAvbrytOgSlett?: () => void;
}

export const AvsluttModal = ({ isOpen, setIsOpen, onAvbrytOgSlett, onAvbrytOgFortsettSenere }: Props) => {
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
                <Button variant="primary" onClick={onAvbrytOgSlett}>
                    {intl.formatMessage({ id: 'AvsluttModal.Delete' })}
                </Button>
                <Button variant="tertiary" onClick={onAvbrytOgFortsettSenere}>
                    {intl.formatMessage({ id: 'AvsluttModal.Cancel' })}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
