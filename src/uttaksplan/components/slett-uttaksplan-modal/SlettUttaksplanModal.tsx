import React, { FunctionComponent } from 'react';
import Modal from 'nav-frontend-modal';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { bemUtils, Block } from '@navikt/fp-common';

import './slettUttaksplanModal.less';
import { FormattedMessage } from 'react-intl';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    handleSlettUttaksplanModalBekreft: () => void;
}

const SlettUttaksplanModal: FunctionComponent<Props> = ({ isOpen, onClose, handleSlettUttaksplanModalBekreft }) => {
    const bem = bemUtils('slettUttaksplanModal');

    return (
        <Modal
            className={bem.block}
            isOpen={isOpen}
            closeButton={true}
            onRequestClose={onClose}
            contentLabel="Slett uttaksplanen din"
        >
            <div className={bem.element('content')}>
                <Block padBottom="l">
                    <Undertittel>
                        <FormattedMessage id="uttaksplan.slettPlan.innhold1" />
                    </Undertittel>
                    <Normaltekst>
                        <FormattedMessage id="uttaksplan.slettPlan.innhold2" />
                    </Normaltekst>
                </Block>
                <div className={bem.element('knappWrapper')}>
                    <Hovedknapp htmlType="button" onClick={handleSlettUttaksplanModalBekreft}>
                        <FormattedMessage id="uttaksplan.slettPlan.slett" />
                    </Hovedknapp>
                    <Knapp onClick={onClose}>
                        <FormattedMessage id="uttaksplan.slettPlan.avbryt" />
                    </Knapp>
                </div>
            </div>
        </Modal>
    );
};

export default SlettUttaksplanModal;
