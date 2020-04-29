import * as React from 'react';
import BekreftDialog from 'common/components/dialog/BekreftDialog';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
import Block from 'common/components/block/Block';
import { useIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';

export interface Props {
    synlig: boolean;
    onGåTilbake: () => void;
    onBliVærende: () => void;
}

const BekreftGåTilUttaksplanSkjemaDialog: React.StatelessComponent<Props> = ({ synlig, onGåTilbake, onBliVærende }) => {
    const intl = useIntl();
    return (
        <>
            <BekreftDialog
                isOpen={synlig}
                bekreftLabel={getMessage(intl, 'bekreftGåTilUttaksplanSkjemaDialog.okLabel')}
                avbrytLabel={getMessage(intl, 'bekreftGåTilUttaksplanSkjemaDialog.avbrytLabel')}
                contentLabel={getMessage(intl, 'bekreftGåTilUttaksplanSkjemaDialog.tittel')}
                closeButton={false}
                onBekreft={onGåTilbake}
                onRequestClose={onBliVærende}
            >
                <Block margin="xs">
                    <Undertittel tag="h1">{getMessage(intl, 'bekreftGåTilUttaksplanSkjemaDialog.tittel')}</Undertittel>
                </Block>
                <Block margin="xs">
                    <Normaltekst>{getMessage(intl, 'bekreftGåTilUttaksplanSkjemaDialog.intro')}</Normaltekst>
                </Block>
                <Normaltekst>{getMessage(intl, 'bekreftGåTilUttaksplanSkjemaDialog.spørsmål')}</Normaltekst>
            </BekreftDialog>
        </>
    );
};

export default BekreftGåTilUttaksplanSkjemaDialog;
