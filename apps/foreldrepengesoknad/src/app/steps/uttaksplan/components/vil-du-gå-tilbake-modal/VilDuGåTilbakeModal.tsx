import { bemUtils, Block, intlUtils } from '@navikt/fp-common';
import SøknadRoutes from 'app/routes/routes';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import ModalWrapper from 'nav-frontend-modal';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import React, { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

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
        <ModalWrapper
            className={bem.block}
            contentLabel={'Tittel'}
            closeButton={false}
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
        >
            <Block padBottom="l">
                <Undertittel tag="h1">{intlUtils(intl, 'uttaksplan.vilDuGåTilbakeModal.tittel')}</Undertittel>
            </Block>
            <Block padBottom="l">
                <Normaltekst>{intlUtils(intl, 'uttaksplan.vilDuGåTilbakeModal.intro')}</Normaltekst>
            </Block>
            <Block padBottom="l">
                <Normaltekst>{intlUtils(intl, 'uttaksplan.vilDuGåTilbakeModal.spørsmål')}</Normaltekst>
            </Block>
            <div className={bem.element('knapperad')}>
                <Hovedknapp
                    onClick={() => {
                        setIsOpen(false);
                        navigate(SøknadRoutes.UTTAKSPLAN_INFO);
                    }}
                >
                    <FormattedMessage id="uttaksplan.vilDuGåTilbakeModal.okLabel" />
                </Hovedknapp>
                <Knapp onClick={() => setIsOpen(false)}>
                    <FormattedMessage id="uttaksplan.vilDuGåTilbakeModal.avbrytLabel" />
                </Knapp>
            </div>
        </ModalWrapper>
    );
};

export default VilDuGåTilbakeModal;
