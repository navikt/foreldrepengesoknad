import * as React from 'react';
import Feilsidemelding from '../../../components/feilsideMelding/Feilsidemelding';
import Applikasjonsside from '../Applikasjonsside';
import DocumentTitle from 'react-document-title';

class GenerellFeil extends React.Component {
    render() {
        return (
            <Applikasjonsside visSpråkvelger={false}>
                <DocumentTitle title="Søknad om foreldrepenger" />
                <Feilsidemelding
                    tittel="Det oppstod en feil"
                    ingress="Litt mer informasjon om hva som gikk feil"
                />
            </Applikasjonsside>
        );
    }
}

export default GenerellFeil;
