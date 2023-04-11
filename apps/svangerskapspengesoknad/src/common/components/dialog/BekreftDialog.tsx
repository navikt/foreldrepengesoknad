import React, { FunctionComponent, ReactNode } from 'react';
import classnames from 'classnames';

import Knapperad from 'common/components/knapperad/Knapperad';
import BEMHelper from 'common/util/bem';
import { useIntl } from 'react-intl';

import './bekreftDialog.less';
import { Button, Heading, Modal } from '@navikt/ds-react';

export interface Props {
    tittel?: string;
    /** Kalles når bruker klikker bekreft-knapp  */
    onBekreft: () => void;
    /** Kalles når bruker klikker avbryt. Dersom denne ikke settes, brukes onRequestClose */
    onAvbryt?: () => void;
    /** Label for bekreft-knapp. Default hentes fra intl: komponent.bekreftDialog.bekreftLabel */
    bekreftLabel?: string;
    /** Label for avbryt-knapp. Default hentes fra intl: komponent.bekreftDialog.avbrytLabel */
    avbrytLabel?: string;
    /** Maks bredde */
    størrelse: undefined | '30';
    children: ReactNode;
    isOpen: boolean;
    onRequestClose: () => void;
}

const bem = BEMHelper('bekreftDialog');

const BekreftDialog: FunctionComponent<Props> = ({
    tittel,
    onAvbryt,
    onBekreft,
    avbrytLabel,
    bekreftLabel,
    children,
    størrelse,
    isOpen,
    onRequestClose,
}) => {
    const intl = useIntl();

    return (
        <Modal
            shouldCloseOnOverlayClick={false}
            open={isOpen}
            className={classnames(bem.block, størrelse ? bem.modifier(`size-${størrelse}`) : undefined)}
            onClose={onRequestClose}
        >
            <Modal.Content>
                {isOpen && (
                    <>
                        {tittel && (
                            <Heading size="medium" className="blokk-s">
                                {tittel}
                            </Heading>
                        )}
                        <div className="blokk-m">{children}</div>
                        <Knapperad>
                            <Button
                                variant="primary"
                                onClick={() => onBekreft()}
                                className="bekreftDialog__bekreftKnapp"
                            >
                                {bekreftLabel ||
                                    intl.formatMessage({
                                        id: 'komponent.bekreftDialog.bekreftLabel',
                                    })}
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={() => (onAvbryt ? onAvbryt() : onRequestClose())}
                                className="bekreftDialog__avbrytKnapp"
                            >
                                {avbrytLabel ||
                                    intl.formatMessage({
                                        id: 'komponent.bekreftDialog.avbrytLabel',
                                    })}
                            </Button>
                        </Knapperad>
                    </>
                )}
            </Modal.Content>
        </Modal>
    );
};

export default BekreftDialog;
