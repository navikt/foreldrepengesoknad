import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';

import { BodyShort, Button, Heading, Modal } from '@navikt/ds-react';

import { loggUmamiEvent } from '@navikt/fp-metrics';

import Block from '../../common/block/Block';
import planBemUtils from '../../utils/planBemUtils';
import './resetUttaksplanModal.less';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    handleResetUttaksplanModalBekreft: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-restricted-types
const ResetUttaksplanModal: FunctionComponent<Props> = ({ isOpen, onClose, handleResetUttaksplanModalBekreft }) => {
    const bem = planBemUtils('resetUttaksplanModal');

    const onBekreft = () => {
        loggUmamiEvent({
            origin: 'foreldrepengesoknad',
            eventName: 'button klikk',
            eventData: { tittel: 'tilbakestillPlan' },
        });
        handleResetUttaksplanModalBekreft();
    };

    return (
        <Modal className={bem.block} open={isOpen} onClose={onClose} aria-label="Tilbakestill uttaksplanen din">
            <Modal.Body>
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
                        <Button onClick={onBekreft}>
                            <FormattedMessage id="uttaksplan.resetPlan.slett" />
                        </Button>
                        <Button variant="secondary" onClick={onClose}>
                            <FormattedMessage id="uttaksplan.resetPlan.avbryt" />
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};
// eslint-disable-next-line import/no-default-export
export default ResetUttaksplanModal;
