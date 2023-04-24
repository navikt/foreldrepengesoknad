import { FormattedMessage, useIntl } from 'react-intl';
import { Button, Heading, Modal } from '@navikt/ds-react';
import { AdvarselIkon, bemUtils, intlUtils } from '@navikt/fp-common';
import { BodyShort } from '@navikt/ds-react';

import './byttBrowserModal.less';
import { FunctionComponent, useState } from 'react';

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
            <Heading size="medium" className="blokk-m">
                {<FormattedMessage id="byttBrowser.tittel" />}
            </Heading>
            <BodyShort className="blokk-m">{<FormattedMessage id="byttBrowser.ingress" />}</BodyShort>
            <div className={cls.element('ok-knapp')}>
                <Button variant="primary" className={cls.element('ok-knapp')} onClick={() => toggleIsOpen(false)}>
                    {<FormattedMessage id="ok" />}
                </Button>
            </div>
        </Modal>
    );
};

export default ByttBrowserModal;
