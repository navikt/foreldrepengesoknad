import * as React from 'react';
import BekreftDialog from 'common/components/dialog/BekreftDialog';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
import Block from 'common/components/block/Block';

export interface Props {
    synlig: boolean;
    onAvbrytSøknad: () => void;
    onFortsettSøknad: () => void;
}

const AvbrytSøknadDialog: React.StatelessComponent<Props> = ({ synlig, onAvbrytSøknad, onFortsettSøknad }) => (
    <>
        <BekreftDialog
            isOpen={synlig}
            bekreftLabel="Ja, avbryt søknad"
            avbrytLabel="Nei"
            closeButton={false}
            contentLabel="Ønsker du å avbryte søknaden?"
            onBekreft={onAvbrytSøknad}
            onRequestClose={onFortsettSøknad}>
            <Block margin="xs">
                <Undertittel tag="h1">Avbryt søknad</Undertittel>
            </Block>
            <Block margin="xs">
                <Normaltekst>Dersom du avbryter søknaden vil all informasjon i skjemaet bli slettet.</Normaltekst>
            </Block>
            <Normaltekst>Ønsker du å avbryte søknaden?</Normaltekst>
        </BekreftDialog>
    </>
);

export default AvbrytSøknadDialog;
