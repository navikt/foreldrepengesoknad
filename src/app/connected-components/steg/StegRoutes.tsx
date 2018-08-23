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
import RelasjonTilBarnForeldreansvarSteg from './relasjon-til-barn-foreldreansvar/RelasjonTilBarnForeldreansvarSteg';
import UtenlandsoppholdSteg from './utenlandsopphold/UtenlandsoppholdSteg';
import AndreInntekterSteg from './andre-inntekter/AndreInntekterSteg';
import UttaksplanSteg from './uttaksplan/UttaksplanSteg';
import AnnenForelderSteg from './annen-forelder/AnnenForelderSteg';
import InngangSteg from './inngang/InngangSteg';
import { connect } from 'react-redux';
import { DispatchProps } from 'common/redux/types';
import OppsummeringSteg from './oppsummering/OppsummeringSteg';
import { HistoryProps } from '../../types/common';
import { SøkerinfoProps } from '../Foreldrepengesøknad';
import { Søkerinfo } from '../../types/søkerinfo';

export const søknadStegPath = (stegPath?: string): string =>
    `${routeConfig.SOKNAD_ROUTE_PREFIX}/${stegPath}`;

interface OwnProps {
    søkerinfo: Søkerinfo;
}
type Props = OwnProps & RouteComponentProps<any> & DispatchProps & HistoryProps;

class StegRoutes extends React.Component<Props> {
    render() {
        const søkerinfo: SøkerinfoProps = {
            søkerinfo: this.props.søkerinfo
        };
        return (
            <Applikasjonsside visSpråkvelger={false} visSøknadstittel={true}>
                <Switch>
                    <Route
                        path={søknadStegPath(StegID.INNGANG)}
                        render={(props) => (
                            <InngangSteg {...props} {...søkerinfo} />
                        )}
                        key={StegID.INNGANG}
                    />
                    <Route
                        path={søknadStegPath(StegID.RELASJON_TIL_BARN_ADOPSJON)}
                        render={(props) => (
                            <RelasjonTilBarnAdopsjonSteg
                                {...props}
                                {...søkerinfo}
                            />
                        )}
                        key={StegID.RELASJON_TIL_BARN_ADOPSJON}
                    />
                    <Route
                        path={søknadStegPath(
                            StegID.RELASJON_TIL_BARN_FORELDREANSVAR
                        )}
                        render={(props) => (
                            <RelasjonTilBarnForeldreansvarSteg
                                {...props}
                                {...søkerinfo}
                            />
                        )}
                        key={StegID.RELASJON_TIL_BARN_FORELDREANSVAR}
                    />
                    <Route
                        path={søknadStegPath(StegID.RELASJON_TIL_BARN_FØDSEL)}
                        render={(props) => (
                            <RelasjonTilBarnFødselSteg
                                {...props}
                                {...søkerinfo}
                            />
                        )}
                        key={StegID.RELASJON_TIL_BARN_FØDSEL}
                    />
                    <Route
                        path={søknadStegPath(StegID.ANNEN_FORELDER)}
                        render={(props) => (
                            <AnnenForelderSteg {...props} {...søkerinfo} />
                        )}
                        key={StegID.ANNEN_FORELDER}
                    />
                    <Route
                        path={søknadStegPath(StegID.UTENLANDSOPPHOLD)}
                        render={(props) => (
                            <UtenlandsoppholdSteg {...props} {...søkerinfo} />
                        )}
                        key={StegID.UTENLANDSOPPHOLD}
                    />
                    <Route
                        path={søknadStegPath(StegID.ANDRE_INNTEKTER)}
                        render={(props) => (
                            <AndreInntekterSteg {...props} {...søkerinfo} />
                        )}
                        key={StegID.ANDRE_INNTEKTER}
                    />
                    <Route
                        path={søknadStegPath(StegID.UTTAKSPLAN)}
                        render={(props) => (
                            <UttaksplanSteg {...props} {...søkerinfo} />
                        )}
                        key={StegID.UTTAKSPLAN}
                    />
                    <Route
                        path={søknadStegPath(StegID.OPPSUMMERING)}
                        render={(props) => (
                            <OppsummeringSteg {...props} {...søkerinfo} />
                        )}
                        key={StegID.OPPSUMMERING}
                    />
                </Switch>
            </Applikasjonsside>
        );
    }
}

export default connect()(withRouter(StegRoutes));
