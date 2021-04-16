import * as React from 'react';
import Modal from 'nav-frontend-modal';
import { Hovedknapp } from 'nav-frontend-knapper';
import classNames from 'classnames';
// import { FormattedMessage, useIntl } from 'react-intl';
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';

import BEMHelper from 'common/util/bem';
// import getMessage from 'common/util/i18nUtils';
import { shouldChangeBrowser } from 'common/util/browserUtils';
import AdvarselIkon from '../ikoner/AdvarselIkon';

import './byttBrowserModal.less';

const ByttBrowserModal = () => {
    const [isOpen, toggleIsOpen] = React.useState(shouldChangeBrowser());
    // const intl = useIntl();
    const cls = BEMHelper('bytt-browser-modal');
    return (
        <Modal
            className={cls.block}
            contentLabel={'sesjonUtløpt.tittel'}
            closeButton={false}
            isOpen={isOpen}
            onRequestClose={() => undefined}
        >
            <AdvarselIkon className={classNames(cls.element('ikon'), 'blokk-m')} />
            <Systemtittel className="blokk-m">{/* <FormattedMessage id="byttBrowser.tittel" /> */}</Systemtittel>
            <Normaltekst className="blokk-m">{/* <FormattedMessage id="byttBrowser.ingress" /> */}</Normaltekst>
            <div className={cls.element('ok-knapp')}>
                <Hovedknapp className={cls.element('ok-knapp')} onClick={() => toggleIsOpen(false)}>
                    {/* <FormattedMessage id="ok" /> */}
                </Hovedknapp>
            </div>
        </Modal>
    );
};
export default ByttBrowserModal;
