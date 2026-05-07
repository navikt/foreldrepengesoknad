import { FormattedMessage } from 'react-intl';

import { BodyShort, Button, Dialog, HStack } from '@navikt/ds-react';

interface Props {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    goToPreviousStep: () => void;
}

export const GåTilbakeModal = ({ isOpen, setIsOpen, goToPreviousStep }: Props) => {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Dialog.Popup id="GåTilbakeModal">
                <Dialog.Header>
                    <Dialog.Title>
                        <FormattedMessage id="uttaksplan.gåTilbakeModal.tittel" />
                    </Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <HStack gap="space-16">
                        <BodyShort>
                            <FormattedMessage id="uttaksplan.gåTilbakeModal.intro" />
                        </BodyShort>
                        <BodyShort>
                            <FormattedMessage id="uttaksplan.gåTilbakeModal.spørsmål" />
                        </BodyShort>
                    </HStack>
                </Dialog.Body>
                <Dialog.Footer>
                    <Button onClick={goToPreviousStep}>
                        <FormattedMessage id="uttaksplan.gåTilbakeModal.okLabel" />
                    </Button>
                    <Button variant="secondary" onClick={() => setIsOpen(false)}>
                        <FormattedMessage id="uttaksplan.gåTilbakeModal.avbrytLabel" />
                    </Button>
                </Dialog.Footer>
            </Dialog.Popup>
        </Dialog>
    );
};
