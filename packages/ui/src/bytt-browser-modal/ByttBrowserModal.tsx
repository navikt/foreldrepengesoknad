import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { BodyShort, Button, Dialog, Heading } from '@navikt/ds-react';

import { shouldChangeBrowser } from '@navikt/fp-utils';

export const ByttBrowserModal = () => {
    const [isOpen, setIsOpen] = useState(shouldChangeBrowser());
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Dialog.Popup>
                <Dialog.Body>
                    <Heading size="medium" level="2" className="blokk-m">
                        <FormattedMessage id="ByttBrowserModal.Utdatert" />
                    </Heading>
                    <BodyShort className="blokk-m">
                        <FormattedMessage id="ByttBrowserModal.Ingress" />
                    </BodyShort>
                </Dialog.Body>
                <Dialog.Footer>
                    <Dialog.CloseTrigger>
                        <Button variant="primary">
                            <FormattedMessage id="ByttBrowserModal.Ok" />
                        </Button>
                    </Dialog.CloseTrigger>
                </Dialog.Footer>
            </Dialog.Popup>
        </Dialog>
    );
};
