import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { BodyShort, Button, HStack, Heading, Modal } from '@navikt/ds-react';

interface Props {
    isOpen: boolean;
    erEndringssøknad: boolean;
    onClose: () => void;
    handleSlettUttaksplanModalBekreft: () => void;
}

const SlettUttaksplanModal: FunctionComponent<Props> = ({
    isOpen,
    erEndringssøknad,
    onClose,
    handleSlettUttaksplanModalBekreft,
}) => {
    let innhold1Id = 'uttaksplan.slettPlan.innhold1.førstegangssøknad';
    let innhold2Id = 'uttaksplan.slettPlan.innhold2.førstegangssøknad';
    if (erEndringssøknad) {
        innhold1Id = 'uttaksplan.slettPlan.innhold1.endringssøknad';
        innhold2Id = 'uttaksplan.slettPlan.innhold2.endringssøknad';
    }

    return (
        <Modal open={isOpen} onClose={onClose} aria-label="Slett uttaksplanen din">
            <Modal.Header>
                <Heading size="small">
                    <FormattedMessage id="uttaksplan.slettPlan.modal.tittel" />
                </Heading>
            </Modal.Header>
            <Modal.Body>
                <HStack gap="4">
                    <BodyShort>
                        <FormattedMessage id={innhold1Id} />
                    </BodyShort>
                    <BodyShort>
                        <FormattedMessage id={innhold2Id} />
                    </BodyShort>
                </HStack>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleSlettUttaksplanModalBekreft}>
                    <FormattedMessage id="uttaksplan.slettPlan.slett" />
                </Button>
                <Button variant="secondary" onClick={onClose}>
                    <FormattedMessage id="uttaksplan.slettPlan.avbryt" />
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SlettUttaksplanModal;
