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

import Søknadstittel from '../components/søknadstittel/Søknadstittel';
import routeConfig from '../util/routeConfig';
import StegRoutes from './steg/StegRoutes';
import Velkommen from './velkommen/Velkommen';
import Eksempelsøknad from './Eksempelsøknad';

import Person from '../types/Person';

import { DispatchProps } from '../redux/types';
import { apiActionCreators as api } from '../redux/actions';
import Feilside from '../components/layout/Feilside';

interface StateProps {
    person: Person;
    error: any;
    isLoadingPerson: boolean;
}

type Props = StateProps & DispatchProps & RouteComponentProps<{}>;

class Foreldrepengesøknad extends React.Component<Props> {
    componentWillMount() {
        const { dispatch, person } = this.props;
        if (!person) {
            dispatch(api.getPerson());
        }
    }

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
            />,
            <Route
                path="/foreldrepengesoknad/eksempel"
                component={Eksempelsøknad}
                key="eksempelsøknad"
            />
        ]);
    }

    render() {
        const applicationStateIsInvalid = false;
        const { error, isLoadingPerson } = this.props;

        if (
            isLoadingPerson ||
            (error.response && error.response.status === 401)
        ) {
            return <Spinner type="XXL" />;
        } else if (error.networkError || error.response !== undefined) {
            return (
                <Feilside
                    dokumenttittel="Error"
                    tittel="ops"
                    ingress="Noe gikk galt."
                />
            );
        }

        if (applicationStateIsInvalid) {
            return this.renderErrorRoute();
        }

        return this.renderSøknadRoutes();
    }
}

const mapStateToProps = (state: any) => ({
    person: state.api.person,
    error: state.api.error,
    isLoadingPerson: state.api.isLoadingPerson
});

export default withRouter(
    connect<StateProps, {}, {}>(mapStateToProps)(Foreldrepengesøknad)
);
