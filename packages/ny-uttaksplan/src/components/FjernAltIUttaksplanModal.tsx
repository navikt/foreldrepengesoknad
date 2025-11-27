import { FormattedMessage, useIntl } from 'react-intl';

import { BodyLong, Button, Modal } from '@navikt/ds-react';

import { notEmpty } from '@navikt/fp-validation';

import { useUttaksplanRedigering } from '../context/UttaksplanRedigeringContext';

export const FjernAltIUttaksplanModal = () => {
    const intl = useIntl();

    const uttaksplanRedigering = useUttaksplanRedigering();

    const { fjernAltIUttaksplan, visFjernAltModal, setVisFjernAltModal } = notEmpty(uttaksplanRedigering);

    return (
        <Modal
            open={visFjernAltModal}
            onClose={() => setVisFjernAltModal(false)}
            header={{
                heading: intl.formatMessage({ id: 'FjernAltIUttaksplanModal.FjernAlt.Modal.Tittel' }),
                size: 'small',
                closeButton: false,
            }}
            width="small"
        >
            <Modal.Body>
                <BodyLong>
                    <FormattedMessage id="FjernAltIUttaksplanModal.FjernAlt.Modal.Body" />
                </BodyLong>
            </Modal.Body>
            <Modal.Footer>
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
                <Button type="button" variant="secondary" onClick={() => setVisFjernAltModal(false)}>
                    <FormattedMessage id="FjernAltIUttaksplanModal.FjernAlt.Modal.Knapp.Avbryt" />
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
