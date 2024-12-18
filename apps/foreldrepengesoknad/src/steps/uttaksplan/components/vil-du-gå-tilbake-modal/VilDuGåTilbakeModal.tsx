import { Dispatch, SetStateAction } from 'react';
import { FormattedMessage } from 'react-intl';

import { BodyShort, Button, HStack, Heading, Modal } from '@navikt/ds-react';

interface Props {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    goToPreviousStep: () => void;
}

export const VilDuGåTilbakeModal = ({ isOpen, setIsOpen, goToPreviousStep }: Props) => {
    return (
        <Modal aria-label={'Vil du gå tilbake'} open={isOpen} onClose={() => setIsOpen(false)}>
            <Modal.Header>
                <Heading size="small" level="1">
                    <FormattedMessage id="uttaksplan.vilDuGåTilbakeModal.tittel" />
                </Heading>
            </Modal.Header>
            <Modal.Body>
                <HStack gap="4">
                    <BodyShort>
                        <FormattedMessage id="uttaksplan.vilDuGåTilbakeModal.intro" />
                    </BodyShort>
                    <BodyShort>
                        <FormattedMessage id="uttaksplan.vilDuGåTilbakeModal.spørsmål" />
                    </BodyShort>
                </HStack>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={goToPreviousStep}>
                    <FormattedMessage id="uttaksplan.vilDuGåTilbakeModal.okLabel" />
                </Button>
                <Button variant="secondary" onClick={() => setIsOpen(false)}>
                    <FormattedMessage id="uttaksplan.vilDuGåTilbakeModal.avbrytLabel" />
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
