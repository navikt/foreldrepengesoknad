import { FunctionComponent, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, Button, Heading, Modal } from '@navikt/ds-react';

import { intlUtils } from '@navikt/fp-common';

export interface Props {
    skalEndreNettleser: boolean;
}

export const ByttBrowserModal: FunctionComponent<Props> = ({ skalEndreNettleser }) => {
    const [isOpen, setIsOpen] = useState(skalEndreNettleser);
    const intl = useIntl();
    return (
        <Modal aria-label={intlUtils(intl, 'sesjonUtløpt.tittel')} open={isOpen} onClose={() => undefined}>
            <Modal.Body>
                <Heading size="medium" level="2" className="blokk-m">
                    <FormattedMessage id="byttBrowser.tittel" />
                </Heading>
                <BodyShort className="blokk-m">
                    <FormattedMessage id="byttBrowser.ingress" />
                </BodyShort>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => setIsOpen(false)}>
                    <FormattedMessage id="ok" />
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ByttBrowserModal;
