import * as React from 'react';
import BekreftDialog from 'common/components/dialog/BekreftDialog';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
import Block from 'common/components/block/Block';
import { injectIntl, IntlShape } from 'react-intl';
import getMessage from 'common/util/i18nUtils';

export interface Props {
    synlig: boolean;
    onAvbrytSøknad: () => void;
    onFortsettSøknad: () => void;
    intl: IntlShape;
}

const AvbrytSøknadDialog: React.StatelessComponent<Props> = ({ intl, synlig, onAvbrytSøknad, onFortsettSøknad }) => (
    <>
        <BekreftDialog
            isOpen={synlig}
            bekreftLabel={getMessage(intl, 'avbrytSøknadDialog.avbrytSøknadLabel')}
            avbrytLabel={getMessage(intl, 'avbrytSøknadDialog.fortsettSøknadLabel')}
            closeButton={false}
            contentLabel={getMessage(intl, 'avbrytSøknadDialog.tittel')}
            onBekreft={onAvbrytSøknad}
            størrelse="30"
            onRequestClose={onFortsettSøknad}
        >
            <Block margin="xs">
                <Undertittel tag="h1">{getMessage(intl, 'avbrytSøknadDialog.tittel')}</Undertittel>
            </Block>
            <Block margin="xs">
                <Normaltekst>{getMessage(intl, 'avbrytSøknadDialog.intro')}</Normaltekst>
            </Block>
            <Normaltekst>{getMessage(intl, 'avbrytSøknadDialog.spørsmål')}</Normaltekst>
        </BekreftDialog>
    </>
);

export default injectIntl(AvbrytSøknadDialog);
