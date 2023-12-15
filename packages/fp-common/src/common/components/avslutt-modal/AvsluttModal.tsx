import { BodyLong, Button, Heading, Modal } from '@navikt/ds-react';
import { FunctionComponent } from 'react';

interface Props {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onAvbrytOgFortsettSenere?: () => void;
    onAvbrytOgSlett?: () => void;
    supportsTempSaving?: boolean;
}

const AvsluttModal: FunctionComponent<Props> = ({
    isOpen,
    setIsOpen,
    onAvbrytOgSlett,
    onAvbrytOgFortsettSenere,
    supportsTempSaving,
}) => {
    return (
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
            <Modal.Header>
                <Heading size="medium">{supportsTempSaving ? 'Fortsett senere' : 'Avslutt og slett søknad'}</Heading>
            </Modal.Header>
            <Modal.Body>
                <BodyLong>
                    {supportsTempSaving
                        ? 'Søknaden er lagret, og du kan fullføre den senere, eller velge å slette den. Søknaden blir lagret i 24 timer.'
                        : 'Når du avslutter vil søknaden bli slettet og det du har oppgitt vil da forsvinne.'}
                </BodyLong>
            </Modal.Body>
            <Modal.Footer>
                {supportsTempSaving && (
                    <>
                        <Button variant="primary" onClick={onAvbrytOgFortsettSenere}>
                            OK
                        </Button>
                        <Button variant="tertiary" onClick={onAvbrytOgSlett}>
                            Slett søknaden
                        </Button>
                    </>
                )}
                {!supportsTempSaving && (
                    <>
                        <Button variant="primary" onClick={onAvbrytOgSlett}>
                            Avslutt og slett
                        </Button>
                        <Button variant="tertiary" onClick={() => setIsOpen(false)}>
                            Tilbake til søknaden
                        </Button>
                    </>
                )}
            </Modal.Footer>
        </Modal>
    );
};

export default AvsluttModal;
