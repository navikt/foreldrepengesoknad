import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { shouldChangeBrowser } from 'app/utils/browserUtils';
import { intlUtils } from '@navikt/fp-common';
import { BodyShort, Button, Heading, Modal } from '@navikt/ds-react';

const ByttBrowserModal: React.FunctionComponent = () => {
    const [isOpen, toggleIsOpen] = useState(shouldChangeBrowser());
    const intl = useIntl();

    return (
        <Modal aria-label={intlUtils(intl, 'byttBrowser.tittel')} open={isOpen} onClose={() => undefined}>
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
                <Button onClick={() => toggleIsOpen(false)}>
                    <FormattedMessage id="ok" />
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
export default ByttBrowserModal;
