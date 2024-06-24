import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, Button, Heading, Modal } from '@navikt/ds-react';

import { shouldChangeBrowser } from 'app/utils/browserUtils';

const ByttBrowserModal: React.FunctionComponent = () => {
    const [isOpen, setIsOpen] = useState(shouldChangeBrowser());
    const intl = useIntl();

    return (
        <Modal aria-label={intl.formatMessage({ id: 'byttBrowser.tittel' })} open={isOpen} onClose={() => undefined}>
            <Modal.Header>
                <Heading size="medium">
                    <FormattedMessage id="byttBrowser.tittel" />
                </Heading>
            </Modal.Header>
            <Modal.Body>
                <BodyShort>
                    <FormattedMessage id="byttBrowser.ingress" />
                </BodyShort>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => setIsOpen(false)}>
                    <FormattedMessage id="ok" />
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
export default ByttBrowserModal;
