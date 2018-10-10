import * as React from 'react';
import BekreftDialog from 'common/components/dialog/BekreftDialog';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
import Block from 'common/components/block/Block';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';

export interface Props {
    synlig: boolean;
    onSlett: () => void;
    onAngre: () => void;
}

const BekreftSlettUttaksplanDialog: React.StatelessComponent<Props & InjectedIntlProps> = ({
    intl,
    synlig,
    onAngre,
    onSlett
}) => (
    <>
        <BekreftDialog
            størrelse="30"
            isOpen={synlig}
            bekreftLabel={getMessage(intl, 'bekreftSlettUttaksplanDialog.okLabel')}
            avbrytLabel={getMessage(intl, 'bekreftSlettUttaksplanDialog.avbrytLabel')}
            contentLabel={getMessage(intl, 'bekreftSlettUttaksplanDialog.tittel')}
            closeButton={false}
            onBekreft={onSlett}
            onRequestClose={onAngre}>
            <Block margin="xs">
                <Undertittel tag="h1">{getMessage(intl, 'bekreftSlettUttaksplanDialog.tittel')}</Undertittel>
            </Block>
            <Block margin="xs">
                <Normaltekst>{getMessage(intl, 'bekreftSlettUttaksplanDialog.tekst')}</Normaltekst>
            </Block>
        </BekreftDialog>
    </>
);

export default injectIntl(BekreftSlettUttaksplanDialog);
