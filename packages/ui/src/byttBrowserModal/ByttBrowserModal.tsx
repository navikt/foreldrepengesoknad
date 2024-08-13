import { FunctionComponent, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, Button, Heading, Modal } from '@navikt/ds-react';

import { shouldChangeBrowser } from '@navikt/fp-utils';

const ByttBrowserModal: FunctionComponent = () => {
    const [isOpen, setIsOpen] = useState(shouldChangeBrowser());
    const intl = useIntl();
    return (
        <Modal
            aria-label={intl.formatMessage({ id: 'ByttBrowserModal.Tittel' })}
            open={isOpen}
            onClose={() => undefined}
        >
            <Modal.Body>
                <Heading size="medium" level="2" className="blokk-m">
                    <FormattedMessage id="ByttBrowserModal.Utdatert" />
                </Heading>
                <BodyShort className="blokk-m">
                    <FormattedMessage id="ByttBrowserModal.Ingress" />
                </BodyShort>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => setIsOpen(false)}>
                    <FormattedMessage id="ByttBrowserModal.Ok" />
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ByttBrowserModal;
