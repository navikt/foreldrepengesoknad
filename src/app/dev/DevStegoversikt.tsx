import * as React from 'react';

import Applikasjonsside from '../connected-components/sider/Applikasjonsside';
import { Link } from 'react-router-dom';

import stegConfig from '../util/stegConfig';
import { soknadStegPath } from '../connected-components/steg/StegRoutes';

class DevStegoversikt extends React.Component<{}, {}> {
    render() {
        return (
            <Applikasjonsside>
                <h1>Steg i Foreldrepengesøknad</h1>
                <ul>
                    {Object.keys(stegConfig).map((key, index) => (
                        <li>
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
