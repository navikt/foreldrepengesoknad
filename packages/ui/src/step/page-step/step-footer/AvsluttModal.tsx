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
            aria-label={intl.formatMessage({ id: 'AvsluttModal.ContinueLater' })}
        >
            <Modal.Header>
                <Heading size="medium">{intl.formatMessage({ id: 'AvsluttModal.ContinueLater' })}</Heading>
            </Modal.Header>
            <Modal.Body>
                <BodyLong>{intl.formatMessage({ id: 'AvsluttModal.CompleteLater' })}</BodyLong>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onAvbrytOgFortsettSenere}>
                    {intl.formatMessage({ id: 'AvsluttModal.Ok' })}
                </Button>
                <Button variant="tertiary" onClick={onAvbrytOgSlett}>
                    {intl.formatMessage({ id: 'AvsluttModal.Delete' })}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
