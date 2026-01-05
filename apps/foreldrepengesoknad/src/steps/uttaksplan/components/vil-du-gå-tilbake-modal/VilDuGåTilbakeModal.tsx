import { Dispatch, SetStateAction } from 'react';
import { FormattedMessage } from 'react-intl';

import { BodyShort, Button, Dialog, HStack } from '@navikt/ds-react';

interface Props {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    goToPreviousStep: () => void;
}

export const VilDuGåTilbakeModal = ({ isOpen, setIsOpen, goToPreviousStep }: Props) => {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Dialog.Popup id="vil-du-gå-tilbake-modal">
                <Dialog.Header>
                    <Dialog.Title>
                        <FormattedMessage id="uttaksplan.vilDuGåTilbakeModal.tittel" />
                    </Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <HStack gap="space-16">
                        <BodyShort>
                            <FormattedMessage id="uttaksplan.vilDuGåTilbakeModal.intro" />
                        </BodyShort>
                        <BodyShort>
                            <FormattedMessage id="uttaksplan.vilDuGåTilbakeModal.spørsmål" />
                        </BodyShort>
                    </HStack>
                </Dialog.Body>
                <Dialog.Footer>
                    <Button onClick={goToPreviousStep}>
                        <FormattedMessage id="uttaksplan.vilDuGåTilbakeModal.okLabel" />
                    </Button>
                    <Button variant="secondary" onClick={() => setIsOpen(false)}>
                        <FormattedMessage id="uttaksplan.vilDuGåTilbakeModal.avbrytLabel" />
                    </Button>
                </Dialog.Footer>
            </Dialog.Popup>
        </Dialog>
    );
};
