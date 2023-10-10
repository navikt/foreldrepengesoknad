import { BodyLong, Button, Heading, Modal } from '@navikt/ds-react';
import bemUtils from '../../utils/bemUtils';
import { FunctionComponent } from 'react';

import './avslutt-modal.css';

interface Props {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onAvbrytOgFortsettSenere?: () => void;
    onAvbrytOgSlett?: () => void;
    useNoTempSavingText?: boolean;
}

const AvsluttModal: FunctionComponent<Props> = ({
    isOpen,
    setIsOpen,
    onAvbrytOgSlett,
    onAvbrytOgFortsettSenere,
    useNoTempSavingText,
}) => {
    const bem = bemUtils('avslutt-modal');

    return (
        <Modal open={isOpen} onClose={() => setIsOpen(false)} closeButton={true}>
            <Modal.Content className={bem.element('content')}>
                <Heading size="medium">{useNoTempSavingText ? 'Avslutt og slett søknad' : 'Fortsett senere'}</Heading>
                <BodyLong>
                    {useNoTempSavingText
                        ? 'Når du avslutter vil søknaden bli slettet og det du har oppgitt vil da forsvinne.'
                        : 'Søknaden er lagret, og du kan fullføre den senere, eller velge å slette den. Søknaden blir lagret i 24 timer.'}
                </BodyLong>
                <div className={bem.element('button-wrapper')}>
                    {!useNoTempSavingText && (
                        <>
                            <Button variant="tertiary" onClick={onAvbrytOgSlett}>
                                Slett søknaden
                            </Button>
                            <Button variant="primary" onClick={onAvbrytOgFortsettSenere}>
                                OK
                            </Button>
                        </>
                    )}
                    {useNoTempSavingText && (
                        <>
                            <Button variant="tertiary" onClick={() => setIsOpen(false)}>
                                Tilbake til søknaden
                            </Button>
                            <Button variant="primary" onClick={onAvbrytOgSlett}>
                                Avslutt og slett
                            </Button>
                        </>
                    )}
                </div>
            </Modal.Content>
        </Modal>
    );
};

export default AvsluttModal;
