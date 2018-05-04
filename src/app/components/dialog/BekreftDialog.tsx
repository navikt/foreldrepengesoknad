import * as React from 'react';
import Modal, { ModalProps } from 'nav-frontend-modal';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import './bekreftDialog.less';

export interface Props extends ModalProps {
    /** Kalles når bruker klikker bekreft-knapp  */
    onBekreft: () => void;
    /** Kalles når bruker klikker avbryt. Dersom denne ikke settes, brukes onRequestClose fra nav-frontend-modal */
    onAvbryt?: () => void;
    /** Label for bekreft-knapp. Default hentes fra intl: komponent.bekreftDialog.bekreftLabel */
    bekreftLabel?: string;
    /** Label for avbryt-knapp. Default hentes fra intl: komponent.bekreftDialog.avbrytLabel */
    avbrytLabel?: string;
}

class BekreftDialog extends React.Component<Props & InjectedIntlProps, {}> {
    render() {
        const {
            onAvbryt,
            onBekreft,
            avbrytLabel,
            bekreftLabel,
            intl,
            children,
            ...modalProps
        } = this.props;
        return (
            <Modal {...modalProps} className="bekreftDialog">
                <div className="blokk-m">{children}</div>
                <div className="bekreftDialog__knapperad">
                    <Hovedknapp
                        onClick={() => onBekreft()}
                        className="bekreftDialog__bekreftKnapp">
                        {this.props.bekreftLabel ||
                            intl.formatMessage({
                                id: 'komponent.bekreftDialog.bekreftLabel'
                            })}
                    </Hovedknapp>
                    <Knapp
                        onClick={() =>
                            onAvbryt ? onAvbryt() : this.props.onRequestClose()
                        }
                        className="bekreftDialog__avbrytKnapp">
                        {this.props.avbrytLabel ||
                            intl.formatMessage({
                                id: 'komponent.bekreftDialog.avbrytLabel'
                            })}
                    </Knapp>
                </div>
            </Modal>
        );
    }
}
export default injectIntl(BekreftDialog);
