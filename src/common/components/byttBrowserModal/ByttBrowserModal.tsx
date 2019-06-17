import * as React from 'react';
import Modal from 'nav-frontend-modal';
import { Hovedknapp } from 'nav-frontend-knapper';
import classNames from 'classnames';
import { FormattedMessage, FormattedHTMLMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';

import BEMHelper from 'common/util/bem';
import getMessage from 'common/util/i18nUtils';
import { shouldChangeBrowser } from 'common/util/browserUtils';
import AdvarselIkon from '../ikoner/AdvarselIkon';

import './byttBrowserModal.less';

type Props = InjectedIntlProps;

const ByttBrowserModal: React.FunctionComponent<Props> = ({ intl }) => {
    const [isOpen, toggleIsOpen] = React.useState(shouldChangeBrowser());
    const cls = BEMHelper('bytt-browser-modal');
    return (
        <Modal
            className={cls.block}
            contentLabel={getMessage(intl, 'sesjonUtløpt.tittel')}
            closeButton={false}
            isOpen={isOpen}
            onRequestClose={() => undefined}>
            <AdvarselIkon className={classNames(cls.element('ikon'), 'blokk-m')} />
            <Systemtittel className="blokk-m">
                <FormattedHTMLMessage id="byttBrowser.tittel" />
            </Systemtittel>
            <Normaltekst className="blokk-m">
                <FormattedHTMLMessage id="byttBrowser.ingress" />
            </Normaltekst>
            <div className={cls.element('ok-knapp')}>
                <Hovedknapp className={cls.element('ok-knapp')} onClick={() => toggleIsOpen(false)}>
                    <FormattedMessage id="ok" />
                </Hovedknapp>
            </div>
        </Modal>
    );
};
export default injectIntl(ByttBrowserModal);
