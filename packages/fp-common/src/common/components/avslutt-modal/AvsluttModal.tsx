import { BodyLong, Button, Heading, Modal } from '@navikt/ds-react';
import { FunctionComponent } from 'react';

interface Props {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onAvbrytOgFortsettSenere?: () => void;
    onAvbrytOgSlett?: () => void;
}

const AvsluttModal: FunctionComponent<Props> = ({ isOpen, setIsOpen, onAvbrytOgSlett, onAvbrytOgFortsettSenere }) => {
    return (
        <Modal open={isOpen} onClose={() => setIsOpen(false)} aria-label="Avslutt søknad">
            <Modal.Header>
                <Heading size="medium">Fortsett senere</Heading>
            </Modal.Header>
            <Modal.Body>
                <BodyLong>
                    Søknaden er lagret, og du kan fullføre den senere, eller velge å slette den. Søknaden blir lagret i
                    24 timer.
                </BodyLong>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onAvbrytOgFortsettSenere}>
                    OK
                </Button>
                <Button variant="tertiary" onClick={onAvbrytOgSlett}>
                    Slett søknaden
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AvsluttModal;
