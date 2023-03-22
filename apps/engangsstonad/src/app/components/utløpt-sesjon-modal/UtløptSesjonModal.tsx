import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { BodyShort, Button, Heading, Modal } from '@navikt/ds-react';
import BEMHelper from 'common/util/bem';
import getMessage from 'common/util/i18nUtils';
import Knappelenke from '../knappelenke/Knappelenke';
import { redirectToLogin } from 'util/login';
import { lenker } from 'util/lenker';
import { AdvarselIkon } from '@navikt/fp-common';

import './utløptSesjonModal.less';

const cls = BEMHelper('utløptSesjonModal');

interface Props {
    erÅpen: boolean;
}

const UtløptSesjonModal: React.FunctionComponent<Props> = ({ erÅpen }) => {
    const intl = useIntl();
    return (
        <Modal
            className={cls.className}
            aria-label={getMessage(intl, 'sesjonUtløpt.tittel')}
            closeButton={false}
            open={erÅpen}
            onClose={() => undefined}
        >
            <Modal.Content>
                <AdvarselIkon />
                <Heading size="medium" className="blokk-m">
                    <FormattedMessage id="sesjonUtløpt.tittel" />
                </Heading>
                <BodyShort className="blokk-m">
                    <FormattedMessage id="sesjonUtløpt.ingress" />
                </BodyShort>
                <div className={cls.element('valg')}>
                    <Knappelenke href={lenker.nav}>
                        <FormattedMessage id="sesjonUtløpt.avslutt" />
                    </Knappelenke>
                    <Button variant="secondary" onClick={() => redirectToLogin()}>
                        <FormattedMessage id="sesjonUtløpt.fortsett" />
                    </Button>
                </div>
            </Modal.Content>
        </Modal>
    );
};

export default UtløptSesjonModal;
