import { FormattedMessage } from 'react-intl';

import { BodyLong, Button, Dialog } from '@navikt/ds-react';

import { notEmpty } from '@navikt/fp-validation';

import { useUttaksplanRedigering } from './context/UttaksplanRedigeringContext';

export const TilbakestillPlanModal = () => {
    const uttaksplanRedigering = useUttaksplanRedigering();

    const { tilbakestillUttaksplan, visTilbakestillModal, setVisTilbakestillModal } =
        notEmpty(uttaksplanRedigering);

    return (
        <Dialog open={visTilbakestillModal} onOpenChange={setVisTilbakestillModal}>
            <Dialog.Popup id="TilbakestillPlanModal">
                <Dialog.Header>
                    <Dialog.Title>
                        <FormattedMessage id="TilbakestillPlanModal.Tittel" />
                    </Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <BodyLong>
                        <FormattedMessage id="TilbakestillPlanModal.Body" />
                    </BodyLong>
                </Dialog.Body>
                <Dialog.Footer>
                    <Button
                        data-color="danger"
                        type="button"
                        variant="primary"
                        onClick={() => {
                            tilbakestillUttaksplan();
                            setVisTilbakestillModal(false);
                        }}
                    >
                        <FormattedMessage id="TilbakestillPlanModal.Knapp.Bekreft" />
                    </Button>
                    <Dialog.CloseTrigger>
                        <Button type="button" variant="secondary">
                            <FormattedMessage id="TilbakestillPlanModal.Knapp.Avbryt" />
                        </Button>
                    </Dialog.CloseTrigger>
                </Dialog.Footer>
            </Dialog.Popup>
        </Dialog>
    );
};
