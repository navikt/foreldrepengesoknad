import * as React from 'react';
import classnames from 'classnames';
import Modal, { ModalProps } from 'nav-frontend-modal';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import Knapperad from 'common/components/knapperad/Knapperad';
import { Systemtittel } from 'nav-frontend-typografi';
import BEMHelper from 'common/util/bem';

import './bekreftDialog.less';

export interface Props extends ModalProps {
    tittel?: string;
    /** Kalles når bruker klikker bekreft-knapp  */
    onBekreft: () => void;
    /** Kalles når bruker klikker avbryt. Dersom denne ikke settes, brukes onRequestClose fra nav-frontend-modal */
    onAvbryt?: () => void;
    /** Label for bekreft-knapp. Default hentes fra intl: komponent.bekreftDialog.bekreftLabel */
    bekreftLabel?: string;
    /** Label for avbryt-knapp. Default hentes fra intl: komponent.bekreftDialog.avbrytLabel */
    avbrytLabel?: string;
    /** Maks bredde */
    størrelse?: '30';
}

const bem = BEMHelper('bekreftDialog');

class BekreftDialog extends React.Component<Props & InjectedIntlProps, {}> {
    render() {
        const {
            tittel,
            onAvbryt,
            onBekreft,
            avbrytLabel,
            bekreftLabel,
            intl,
            children,
            størrelse,
            ...modalProps
        } = this.props;
        return (
            <Modal
                {...modalProps}
                className={classnames(bem.block, størrelse ? bem.modifier(`size-${størrelse}`) : undefined)}
            >
                {this.props.isOpen && (
                    <>
                        {tittel && <Systemtittel className="blokk-s">{tittel}</Systemtittel>}
                        <div className="blokk-m">{children}</div>
                        <Knapperad>
                            <Hovedknapp onClick={() => onBekreft()} className="bekreftDialog__bekreftKnapp">
                                {this.props.bekreftLabel ||
                                    intl.formatMessage({
                                        id: 'komponent.bekreftDialog.bekreftLabel'
                                    })}
                            </Hovedknapp>
                            <Knapp
                                onClick={() => (onAvbryt ? onAvbryt() : this.props.onRequestClose())}
                                className="bekreftDialog__avbrytKnapp"
                            >
                                {this.props.avbrytLabel ||
                                    intl.formatMessage({
                                        id: 'komponent.bekreftDialog.avbrytLabel'
                                    })}
                            </Knapp>
                        </Knapperad>
                    </>
                )}
            </Modal>
        );
    }
}
export default injectIntl(BekreftDialog);
