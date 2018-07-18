import * as React from 'react';
import { connect } from 'react-redux';
import {
    Redirect,
    Route,
    RouteComponentProps,
    Switch,
    withRouter
} from 'react-router-dom';

import Spinner from 'nav-frontend-spinner';

import routeConfig from '../util/routing/routeConfig';
import StegRoutes from './steg/StegRoutes';
import GenerellFeil from './sider/feilsider/GenerellFeil';

import Person from '../types/Person';

import { DispatchProps } from 'common/redux/types';
import { apiActionCreators as api } from '../redux/actions';
import IkkeMyndig from './sider/feilsider/IkkeMyndig';
import DevSideoversikt from '../dev/DevSideoversikt';
import UttaksplanSide from './sider/uttaksplan/UttaksplanSide';
import SøknadSendtSide from './sider/søknad-sendt/SøknadSendtSide';
import Velkommen from './sider/velkommen/Velkommen';

interface StateProps {
    person: Person;
    error: any;
    isLoadingPerson: boolean;
    isLoadingAppState: boolean;
}

type Props = StateProps & DispatchProps & RouteComponentProps<{}>;

class Foreldrepengesøknad extends React.Component<Props> {
    componentWillMount() {
        const { dispatch, person } = this.props;
        if (!person) {
            dispatch(api.getSøkerinfo());
        }
    }

    renderRoutes(routes: JSX.Element[]) {
        return (
            <Switch>
                {routes}
                <Route
                    path={`${routeConfig.APP_ROUTE_PREFIX}sideoversikt`}
                    component={DevSideoversikt}
                    key="devSideoversikt"
                />
                <Redirect to={`${routeConfig.APP_ROUTE_PREFIX}velkommen`} />
            </Switch>
        );
    }

    renderErrorRoute(component: React.ComponentType) {
        return this.renderRoutes([
            <Route
                key="feil"
                path={routeConfig.APP_ROUTE_PREFIX}
                component={component}
            />
        ]);
    }

    renderSøknadRoutes() {
        return this.renderRoutes([
            <Route
                path={routeConfig.SOKNAD_ROUTE_PREFIX}
                component={StegRoutes}
                key="steg"
            />,
            <Route
                path={`${routeConfig.APP_ROUTE_PREFIX}velkommen`}
                component={Velkommen}
                key="velkommen"
            />,
            <Route
                path={`${routeConfig.APP_ROUTE_PREFIX}søknad-sendt`}
                component={SøknadSendtSide}
                key="søknadsendt"
            />,
            <Route
                path={`${routeConfig.APP_ROUTE_PREFIX}uttaksplan`}
                component={UttaksplanSide}
                key="uttaksplan"
            />
        ]);
    }

    render() {
        const {
            error,
            isLoadingAppState,
            isLoadingPerson,
            person
        } = this.props;

        if (
            isLoadingAppState ||
            isLoadingPerson ||
            (error.response && error.response.status === 401)
        ) {
            return <Spinner type="XXL" />;
        } else if (!person && !isLoadingPerson) {
            return this.renderErrorRoute(GenerellFeil);
        } else if (person && !person.erMyndig) {
            return this.renderErrorRoute(IkkeMyndig);
        }
        return this.renderSøknadRoutes();
    }
}

const mapStateToProps = (state: any) => ({
    person: state.api.person,
    error: state.api.error,
    isLoadingPerson: state.api.isLoadingPerson,
    isLoadingAppState: state.api.isLoadingAppState
});

export default withRouter(
    connect<StateProps, {}, {}>(mapStateToProps)(Foreldrepengesøknad)
);
