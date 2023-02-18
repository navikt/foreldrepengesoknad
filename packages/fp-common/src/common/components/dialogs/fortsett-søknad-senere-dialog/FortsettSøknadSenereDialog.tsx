import { Heading } from '@navikt/ds-react';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import intlHelper from '../../../utils/intlUtils';
import BekreftDialog from '../bekreft-dialog/BekreftDialog';

export interface Props {
    synlig: boolean;
    onFortsettSøknadSenere: () => void;
    onFortsettSøknad: () => void;
}

const FortsettSøknadSenereDialog: React.FunctionComponent<Props> = (props) => {
    const intl = useIntl();
    const { synlig, onFortsettSøknad, onFortsettSøknadSenere } = props;
    return (
        <BekreftDialog
            open={synlig}
            bekreftLabel={intlHelper(intl, 'fortsettSøknadSenereDialog.avbrytSøknadLabel')}
            avbrytLabel={intlHelper(intl, 'fortsettSøknadSenereDialog.fortsettSøknadLabel')}
            closeButton={false}
            aria-label={intlHelper(intl, 'fortsettSøknadSenereDialog.tittel')}
            onBekreft={onFortsettSøknadSenere}
            onClose={onFortsettSøknad}
        >
            <Heading size="small">
                <FormattedMessage id="fortsettSøknadSenereDialog.tittel" />
            </Heading>
            <p>
                <FormattedMessage id="fortsettSøknadSenereDialog.intro" />
            </p>
            <p>
                <FormattedMessage id="fortsettSøknadSenereDialog.spørsmål" />
            </p>
        </BekreftDialog>
    );
};
export default FortsettSøknadSenereDialog;
