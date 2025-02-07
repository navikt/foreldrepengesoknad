import { FormattedMessage, useIntl } from 'react-intl';

import { BodyLong, Button, Modal } from '@navikt/ds-react';

interface Props {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export const TilpassPlanenModal = ({ open, onClose, onConfirm }: Props) => {
    const intl = useIntl();

    return (
        <Modal
            open={open}
            onClose={onClose}
            header={{
                heading: intl.formatMessage({ id: 'TilpassPlanenSteg.FjernAlt.Modal.Tittel' }),
                size: 'small',
                closeButton: false,
            }}
            width="small"
        >
            <Modal.Body>
                <BodyLong>
                    <FormattedMessage id="TilpassPlanenSteg.FjernAlt.Modal.Body" />
                </BodyLong>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    type="button"
                    variant="danger"
                    onClick={() => {
                        onConfirm();
                        onClose();
                    }}
                >
                    <FormattedMessage id="TilpassPlanenSteg.FjernAlt.Modal.Knapp.Bekreft" />
                </Button>
                <Button type="button" variant="secondary" onClick={onClose}>
                    <FormattedMessage id="TilpassPlanenSteg.FjernAlt.Modal.Knapp.Avbryt" />
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
