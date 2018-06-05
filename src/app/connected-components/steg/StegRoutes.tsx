import * as React from 'react';
import {
    Route,
    RouteComponentProps,
    Switch,
    withRouter
} from 'react-router-dom';
import routeConfig from './../../util/routeConfig';
import { StegID } from '../../util/stegConfig';
import Applikasjonsside from '../sider/Applikasjonsside';
import RelasjonTilBarnFødselSteg from './relasjon-til-barn-fødsel/RelasjonTilBarnFødselSteg';
import RelasjonTilBarnAdopsjonSteg from './relasjon-til-barn-adopsjon/RelasjonTilBarnAdopsjonSteg';
import RelasjonTilBarnStebarnsadopsjonSteg from './relasjon-til-barn-stebarnsadopsjon/RelasjonTilBarnStebarnsadopsjonSteg';
import RelasjonTilBarnForeldreansvarSteg from './relasjon-til-barn-foreldreansvar/RelasjonTilBarnForeldreansvarSteg';
import UtenlandsoppholdSteg from './utenlandsopphold/UtenlandsoppholdSteg';

export const søknadStegPath = (stegPath?: string): string =>
    `${routeConfig.SOKNAD_ROUTE_PREFIX}/${stegPath}`;

class Steg extends React.Component<RouteComponentProps<any>> {
    render() {
        return (
            <Applikasjonsside visSpråkvelger={false}>
                <Switch>
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
                        path={søknadStegPath(StegID.UTENLANDSOPPHOLD)}
                        component={UtenlandsoppholdSteg}
                        key={StegID.UTENLANDSOPPHOLD}
                    />
                </Switch>
            </Applikasjonsside>
        );
    }
}

export default withRouter(Steg);
