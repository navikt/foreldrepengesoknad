import * as React from 'react';
import {
    Route,
    RouteComponentProps,
    Switch,
    withRouter
} from 'react-router-dom';
import routeConfig from '../../util/routing/routeConfig';
import { StegID } from '../../util/routing/stegConfig';
import Applikasjonsside from '../sider/Applikasjonsside';
import RelasjonTilBarnFødselSteg from './relasjon-til-barn-fødsel/RelasjonTilBarnFødselSteg';
import RelasjonTilBarnAdopsjonSteg from './relasjon-til-barn-adopsjon/RelasjonTilBarnAdopsjonSteg';
import RelasjonTilBarnStebarnsadopsjonSteg from './relasjon-til-barn-stebarnsadopsjon/RelasjonTilBarnStebarnsadopsjonSteg';
import RelasjonTilBarnForeldreansvarSteg from './relasjon-til-barn-foreldreansvar/RelasjonTilBarnForeldreansvarSteg';
import UtenlandsoppholdSteg from './utenlandsopphold/UtenlandsoppholdSteg';
import AndreInntekterSteg from './andre-inntekter/AndreInntekterSteg';
import UttaksplanSteg from './uttaksplan/UttaksplanSteg';
import AnnenForelderSteg from './annen-forelder/AnnenForelderSteg';
import InngangSteg from './inngang/InngangSteg';
import { connect } from 'react-redux';
import { DispatchProps } from 'common/redux/types';
import OppsummeringSteg from './oppsummering/OppsummeringSteg';

export const søknadStegPath = (stegPath?: string): string =>
    `${routeConfig.SOKNAD_ROUTE_PREFIX}/${stegPath}`;

type Props = RouteComponentProps<any> & DispatchProps;
class StegRoutes extends React.Component<Props> {
    render() {
        return (
            <Applikasjonsside visSpråkvelger={false}>
                <Switch>
                    <Route
                        path={søknadStegPath(StegID.INNGANG)}
                        component={InngangSteg}
                        key={StegID.INNGANG}
                    />
                    <Route
                        path={søknadStegPath(StegID.RELASJON_TIL_BARN_ADOPSJON)}
                        component={RelasjonTilBarnAdopsjonSteg}
                        key={StegID.RELASJON_TIL_BARN_ADOPSJON}
                    />
                    <Route
                        path={søknadStegPath(
                            StegID.RELASJON_TIL_BARN_STEBARNSADOPSJON
                        )}
                        component={RelasjonTilBarnStebarnsadopsjonSteg}
                        key={StegID.RELASJON_TIL_BARN_STEBARNSADOPSJON}
                    />
                    <Route
                        path={søknadStegPath(
                            StegID.RELASJON_TIL_BARN_FORELDREANSVAR
                        )}
                        component={RelasjonTilBarnForeldreansvarSteg}
                        key={StegID.RELASJON_TIL_BARN_FORELDREANSVAR}
                    />
                    <Route
                        path={søknadStegPath(StegID.RELASJON_TIL_BARN_FØDSEL)}
                        component={RelasjonTilBarnFødselSteg}
                        key={StegID.RELASJON_TIL_BARN_FØDSEL}
                    />
                    <Route
                        path={søknadStegPath(StegID.ANNEN_FORELDER)}
                        component={AnnenForelderSteg}
                        key={StegID.ANNEN_FORELDER}
                    />
                    <Route
                        path={søknadStegPath(StegID.UTENLANDSOPPHOLD)}
                        component={UtenlandsoppholdSteg}
                        key={StegID.UTENLANDSOPPHOLD}
                    />
                    <Route
                        path={søknadStegPath(StegID.ANDRE_INNTEKTER)}
                        component={AndreInntekterSteg}
                        key={StegID.ANDRE_INNTEKTER}
                    />
                    <Route
                        path={søknadStegPath(StegID.UTTAKSPLAN)}
                        component={UttaksplanSteg}
                        key={StegID.UTTAKSPLAN}
                    />
                    <Route
                        path={søknadStegPath(StegID.OPPSUMMERING)}
                        component={OppsummeringSteg}
                        key={StegID.OPPSUMMERING}
                    />
                </Switch>
            </Applikasjonsside>
        );
    }
}

export default connect()(withRouter(StegRoutes));
