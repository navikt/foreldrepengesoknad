import { bemUtils, Block, intlUtils } from '@navikt/fp-common';
import SøknadRoutes from 'app/routes/routes';
import { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { BodyShort, Button, Heading, Modal } from '@navikt/ds-react';

import './vilDuGåTilbakeModal.less';

interface Props {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const VilDuGåTilbakeModal: FunctionComponent<Props> = ({ isOpen, setIsOpen }) => {
    const intl = useIntl();
    const bem = bemUtils('vilDuGåTilbakeModal');
    const navigate = useNavigate();

    return (
        <Modal
            className={bem.block}
            aria-label={'Vil du gå tilbake'}
            closeButton={false}
            open={isOpen}
            onClose={() => setIsOpen(false)}
        >
            <Block padBottom="l">
                <Heading size="small" as="h1">
                    {intlUtils(intl, 'uttaksplan.vilDuGåTilbakeModal.tittel')}
                </Heading>
            </Block>
            <Block padBottom="l">
                <BodyShort>{intlUtils(intl, 'uttaksplan.vilDuGåTilbakeModal.intro')}</BodyShort>
            </Block>
            <Block padBottom="l">
                <BodyShort>{intlUtils(intl, 'uttaksplan.vilDuGåTilbakeModal.spørsmål')}</BodyShort>
            </Block>
            <div className={bem.element('knapperad')}>
                <Button
                    onClick={() => {
                        setIsOpen(false);
                        navigate(SøknadRoutes.UTTAKSPLAN_INFO);
                    }}
                >
                    <FormattedMessage id="uttaksplan.vilDuGåTilbakeModal.okLabel" />
                </Button>
                <Button variant="secondary" onClick={() => setIsOpen(false)}>
                    <FormattedMessage id="uttaksplan.vilDuGåTilbakeModal.avbrytLabel" />
                </Button>
            </div>
        </Modal>
    );
};

export default VilDuGåTilbakeModal;
