import React, { FunctionComponent } from 'react';
import Modal from 'nav-frontend-modal';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { bemUtils, Block } from '@navikt/fp-common';

import './slettUttaksplanModal.less';
import { FormattedMessage } from 'react-intl';

interface Props {
    isOpen: boolean;
    erEndringssøknad: boolean;
    onClose: () => void;
    handleSlettUttaksplanModalBekreft: () => void;
}

const SlettUttaksplanModal: FunctionComponent<Props> = ({
    isOpen,
    erEndringssøknad,
    onClose,
    handleSlettUttaksplanModalBekreft,
}) => {
    const bem = bemUtils('slettUttaksplanModal');

    let innhold1Id = 'uttaksplan.slettPlan.innhold1.førstegangssøknad';
    let innhold2Id = 'uttaksplan.slettPlan.innhold2.førstegangssøknad';
    if (erEndringssøknad) {
        innhold1Id = 'uttaksplan.slettPlan.innhold1.endringssøknad';
        innhold2Id = 'uttaksplan.slettPlan.innhold2.endringssøknad';
    }

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
                        <FormattedMessage id="uttaksplan.slettPlan.modal.tittel" />
                    </Undertittel>
                    <Normaltekst>
                        <FormattedMessage id={innhold1Id} />
                    </Normaltekst>
                    <br />
                    <Normaltekst>
                        <FormattedMessage id={innhold2Id} />
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
