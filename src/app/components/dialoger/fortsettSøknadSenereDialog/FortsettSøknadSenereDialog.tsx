import * as React from 'react';
import BekreftDialog from 'common/components/dialog/BekreftDialog';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
import Block from 'common/components/block/Block';
import { injectIntl, IntlShape } from 'react-intl';
import getMessage from 'common/util/i18nUtils';

export interface Props {
    synlig: boolean;
    onFortsettSøknadSenere: () => void;
    onFortsettSøknad: () => void;
    intl: IntlShape;
}

const FortsettSøknadSenereDialog: React.StatelessComponent<Props> = ({
    intl,
    synlig,
    onFortsettSøknadSenere,
    onFortsettSøknad,
}) => (
    <>
        <BekreftDialog
            isOpen={synlig}
            bekreftLabel={getMessage(intl, 'fortsettSøknadSenereDialog.avbrytSøknadLabel')}
            avbrytLabel={getMessage(intl, 'fortsettSøknadSenereDialog.fortsettSøknadLabel')}
            closeButton={false}
            contentLabel={getMessage(intl, 'fortsettSøknadSenereDialog.tittel')}
            onBekreft={onFortsettSøknadSenere}
            størrelse="30"
            onRequestClose={onFortsettSøknad}
        >
            <Block margin="xs">
                <Undertittel tag="h1">{getMessage(intl, 'fortsettSøknadSenereDialog.tittel')}</Undertittel>
            </Block>
            <Block margin="xs">
                <Normaltekst>{getMessage(intl, 'fortsettSøknadSenereDialog.intro')}</Normaltekst>
            </Block>
            <Normaltekst>{getMessage(intl, 'fortsettSøknadSenereDialog.spørsmål')}</Normaltekst>
        </BekreftDialog>
    </>
);

export default injectIntl(FortsettSøknadSenereDialog);
