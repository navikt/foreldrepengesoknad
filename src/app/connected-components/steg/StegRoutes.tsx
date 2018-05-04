import * as React from 'react';
import { Redirect, Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import routeConfig from './../../util/routeConfig';
import AnnenForelderSteg from './annen-forelder/AnnenForelderSteg';
import RelasjonTilBarnAdopsjonSteg from './relasjon-til-barn-adopsjon/RelasjonTilBarnAdopsjonSteg';
import RelasjonTilBarnSteg from './relasjon-til-barn/RelasjonTilBarnSteg';
import { StegID } from '../../util/stegConfig';
import Applikasjonsside from '../applikasjonsside/Applikasjonsside';

class Steg extends React.Component<RouteComponentProps<any>> {
    render() {
        return (
            <Applikasjonsside visSpråkvelger={false}>
                <Switch>
                    <Route
                        path={`${routeConfig.SOKNAD_ROUTE_PREFIX}/${StegID.RELASJON_TIL_BARN}`}
                        component={RelasjonTilBarnSteg}
                        key={StegID.RELASJON_TIL_BARN}
                    />
                    <Route
                        path={`${routeConfig.SOKNAD_ROUTE_PREFIX}/${
                            StegID.RELASJON_TIL_BARN_ADOPSJON
                        }`}
                        component={RelasjonTilBarnAdopsjonSteg}
                        key={StegID.RELASJON_TIL_BARN_ADOPSJON}
                    />
                    <Route
                        path={`${routeConfig.SOKNAD_ROUTE_PREFIX}/${StegID.ANNEN_FORELDER}`}
                        component={AnnenForelderSteg}
                        key={StegID.ANNEN_FORELDER}
                    />
                    <Redirect
                        to={`${routeConfig.SOKNAD_ROUTE_PREFIX}/${StegID.RELASJON_TIL_BARN}`}
                    />
                </Switch>
            </Applikasjonsside>
        );
    }
}

export default withRouter(Steg);
