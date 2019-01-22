import * as React from 'react';
import { FormattedMessage, FormattedHTMLMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import { Hovedknapp } from 'nav-frontend-knapper';
import { redirectToLogin } from 'app/util/routing/login';
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import AdvarselIkon from '../advarsel-ikon/AdvarselIkon';
import BEMHelper from 'common/util/bem';
import getMessage from 'common/util/i18nUtils';
import Knappelenke from '../knappelenke/Knappelenke';
import Modal from 'nav-frontend-modal';
import './utløptSesjonModal.less';

const cls = BEMHelper('utløptSesjonModal');
const AVSLUTT_HREF = 'https://familie.nav.no';

interface OwnProps {
    erÅpen: boolean;
}

type Props = OwnProps & InjectedIntlProps;

const UtløptSesjonModal = ({ erÅpen, intl }: Props) => {
    return (
        <Modal
            className={cls.className}
            contentLabel={getMessage(intl, 'sesjonUtløpt.tittel')}
            closeButton={false}
            isOpen={erÅpen}
            onRequestClose={() => undefined}>
            <AdvarselIkon />
            <Systemtittel className="blokk-m">
                <FormattedMessage id="sesjonUtløpt.tittel" />
            </Systemtittel>
            <Normaltekst className="blokk-m">
                <FormattedHTMLMessage id="sesjonUtløpt.ingress" />
            </Normaltekst>
            <div className={cls.element('valg')}>
                <Knappelenke href={AVSLUTT_HREF}>
                    <FormattedMessage id="sesjonUtløpt.avslutt" />
                </Knappelenke>
                <Hovedknapp onClick={redirectToLogin}>
                    <FormattedMessage id="sesjonUtløpt.fortsett" />
                </Hovedknapp>
            </div>
        </Modal>
    );
};

export default injectIntl(UtløptSesjonModal);
