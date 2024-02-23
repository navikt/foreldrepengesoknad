import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';

import { BodyLong, Button, Heading, Modal } from '@navikt/ds-react';

interface Props {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onAvbrytOgFortsettSenere?: () => void;
    onAvbrytOgSlett?: () => void;
}

const AvsluttModal: FunctionComponent<Props> = ({ isOpen, setIsOpen, onAvbrytOgSlett, onAvbrytOgFortsettSenere }) => {
    return (
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
            <Modal.Header>
                <Heading size="medium">
                    <FormattedMessage id="AvsluttModal.ContinueLater" />
                </Heading>
            </Modal.Header>
            <Modal.Body>
                <BodyLong>
                    <FormattedMessage id="AvsluttModal.CompleteLater" />
                </BodyLong>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onAvbrytOgFortsettSenere}>
                    <FormattedMessage id="AvsluttModal.Ok" />
                </Button>
                <Button variant="tertiary" onClick={onAvbrytOgSlett}>
                    <FormattedMessage id="AvsluttModal.Delete" />
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AvsluttModal;
