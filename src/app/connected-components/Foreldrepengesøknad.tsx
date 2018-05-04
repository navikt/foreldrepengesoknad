import * as React from 'react';
import {
    Redirect,
    Route,
    RouteComponentProps,
    Switch,
    withRouter
} from 'react-router-dom';
import routeConfig from '../util/routeConfig';
import StegRoutes from './steg/StegRoutes';
import Velkommen from './sider/velkommen/Velkommen';
import Feilside from './sider/feilside/Feilside';

class Foreldrepengesøknad extends React.Component<RouteComponentProps<any>> {
    renderRoutes(routes: JSX.Element[]) {
        return (
            <Switch>
                {routes}
                <Redirect to={routeConfig.APP_ROUTE_PREFIX} />
            </Switch>
        );
    }

    renderErrorRoute() {
        return this.renderRoutes([<Route key="feil" component={Feilside} />]);
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
