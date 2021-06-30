import * as React from 'react';
import Modal from 'nav-frontend-modal';
import { Hovedknapp } from 'nav-frontend-knapper';
import { FormattedMessage, useIntl } from 'react-intl';
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import { AdvarselIkon, bemUtils, intlUtils } from '@navikt/fp-common';
import { shouldChangeBrowser } from 'app/utils/browserUtils';

import './byttBrowserModal.less';

interface Props {
    skalEndreNettleser: boolean;
}

export const ByttBrowserModalImpl: React.FunctionComponent<Props> = ({ skalEndreNettleser }) => {
    const [isOpen, toggleIsOpen] = React.useState(skalEndreNettleser);
    const intl = useIntl();
    const cls = bemUtils('bytt-browser-modal');
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

const ByttBrowserModal = () => <ByttBrowserModalImpl skalEndreNettleser={shouldChangeBrowser()} />;

export default ByttBrowserModal;
