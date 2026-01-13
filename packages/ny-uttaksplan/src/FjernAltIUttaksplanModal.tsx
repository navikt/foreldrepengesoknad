import { FormattedMessage } from 'react-intl';

import { BodyLong, Button, Dialog } from '@navikt/ds-react';

import { notEmpty } from '@navikt/fp-validation';

import { useUttaksplanRedigering } from './context/UttaksplanRedigeringContext';

export const FjernAltIUttaksplanModal = () => {
    const uttaksplanRedigering = useUttaksplanRedigering();

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
                    <BodyLong>
                        <FormattedMessage id="FjernAltIUttaksplanModal.FjernAlt.Modal.Body" />
                    </BodyLong>
                </Dialog.Body>
                <Dialog.Footer>
                    <Button
                        type="button"
                        variant="danger"
                        onClick={() => {
                            fjernAltIUttaksplan();
                            setVisFjernAltModal(false);
                        }}
                    >
                        <FormattedMessage id="FjernAltIUttaksplanModal.FjernAlt.Modal.Knapp.Bekreft" />
                    </Button>
                    <Dialog.CloseTrigger>
                        <Button type="button" variant="secondary">
                            <FormattedMessage id="FjernAltIUttaksplanModal.FjernAlt.Modal.Knapp.Avbryt" />
                        </Button>
                    </Dialog.CloseTrigger>
                </Dialog.Footer>
            </Dialog.Popup>
        </Dialog>
    );
};
