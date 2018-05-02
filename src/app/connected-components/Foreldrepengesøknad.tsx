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
                        <Redirect to={routeConfig.APP_ROUTE_PREFIX} />
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
                path={routeConfig.APP_ROUTE_PREFIX}
                component={Velkommen}
                key="velkommen"
            />,
            <Route
                path={routeConfig.SOKNAD_ROUTE_PREFIX}
                component={StegRoutes}
                key="steg"
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
