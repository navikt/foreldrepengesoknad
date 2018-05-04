import * as React from 'react';
import Applikasjonsside from '../Applikasjonsside';

class Velkommen extends React.Component {
    render() {
        return (
            <Applikasjonsside
                visSpråkvelger={true}
                dokumenttittel="Søknad om foreldrepenger">
                Velkommen
            </Applikasjonsside>
        );
    }
}

export default Velkommen;
