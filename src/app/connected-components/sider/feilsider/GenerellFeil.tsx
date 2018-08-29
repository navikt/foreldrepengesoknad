import * as React from 'react';
import Applikasjonsside from '../Applikasjonsside';
import DocumentTitle from 'react-document-title';
import Feilsidemelding from 'common/components/feilsidemelding/Feilsidemelding';

class GenerellFeil extends React.Component {
    render() {
        return (
            <Applikasjonsside visSpråkvelger={false}>
                <DocumentTitle title="Søknad om foreldrepenger" />
                <Feilsidemelding tittel="Det oppstod en feil" ingress="Litt mer informasjon om hva som gikk feil" />
            </Applikasjonsside>
        );
    }
}

export default GenerellFeil;
