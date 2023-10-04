import { FunctionComponent } from 'react';
import { bemUtils, Block } from '@navikt/fp-common';
import { FormattedMessage } from 'react-intl';
import { BodyShort, Button, Heading, Modal } from '@navikt/ds-react';

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
            open={isOpen}
            closeButton={true}
            onClose={onClose}
            aria-label="Tilbakestill uttaksplanen din"
        >
            <div className={bem.element('content')}>
                <Block padBottom="l">
                    <Heading size="small">
                        <FormattedMessage id="uttaksplan.resetPlan.innhold1" />
                    </Heading>
                    <BodyShort>
                        <FormattedMessage id="uttaksplan.resetPlan.innhold2" />
                    </BodyShort>
                </Block>
                <div className={bem.element('knappWrapper')}>
                    <Button onClick={handleResetUttaksplanModalBekreft}>
                        <FormattedMessage id="uttaksplan.resetPlan.slett" />
                    </Button>
                    <Button variant="secondary" onClick={onClose}>
                        <FormattedMessage id="uttaksplan.resetPlan.avbryt" />
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ResetUttaksplanModal;
