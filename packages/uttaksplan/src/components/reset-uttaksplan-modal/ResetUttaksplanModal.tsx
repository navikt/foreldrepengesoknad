import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';

import { BodyShort, Button, Heading, Modal } from '@navikt/ds-react';

import { loggAmplitudeEvent } from '@navikt/fp-metrics';

import Block from '../../common/block/Block';
import planBemUtils from '../../utils/planBemUtils';
import './resetUttaksplanModal.less';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    handleResetUttaksplanModalBekreft: () => void;
}

const ResetUttaksplanModal: FunctionComponent<Props> = ({ isOpen, onClose, handleResetUttaksplanModalBekreft }) => {
    const bem = planBemUtils('resetUttaksplanModal');

    const onBekreft = () => {
        loggAmplitudeEvent({
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

export default ResetUttaksplanModal;
