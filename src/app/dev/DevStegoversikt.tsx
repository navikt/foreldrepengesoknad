import * as React from 'react';

import Applikasjonsside from '../connected-components/sider/Applikasjonsside';
import { Link } from 'react-router-dom';

import stegConfig from '../util/stegConfig';
import { soknadStegPath } from '../connected-components/steg/StegRoutes';
import Veilederinfo from '../components/veileder-info/Veilederinfo';

import './dev.less';

class DevStegoversikt extends React.Component<{}, {}> {
    render() {
        return (
            <Applikasjonsside visSpråkvelger={true}>
                <h1>Steg i Foreldrepengesøknad</h1>
                <Veilederinfo>
                    Denne siden er kun for utvikling, og viser en oversikt over,
                    og lenke til de stegene vi har registrert. Status på de
                    ulike stegene må en sjekke med utviklere.
                </Veilederinfo>
                <ul className="stegoversikt">
                    {Object.keys(stegConfig).map((key, index) => (
                        <li key={index}>
                            <Link to={soknadStegPath(key)} className="lenke">
                                {stegConfig[key].tittel}
                            </Link>
                        </li>
                    ))}
                </ul>
            </Applikasjonsside>
        );
    }
}
export default DevStegoversikt;
