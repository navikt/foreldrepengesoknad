import { Heading } from '@navikt/ds-react';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import intlHelper from '../../../utils/intlUtils';
import BekreftDialog from '../bekreft-dialog/BekreftDialog';

export interface AvbrytSøknadDialogProps {
    synlig: boolean;
    onAvbrytSøknad: () => void;
    onFortsettSøknad: () => void;
}

// Kan ikke ha ø i fil- eller foldernavn pga Storybook vite-builder
const AvbrytSøknadDialog: React.FunctionComponent<AvbrytSøknadDialogProps> = (props) => {
    const intl = useIntl();
    const { synlig, onFortsettSøknad, onAvbrytSøknad } = props;
    return (
        <BekreftDialog
            open={synlig}
            bekreftLabel={intlHelper(intl, 'avbrytSøknadDialog.avbrytSøknadLabel')}
            avbrytLabel={intlHelper(intl, 'avbrytSøknadDialog.fortsettSøknadLabel')}
            closeButton={false}
            aria-label={intlHelper(intl, 'avbrytSøknadDialog.tittel')}
            onBekreft={onAvbrytSøknad}
            onClose={onFortsettSøknad}
        >
            <Heading level="1" size="small">
                <FormattedMessage id="avbrytSøknadDialog.tittel" />
            </Heading>
            <p>
                <FormattedMessage id="avbrytSøknadDialog.intro" />
            </p>
            <p>
                <FormattedMessage id="avbrytSøknadDialog.spørsmål" />
            </p>
        </BekreftDialog>
    );
};

export default AvbrytSøknadDialog;
