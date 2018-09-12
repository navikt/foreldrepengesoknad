import * as React from 'react';
import BekreftDialog from 'common/components/dialog/BekreftDialog';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';

export interface Props {
    synlig: boolean;
    onAvbrytSøknad: () => void;
    onFortsettSøknad: () => void;
}

const AvbrytSkjemaDialog: React.StatelessComponent<Props> = ({ synlig, onAvbrytSøknad, onFortsettSøknad }) => (
    <>
        <BekreftDialog
            isOpen={synlig}
            avbrytLabel="Nei, fortsett søknad"
            bekreftLabel="Ja, avbryt søknad"
            closeButton={false}
            contentLabel="Ønsker du å avbryte søknaden?"
            onBekreft={onAvbrytSøknad}
            onRequestClose={onFortsettSøknad}>
            <Veilederinfo type="advarsel">
                Ønsker du å avbryte søknaden? All informasjon i skjemaet vil bli slettet.
            </Veilederinfo>
        </BekreftDialog>
    </>
);

export default AvbrytSkjemaDialog;
