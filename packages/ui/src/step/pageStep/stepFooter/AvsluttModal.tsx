import { FunctionComponent } from 'react';

import { BodyLong, Button, Heading, Modal } from '@navikt/ds-react';

import useUiIntl from '../../../i18n/ui/useUiIntl';

interface Props {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onAvbrytOgFortsettSenere?: () => void;
    onAvbrytOgSlett?: () => void;
}

const AvsluttModal: FunctionComponent<Props> = ({ isOpen, setIsOpen, onAvbrytOgSlett, onAvbrytOgFortsettSenere }) => {
    const intl = useUiIntl();
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

export default AvsluttModal;
