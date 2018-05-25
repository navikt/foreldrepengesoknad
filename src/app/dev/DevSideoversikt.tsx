import * as React from 'react';

import Applikasjonsside from '../connected-components/sider/Applikasjonsside';
import { Link } from 'react-router-dom';

import stegConfig from '../util/stegConfig';
import { soknadStegPath } from '../connected-components/steg/StegRoutes';
import Veilederinfo from '../components/veileder-info/Veilederinfo';

import './dev.less';
import routeConfig from '../util/routeConfig';

class DevSideoversikt extends React.Component<{}, {}> {
    render() {
        return (
            <Applikasjonsside visSpråkvelger={true}>
                <h1>Hjelpeside for utviklere</h1>
                <Veilederinfo>
                    Denne siden er kun for utvikling, og viser en oversikt over,
                    og lenke til de stegene vi har registrert. Status på de
                    ulike stegene må en sjekke med utviklere.
                </Veilederinfo>

                <h2>Eksempelsøknad</h2>
                <div className="blokk-l">
                    <ul className="dev-sider">
                        <li>
                            <Link
                                to={`${routeConfig.APP_ROUTE_PREFIX}/eksempel`}
                                className="lenke">
                                Gå til eksempelskjemaet
                            </Link>
                        </li>
                    </ul>
                </div>

                <h2>Frittstående sider</h2>
                <div className="blokk-l">
                    <ul className="dev-sider">
                        <li>
                            <Link
                                to={`${routeConfig.APP_ROUTE_PREFIX}/inngang`}
                                className="lenke">
                                Inngangsside (valg av situasjon)
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={`${routeConfig.APP_ROUTE_PREFIX}/velkommen`}
                                className="lenke">
                                Velkommen
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={`${
                                    routeConfig.APP_ROUTE_PREFIX
                                }/uttaksplan`}
                                className="lenke">
                                Uttaksplan
                            </Link>
                        </li>
                    </ul>
                </div>

                <h2>Enkeltsteg i søknadsskjemaet</h2>
                <ul className="dev-sider">
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
export default DevSideoversikt;
