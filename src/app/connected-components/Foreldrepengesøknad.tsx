import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import routeConfig from '../util/routing/routeConfig';
import StegRoutes, { getStegFromPathname } from './steg/StegRoutes';
import GenerellFeil from './sider/feilsider/GenerellFeil';
import { DispatchProps } from 'common/redux/types';
import { apiActionCreators as api } from '../redux/actions';
import IkkeMyndig from './sider/feilsider/IkkeMyndig';
import SøknadSendtSide from './sider/søknad-sendt/SøknadSendtSide';
import Velkommen from './sider/velkommen/Velkommen';
import { AppState } from '../redux/reducers';
import { Søkerinfo } from '../types/søkerinfo';
import LoadingScreen from '../components/loading-screen/LoadingScreen';
import Søknad from '../types/s\u00F8knad/S\u00F8knad';

interface StateProps {
    søknad: Partial<Søknad>;
    søkerinfo?: Søkerinfo;
    isLoadingSøkerinfo: boolean;
    isLoadingAppState: boolean;
    isSendSøknadInProgress: boolean;
    søknadHasBeenReceived: boolean;
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
                <Route path={routeConfig.GENERELL_FEIL_URL} component={GenerellFeil} />
                <Redirect to={`${routeConfig.APP_ROUTE_PREFIX}velkommen`} />
            </Switch>
        );
    }

    renderSøknadRoutes(søkerinfo: Søkerinfo) {
        const { søknad } = this.props;
        const skipToStegID = søknad && søknad.ekstrainfo ? søknad.ekstrainfo.currentStegID : undefined;
        const shouldSkip = skipToStegID && skipToStegID !== getStegFromPathname(this.props.history.location.pathname);
        const routes = [
            ...(shouldSkip
                ? [<Redirect key="redirect" to={`${routeConfig.SOKNAD_ROUTE_PREFIX}/${skipToStegID}`} />]
                : []),
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
        return this.renderRoutes(routes);
    }

    render() {
        const {
            søkerinfo,
            isLoadingAppState,
            isLoadingSøkerinfo,
            isSendSøknadInProgress,
            søknadHasBeenReceived
        } = this.props;

        if (isLoadingAppState || isLoadingSøkerinfo || isSendSøknadInProgress) {
            return <LoadingScreen />;
        } else if (!søkerinfo && !isLoadingSøkerinfo) {
            return <Route component={GenerellFeil} />;
        } else if (søkerinfo && !søkerinfo.person.erMyndig) {
            return <Route component={() => <IkkeMyndig søkerinfo={søkerinfo!} />} />;
        } else if (søknadHasBeenReceived) {
            return <Route component={SøknadSendtSide} />;
        }

        return this.renderSøknadRoutes(søkerinfo!);
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    søknad: state.søknad,
    søkerinfo: state.api.søkerinfo,
    isLoadingSøkerinfo: state.api.isLoadingSøkerinfo,
    isLoadingAppState: state.api.isLoadingAppState,
    isSendSøknadInProgress: state.api.søknadSendingInProgress,
    søknadHasBeenReceived: state.api.søknadHasBeenReceived
});

export default withRouter(connect<StateProps, {}, {}>(mapStateToProps)(Foreldrepengesøknad));
