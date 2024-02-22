import { FunctionComponent, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, Button, Heading, Modal } from '@navikt/ds-react';

export interface Props {
    skalEndreNettleser: boolean;
}

export const ByttBrowserModal: FunctionComponent<Props> = ({ skalEndreNettleser }) => {
    const [isOpen, toggleIsOpen] = useState(skalEndreNettleser);
    const intl = useIntl();
    return (
        <Modal aria-label={intl.formatMessage({ id: 'sesjonUtløpt.tittel' })} open={isOpen} onClose={() => undefined}>
            <Modal.Body>
                <Heading size="medium">
                    <FormattedMessage id="byttBrowser.tittel" />
                </Heading>
                <BodyShort>
                    <FormattedMessage id="byttBrowser.ingress" />
                </BodyShort>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => toggleIsOpen(false)}>
                    <FormattedMessage id="ok" />
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ByttBrowserModal;
