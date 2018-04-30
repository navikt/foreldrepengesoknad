import * as React from 'react';
import { Route, RouteComponentProps, withRouter } from 'react-router-dom';
import routeConfig from './../../util/routeConfig';
import AnnenForelderSteg from './annen-forelder/AnnenForelderSteg';
import RelasjonTilBarnAdopsjonSteg from './relasjon-til-barn-adopsjon/RelasjonTilBarnAdopsjonSteg';
import RelasjonTilBarnSteg from './relasjon-til-barn/RelasjonTilBarnSteg';
import stegConfig from './StegConfig';
import StegWrapper from '../../components/layout/Steg';

class Steg extends React.Component<RouteComponentProps<any>> {
    getAktivtSteg() {
        const { location } = this.props;
        const aktivtSteg = location.pathname;
        return stegConfig[aktivtSteg];
    }

    render() {
        const aktivtSteg = this.getAktivtSteg();
        if (aktivtSteg) {
            return (
                <StegWrapper tittel={aktivtSteg.tittel}>
                    <Route
                        path={`${routeConfig.ROUTE_PREFIX}/relasjon-til-barn`}
                        component={RelasjonTilBarnSteg}
                        key="relasjon-til-barn"
                    />
                    <Route
                        path={`${
                            routeConfig.ROUTE_PREFIX
                        }/relasjon-til-barn-adopsjon`}
                        component={RelasjonTilBarnAdopsjonSteg}
                        key="relasjon-til-barn-adopsjon"
                    />
                    <Route
                        path={`${routeConfig.ROUTE_PREFIX}/annen-forelder`}
                        component={AnnenForelderSteg}
                        key="annen-forelder"
                    />
                </StegWrapper>
            );
        } else {
            return null;
        }
    }
}

export default withRouter(Steg);
