import { BodyLong, Button, Heading, Modal } from '@navikt/ds-react';
import bemUtils from '../../utils/bemUtils';
import { FunctionComponent } from 'react';

import './avslutt-modal.css';

interface Props {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onAvbrytOgFortsettSenere?: () => void;
    onAvbrytOgSlett?: () => void;
}

const AvsluttModal: FunctionComponent<Props> = ({ isOpen, setIsOpen, onAvbrytOgSlett, onAvbrytOgFortsettSenere }) => {
    const bem = bemUtils('avslutt-modal');

    return (
        <Modal open={isOpen} onClose={() => setIsOpen(false)} closeButton={true}>
            <Modal.Content className={bem.element('content')}>
                <Heading size="medium">Fortsett senere</Heading>
                <BodyLong>Søknaden er lagret, og du kan fullføre den senere, eller velge å slette den</BodyLong>
                <div className={bem.element('button-wrapper')}>
                    <Button variant="tertiary" onClick={onAvbrytOgSlett}>
                        Slett søknaden
                    </Button>
                    <Button variant="primary" onClick={onAvbrytOgFortsettSenere}>
                        OK
                    </Button>
                </div>
            </Modal.Content>
        </Modal>
    );
};

export default AvsluttModal;
