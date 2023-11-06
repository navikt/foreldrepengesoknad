import { FormattedMessage, useIntl } from 'react-intl';
import { Button, Heading, Modal, BodyShort } from '@navikt/ds-react';
import { FunctionComponent, useState } from 'react';

import './bytt-browser-modal.css';
import { AdvarselIkon, bemUtils, intlUtils } from '@navikt/fp-common';

export interface Props {
    skalEndreNettleser: boolean;
}

export const ByttBrowserModal: FunctionComponent<Props> = ({ skalEndreNettleser }) => {
    const [isOpen, toggleIsOpen] = useState(skalEndreNettleser);
    const intl = useIntl();
    const cls = bemUtils('bytt-browser-modal');
    return (
        <Modal
            className={cls.block}
            aria-label={intlUtils(intl, 'sesjonUtløpt.tittel')}
            closeButton={false}
            open={isOpen}
            onClose={() => undefined}
        >
            <AdvarselIkon />
            <Heading size="medium">{<FormattedMessage id="byttBrowser.tittel" />}</Heading>
            <BodyShort className={cls.element('tekst')}>{<FormattedMessage id="byttBrowser.ingress" />}</BodyShort>
            <div className={cls.element('ok-knapp')}>
                <Button variant="primary" className={cls.element('ok-knapp')} onClick={() => toggleIsOpen(false)}>
                    {<FormattedMessage id="ok" />}
                </Button>
            </div>
        </Modal>
    );
};

export default ByttBrowserModal;
