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
import Søknad from '../types/søknad/Søknad';
import { StegID } from '../util/routing/stegConfig';
import IkkeTilgjengelig from './sider/feilsider/ikke-tilgjengelig/IkkeTilgjengelig';

interface StateProps {
    søknad: Partial<Søknad>;
    søkerinfo?: Søkerinfo;
    isLoadingSaker: boolean;
    isLoadingInitialAppData: boolean;
    isSendSøknadInProgress: boolean;
    søknadHasBeenReceived: boolean;
    systemerIkkeTilgjengelig: boolean;
}

type Props = StateProps & DispatchProps & RouteComponentProps<{}>;

const checkIfUserShouldJumpToSteg = (søknad: Partial<Søknad> | undefined, pathname: string): StegID | undefined => {
    if (pathname.indexOf(routeConfig.GENERELL_FEIL_URL) >= 0) {
        return undefined;
    }

    const skipToStegID = søknad && søknad.ekstrainfo ? søknad.ekstrainfo.currentStegID : undefined;
    if (skipToStegID !== undefined && skipToStegID !== getStegFromPathname(pathname)) {
        return skipToStegID;
    }
    return undefined;
};

class Foreldrepengesøknad extends React.Component<Props> {
    componentWillMount() {
        const { dispatch, søkerinfo } = this.props;
        if (!søkerinfo) {
            dispatch(api.getSøkerinfo(this.props.history));
            dispatch(api.getSaker());
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
        const skipToStegID = checkIfUserShouldJumpToSteg(søknad, this.props.history.location.pathname);
        const routes = [
            ...(skipToStegID
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
            isLoadingInitialAppData,
            isSendSøknadInProgress,
            isLoadingSaker,
            søknadHasBeenReceived,
            systemerIkkeTilgjengelig
        } = this.props;

        if (isLoadingInitialAppData || isSendSøknadInProgress || isLoadingSaker) {
            return <LoadingScreen />;
        } else if (søkerinfo && !søkerinfo.person.erMyndig) {
            return <Route component={() => <IkkeMyndig søkerinfo={søkerinfo!} />} />;
        } else if (søknadHasBeenReceived) {
            return <Route component={SøknadSendtSide} />;
        } else if (systemerIkkeTilgjengelig) {
            return <IkkeTilgjengelig />;
        }

        return this.renderSøknadRoutes(søkerinfo!);
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    søknad: state.søknad,
    søkerinfo: state.api.søkerinfo,
    isLoadingInitialAppData: state.api.isLoadingInitialAppData,
    isLoadingSaker: state.api.isLoadingSaker,
    isSendSøknadInProgress: state.api.søknadSendingInProgress,
    søknadHasBeenReceived: state.api.søknadHasBeenReceived,
    systemerIkkeTilgjengelig: state.api.systemerIkkeTilgjengelig
});

export default withRouter(connect<StateProps, {}, {}>(mapStateToProps)(Foreldrepengesøknad));
