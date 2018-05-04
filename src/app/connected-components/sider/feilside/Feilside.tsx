import * as React from 'react';
import Feilsidemelding from '../../../components/feilsideMelding/Feilsidemelding';
import Applikasjonsside from '../Applikasjonsside';

class Feilside extends React.Component {
    render() {
        return (
            <Applikasjonsside
                visSpråkvelger={false}
                dokumenttittel="Søknad om foreldrepenger">
                <Feilsidemelding
                    tittel="Det oppstod en feil"
                    ingress="Litt mer informasjon om hva som gikk feil"
                />
            </Applikasjonsside>
        );
    }
}

export default Feilside;
