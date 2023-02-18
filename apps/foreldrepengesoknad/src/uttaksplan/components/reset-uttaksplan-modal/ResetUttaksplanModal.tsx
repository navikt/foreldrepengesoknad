import React, { FunctionComponent } from 'react';
import Modal from 'nav-frontend-modal';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { bemUtils, Block } from '@navikt/fp-common';
import { FormattedMessage } from 'react-intl';

import './resetUttaksplanModal.less';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    handleResetUttaksplanModalBekreft: () => void;
}

const ResetUttaksplanModal: FunctionComponent<Props> = ({ isOpen, onClose, handleResetUttaksplanModalBekreft }) => {
    const bem = bemUtils('resetUttaksplanModal');

    return (
        <Modal
            className={bem.block}
            isOpen={isOpen}
            closeButton={true}
            onRequestClose={onClose}
            contentLabel="Tilbakestill uttaksplanen din"
        >
            <div className={bem.element('content')}>
                <Block padBottom="l">
                    <Undertittel>
                        <FormattedMessage id="uttaksplan.resetPlan.innhold1" />
                    </Undertittel>
                    <Normaltekst>
                        <FormattedMessage id="uttaksplan.resetPlan.innhold2" />
                    </Normaltekst>
                </Block>
                <div className={bem.element('knappWrapper')}>
                    <Hovedknapp htmlType="button" onClick={handleResetUttaksplanModalBekreft}>
                        <FormattedMessage id="uttaksplan.resetPlan.slett" />
                    </Hovedknapp>
                    <Knapp onClick={onClose}>
                        <FormattedMessage id="uttaksplan.resetPlan.avbryt" />
                    </Knapp>
                </div>
            </div>
        </Modal>
    );
};

export default ResetUttaksplanModal;
