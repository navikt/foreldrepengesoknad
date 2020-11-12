import * as React from 'react';
import BekreftDialog from 'common/components/dialog/BekreftDialog';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
import Block from 'common/components/block/Block';
import { useIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';

export interface Props {
    synlig: boolean;
    onSlett: () => void;
    onAngre: () => void;
}

const BekreftTilbakestillUttaksplanDialog: React.FunctionComponent<Props> = ({ synlig, onAngre, onSlett }) => {
    const intl = useIntl();
    return (
        <>
            <BekreftDialog
                størrelse="30"
                isOpen={synlig}
                bekreftLabel={getMessage(intl, 'bekreftTilbakestillUttaksplanDialog.okLabel')}
                avbrytLabel={getMessage(intl, 'bekreftTilbakestillUttaksplanDialog.avbrytLabel')}
                contentLabel={getMessage(intl, 'bekreftTilbakestillUttaksplanDialog.tittel')}
                closeButton={false}
                onBekreft={onSlett}
                onRequestClose={onAngre}
            >
                <Block margin="xs">
                    <Undertittel tag="h1">{getMessage(intl, 'bekreftTilbakestillUttaksplanDialog.tittel')}</Undertittel>
                </Block>
                <Block margin="xs">
                    <Normaltekst>{getMessage(intl, 'bekreftTilbakestillUttaksplanDialog.tekst')}</Normaltekst>
                </Block>
            </BekreftDialog>
        </>
    );
};

export default BekreftTilbakestillUttaksplanDialog;
