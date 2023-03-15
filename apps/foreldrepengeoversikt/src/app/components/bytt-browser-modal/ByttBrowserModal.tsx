import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { shouldChangeBrowser } from 'app/utils/browserUtils';
import { bemUtils, intlUtils } from '@navikt/fp-common';
import { BodyShort, Button, Heading, Modal } from '@navikt/ds-react';
import { Warning } from '@navikt/ds-icons';

import './byttBrowserModal.less';

const ByttBrowserModal: React.FunctionComponent = () => {
    const [isOpen, toggleIsOpen] = React.useState(shouldChangeBrowser());
    const intl = useIntl();
    const cls = bemUtils('bytt-browser-modal');

    return (
        <Modal
            className={cls.block}
            aria-label={intlUtils(intl, 'byttBrowser.tittel')}
            closeButton={false}
            open={isOpen}
            onClose={() => undefined}
        >
            <Warning />
            <Heading size="medium">
                <FormattedMessage id="byttBrowser.tittel" />
            </Heading>
            <BodyShort>
                <FormattedMessage id="byttBrowser.ingress" />
            </BodyShort>
            <div className={cls.element('ok-knapp')}>
                <Button onClick={() => toggleIsOpen(false)}>
                    <FormattedMessage id="ok" />
                </Button>
            </div>
        </Modal>
    );
};
export default ByttBrowserModal;
