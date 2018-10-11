import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import routeConfig from '../util/routing/routeConfig';
import StegRoutes from './steg/StegRoutes';
import GenerellFeil from './sider/feilsider/GenerellFeil';
import { DispatchProps } from 'common/redux/types';
import { apiActionCreators as api } from '../redux/actions';
import IkkeMyndig from './sider/feilsider/IkkeMyndig';
import SøknadSendtSide from './sider/søknad-sendt/SøknadSendtSide';
import Velkommen from './sider/velkommen/Velkommen';
import { AppState } from '../redux/reducers';
import { Søkerinfo } from '../types/søkerinfo';
import Applikasjonsside from './sider/Applikasjonsside';
import ApplicationSpinner from 'common/components/application-spinner/ApplicationSpinner';
import { AxiosError } from 'axios';

interface StateProps {
    søkerinfo?: Søkerinfo;
    error?: AxiosError;
    isLoadingSøkerinfo: boolean;
    isLoadingAppState: boolean;
    isSendSøknadInProgress: boolean;
    søknadHasBeenReceived: boolean;
    harGodkjentOppsummering: boolean;
}

type Props = StateProps & DispatchProps & RouteComponentProps<{}>;

class Foreldrepengesøknad extends React.Component<Props> {
    componentWillMount() {
        const { dispatch, søkerinfo } = this.props;
        if (!søkerinfo) {
            dispatch(api.getSøkerinfo());
        }
    }

    renderRoutes(routes: JSX.Element[]) {
        return (
            <Switch>
                {routes}
                <Redirect to={`${routeConfig.APP_ROUTE_PREFIX}velkommen`} />
            </Switch>
        );
    }

    renderErrorRoute(component: React.ComponentType) {
        return this.renderRoutes([<Route key="feil" path={routeConfig.APP_ROUTE_PREFIX} component={component} />]);
    }

    renderSøknadRoutes(søkerinfo: Søkerinfo, harGodkjentOppsummering: boolean) {
        const routes = [
            <Route
                path={routeConfig.SOKNAD_ROUTE_PREFIX}
                render={(props) => <StegRoutes {...props} søkerinfo={søkerinfo} />}
                key="steg"
            />,
            <Route
                path={`${routeConfig.APP_ROUTE_PREFIX}velkommen`}
                render={(props) => <Velkommen {...props} søkerinfo={søkerinfo} />}
                key="velkommen"
            />
        ];

        if (harGodkjentOppsummering) {
            return this.renderRoutes([
                ...routes,
                <Route
                    path={`${routeConfig.APP_ROUTE_PREFIX}søknad-sendt`}
                    component={SøknadSendtSide}
                    key="søknadsendt"
                />
            ]);
        }
        return this.renderRoutes(routes);
    }

    renderAppAfterSøknadWasReceived() {
        return <Route component={SøknadSendtSide} />;
    }

    render() {
        const {
            søkerinfo,
            isLoadingAppState,
            isLoadingSøkerinfo,
            isSendSøknadInProgress,
            søknadHasBeenReceived,
            harGodkjentOppsummering,
            error
        } = this.props;

        if (isLoadingAppState || isLoadingSøkerinfo || isSendSøknadInProgress) {
            return (
                <Applikasjonsside>
                    <ApplicationSpinner />
                </Applikasjonsside>
            );
        } else if (!søkerinfo || error) {
            return this.renderErrorRoute(GenerellFeil);
        } else if (søkerinfo && !søkerinfo.person.erMyndig) {
            return this.renderErrorRoute(() => <IkkeMyndig søkerinfo={søkerinfo!} />);
        } else if (søknadHasBeenReceived) {
            return this.renderAppAfterSøknadWasReceived();
        }
        return this.renderSøknadRoutes(søkerinfo, harGodkjentOppsummering);
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    søkerinfo: state.api.søkerinfo,
    error: state.api.error,
    isLoadingSøkerinfo: state.api.isLoadingSøkerinfo,
    isLoadingAppState: state.api.isLoadingAppState,
    isSendSøknadInProgress: state.api.søknadSendingInProgress,
    søknadHasBeenReceived: state.api.søknadHasBeenReceived,
    harGodkjentOppsummering: state.søknad.harGodkjentOppsummering
});

export default withRouter(connect<StateProps, {}, {}>(mapStateToProps)(Foreldrepengesøknad));
