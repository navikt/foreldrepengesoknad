import { FunctionComponent } from 'react';
import { bemUtils, Block } from '@navikt/fp-common';
import { FormattedMessage } from 'react-intl';
import { BodyShort, Button, Heading, Modal } from '@navikt/ds-react';

import './slettUttaksplanModal.less';

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
            open={isOpen}
            closeButton={true}
            onClose={onClose}
            aria-label="Slett uttaksplanen din"
        >
            <div className={bem.element('content')}>
                <Block padBottom="l">
                    <Heading size="small">
                        <FormattedMessage id="uttaksplan.slettPlan.modal.tittel" />
                    </Heading>
                    <BodyShort>
                        <FormattedMessage id={innhold1Id} />
                    </BodyShort>
                    <br />
                    <BodyShort>
                        <FormattedMessage id={innhold2Id} />
                    </BodyShort>
                </Block>
                <div className={bem.element('knappWrapper')}>
                    <Button onClick={handleSlettUttaksplanModalBekreft}>
                        <FormattedMessage id="uttaksplan.slettPlan.slett" />
                    </Button>
                    <Button variant="secondary" onClick={onClose}>
                        <FormattedMessage id="uttaksplan.slettPlan.avbryt" />
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default SlettUttaksplanModal;
