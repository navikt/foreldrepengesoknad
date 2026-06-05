import { FormattedMessage } from 'react-intl';

import { Alert, BodyLong, Button, Dialog, VStack } from '@navikt/ds-react';

import { notEmpty } from '@navikt/fp-validation';

import { useUttaksplanData } from './context/UttaksplanDataContext';
import { useUttaksplanRedigering } from './context/UttaksplanRedigeringContext';

export const FjernAltIUttaksplanModal = () => {
    const uttaksplanRedigering = useUttaksplanRedigering();
    const { erEndringssøknad } = useUttaksplanData();

    const { fjernAltIUttaksplan, visFjernAltModal, setVisFjernAltModal } = notEmpty(uttaksplanRedigering);

    return (
        <Dialog open={visFjernAltModal} onOpenChange={setVisFjernAltModal}>
            <Dialog.Popup id="FjernAltIUttaksplanModal">
                <Dialog.Header>
                    <Dialog.Title>
                        <FormattedMessage id="FjernAltIUttaksplanModal.FjernAlt.Modal.Tittel" />
                    </Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <VStack gap="space-8">
                        {erEndringssøknad && (
                            <Alert variant="warning">
                                <FormattedMessage id="FjernAltIUttaksplanModal.FjernAlt.Modal.Advarsel.Endringssøknad" />
                            </Alert>
                        )}
                        <BodyLong>
                            <FormattedMessage id="FjernAltIUttaksplanModal.FjernAlt.Modal.Body" />
                        </BodyLong>
                    </VStack>
                </Dialog.Body>
                <Dialog.Footer>
                    <Dialog.CloseTrigger>
                        <Button type="button" variant="secondary">
                            <FormattedMessage id="FjernAltIUttaksplanModal.FjernAlt.Modal.Knapp.Avbryt" />
                        </Button>
                    </Dialog.CloseTrigger>
                    <Button
                        type="button"
                        variant="primary"
                        onClick={() => {
                            fjernAltIUttaksplan();
                            setVisFjernAltModal(false);
                        }}
                    >
                        <FormattedMessage id="FjernAltIUttaksplanModal.FjernAlt.Modal.Knapp.Bekreft" />
                    </Button>
                </Dialog.Footer>
            </Dialog.Popup>
        </Dialog>
    );
};
