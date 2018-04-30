import * as React from 'react';
import Søknadstittel from '../components/søknadstittel/Søknadstittel';
import {
    Redirect,
    Route,
    RouteComponentProps,
    Switch,
    withRouter
} from 'react-router-dom';
import routeConfig from '../util/routeConfig';
import StegRoutes from './steg/StegRoutes';
import Velkommen from './velkommen/Velkommen';

class Foreldrepengesøknad extends React.Component<RouteComponentProps<any>> {
    renderRoutes(routes: JSX.Element[]) {
        return (
            <React.Fragment>
                <Søknadstittel>Søknad om foreldrepenger</Søknadstittel>
                <div className="content">
                    <Switch>
                        {routes}
                        <StegRoutes />
                        <Redirect to={routeConfig.ROUTE_PREFIX} />
                    </Switch>
                </div>
            </React.Fragment>
        );
    }

    renderErrorRoute() {
        return this.renderRoutes([
            <Route key="feil" component={() => <p>Error</p>} />
        ]);
    }

    renderSøknadRoutes() {
        return this.renderRoutes([
            <Route
                exact={true}
                path={routeConfig.ROUTE_PREFIX}
                component={Velkommen}
                key="velkommen"
            />
        ]);
    }

    render() {
        const applicationStateIsInvalid = false;

        if (applicationStateIsInvalid) {
            return this.renderErrorRoute();
        }

        return this.renderSøknadRoutes();
    }
}

export default withRouter(Foreldrepengesøknad);
