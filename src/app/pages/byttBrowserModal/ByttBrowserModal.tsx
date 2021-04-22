import * as React from 'react';
import Modal from 'nav-frontend-modal';
import { Hovedknapp } from 'nav-frontend-knapper';
import { FormattedMessage, useIntl } from 'react-intl';
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';

import BEMHelper from 'common/util/bem';
import { shouldChangeBrowser } from 'common/util/browserUtils';
import { AdvarselIkon, intlUtils } from '@navikt/fp-common';

import './byttBrowserModal.less';

const ByttBrowserModal = () => {
    const [isOpen, toggleIsOpen] = React.useState(shouldChangeBrowser());
    const intl = useIntl();
    const cls = BEMHelper('bytt-browser-modal');
    return (
        <Modal
            className={cls.block}
            contentLabel={intlUtils(intl, 'sesjonUtløpt.tittel')}
            closeButton={false}
            isOpen={isOpen}
            onRequestClose={() => undefined}
        >
            <AdvarselIkon />
            <Systemtittel className="blokk-m">{<FormattedMessage id="byttBrowser.tittel" />}</Systemtittel>
            <Normaltekst className="blokk-m">{<FormattedMessage id="byttBrowser.ingress" />}</Normaltekst>
            <div className={cls.element('ok-knapp')}>
                <Hovedknapp className={cls.element('ok-knapp')} onClick={() => toggleIsOpen(false)}>
                    {<FormattedMessage id="ok" />}
                </Hovedknapp>
            </div>
        </Modal>
    );
};
export default ByttBrowserModal;
