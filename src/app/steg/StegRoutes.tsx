import * as React from 'react';
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import routeConfig from '../util/routing/routeConfig';
import { StegID } from '../util/routing/stegConfig';
import Applikasjonsside from '../components/applikasjon/applikasjonsside/Applikasjonsside';
import RelasjonTilBarnFødselSteg from './barn/relasjonTilBarnFødselSteg/RelasjonTilBarnFødselSteg';
import RelasjonTilBarnAdopsjonSteg from './barn/relasjonTilBarnAdopsjonSteg/RelasjonTilBarnAdopsjonSteg';
import RelasjonTilBarnForeldreansvarSteg from './barn/relasjonTilBarnForeldreansvarSteg/RelasjonTilBarnForeldreansvarSteg';
import UtenlandsoppholdSteg from './utenlandsopphold/UtenlandsoppholdSteg';
import AndreInntekterSteg from './andreInntekter/AndreInntekterSteg';
import UttaksplanSteg from './uttaksplan/UttaksplanSteg';
import AnnenForelderSteg from './annenForelder/AnnenForelderSteg';
import InngangSteg from './inngang/InngangSteg';
import OppsummeringSteg from './oppsummering/OppsummeringSteg';
import { HistoryProps } from '../types/common';
import { SøkerinfoProps } from '../types/søkerinfo';
import UttaksplanSkjemaSteg from './uttaksplanSkjema/UttaksplanSkjemaSteg';
import { connect } from 'react-redux';
import { DispatchProps } from 'common/redux/types';
import { AppState } from '../redux/reducers';
import søknadActionCreators from '../redux/actions/søknad/søknadActionCreators';
import { apiActionCreators } from '../redux/actions';
import { Redirect } from 'react-router';
import ManglendeVedleggSteg from './manglendeVedlegg/ManglendeVedleggSteg';
import { Location } from 'history';

export const søknadStegPath = (stegPath?: string): string => `${routeConfig.SOKNAD_ROUTE_PREFIX}/${stegPath}`;

export const getStegFromWindowLocation = (): StegID | undefined => {
    return getStegFromPathname(window.location.pathname);
};

export const getStegFromPathname = (pathname: string): StegID | undefined => {
    const steg = pathname.match(/soknad\/(.+)/);
    if (steg && steg.length === 2) {
        return steg[1] as StegID;
    }
    return undefined;
};

interface StateProps {
    steg: StegID | undefined;
}

type Props = StateProps & SøkerinfoProps & RouteComponentProps<any> & HistoryProps & DispatchProps;

class StegRoutes extends React.Component<Props> {
    unlistenLocationChange: () => void;
    requestedSteg: StegID | undefined;

    constructor(props: Props) {
        super(props);
        this.state = {
            currentSteg: props.steg,
        };
        this.navigateToStegIfNeeded(props);
    }

    UNSAFE_componentWillMount() {
        this.unlistenLocationChange = this.props.history.listen((location: Location) => {
            const steg = getStegFromPathname(location.pathname);
            if (steg) {
                this.requestedSteg = steg;
                this.onStegChange(steg);
            }
        });
    }

    componentWillUnmount() {
        this.unlistenLocationChange();
    }

    navigateToStegIfNeeded(props: Props) {
        const { steg, history, location } = props;
        const pathSteg = getStegFromPathname(location.pathname);
        if (steg && steg !== pathSteg) {
            history.replace(søknadStegPath(steg));
        }
    }

    onStegChange(steg: StegID) {
        setTimeout(() => {
            // Must allow state to be updated before checking equality
            if (steg !== this.props.steg) {
                this.props.dispatch(søknadActionCreators.setCurrentSteg(steg));
                this.props.dispatch(apiActionCreators.storeAppState());
            }
        });
    }

    render() {
        const { søkerinfo } = this.props;
        return (
            <Applikasjonsside visSpråkvelger={false} visSøknadstittel={true}>
                <Switch>
                    <Route
                        path={søknadStegPath(StegID.INNGANG)}
                        render={(props) => <InngangSteg {...props} søkerinfo={søkerinfo} />}
                        key={StegID.INNGANG}
                    />
                    <Route
                        path={søknadStegPath(StegID.RELASJON_TIL_BARN_ADOPSJON)}
                        render={(props) => <RelasjonTilBarnAdopsjonSteg {...props} søkerinfo={søkerinfo} />}
                        key={StegID.RELASJON_TIL_BARN_ADOPSJON}
                    />
                    <Route
                        path={søknadStegPath(StegID.RELASJON_TIL_BARN_FORELDREANSVAR)}
                        render={(props) => <RelasjonTilBarnForeldreansvarSteg {...props} søkerinfo={søkerinfo} />}
                        key={StegID.RELASJON_TIL_BARN_FORELDREANSVAR}
                    />
                    <Route
                        path={søknadStegPath(StegID.RELASJON_TIL_BARN_FØDSEL)}
                        render={(props) => <RelasjonTilBarnFødselSteg {...props} søkerinfo={søkerinfo} />}
                        key={StegID.RELASJON_TIL_BARN_FØDSEL}
                    />
                    <Route
                        path={søknadStegPath(StegID.ANNEN_FORELDER)}
                        render={(props) => <AnnenForelderSteg {...props} søkerinfo={søkerinfo} />}
                        key={StegID.ANNEN_FORELDER}
                    />
                    <Route
                        path={søknadStegPath(StegID.UTENLANDSOPPHOLD)}
                        render={(props) => <UtenlandsoppholdSteg {...props} søkerinfo={søkerinfo} />}
                        key={StegID.UTENLANDSOPPHOLD}
                    />
                    <Route
                        path={søknadStegPath(StegID.ANDRE_INNTEKTER)}
                        render={(props) => <AndreInntekterSteg {...props} søkerinfo={søkerinfo} />}
                        key={StegID.ANDRE_INNTEKTER}
                    />
                    <Route
                        path={søknadStegPath(StegID.UTTAKSPLAN_SKJEMA)}
                        render={(props) => <UttaksplanSkjemaSteg {...props} søkerinfo={søkerinfo} />}
                        key={StegID.UTTAKSPLAN_SKJEMA}
                    />
                    <Route
                        path={søknadStegPath(StegID.MANGLENDE_VEDLEGG)}
                        render={(props) => <ManglendeVedleggSteg {...props} søkerinfo={søkerinfo} />}
                        key={StegID.MANGLENDE_VEDLEGG}
                    />
                    <Redirect
                        from={`${routeConfig.SOKNAD_ROUTE_PREFIX}/uttaksplanSkjema`}
                        to={StegID.UTTAKSPLAN_SKJEMA}
                    />
                    <Route
                        path={søknadStegPath(StegID.UTTAKSPLAN)}
                        render={(props) => <UttaksplanSteg {...props} søkerinfo={søkerinfo} />}
                        key={StegID.UTTAKSPLAN}
                    />
                    <Route
                        path={søknadStegPath(StegID.OPPSUMMERING)}
                        render={(props) => <OppsummeringSteg {...props} søkerinfo={søkerinfo} />}
                        key={StegID.OPPSUMMERING}
                    />
                </Switch>
            </Applikasjonsside>
        );
    }
}

export default connect(
    (appState: AppState): StateProps => ({
        steg: appState.søknad.ekstrainfo.currentStegID,
    })
)(withRouter(StegRoutes));
