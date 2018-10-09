import * as React from 'react';
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import routeConfig from '../../util/routing/routeConfig';
import { StegID } from '../../util/routing/stegConfig';
import Applikasjonsside from '../sider/Applikasjonsside';
import { HistoryProps } from '../../types/common';
import { SøkerinfoProps } from '../../types/søkerinfo';
import InngangStegEndring from './inngang-endring/InngangStegEndring';
import UttaksplanStegEndring from './uttaksplan-endring/UttaksplanStegEndring';
import OppsummeringStegEndring from './oppsummering-endring/OppsummeringStegEndring';

export const endringssøknadStegPath = (stegPath?: string): string =>
    `${routeConfig.ENDRINGSSOKNAD_ROUTE_PREFIX}/${stegPath}`;

type Props = SøkerinfoProps & RouteComponentProps<any> & HistoryProps;

class StegRoutes extends React.Component<Props> {
    render() {
        const { søkerinfo } = this.props;

        return (
            <Applikasjonsside visSpråkvelger={false} visSøknadstittel={true}>
                <Switch>
                    <Route
                        path={endringssøknadStegPath(StegID.INNGANG)}
                        render={(props) => <InngangStegEndring {...props} søkerinfo={søkerinfo} />}
                        key={StegID.INNGANG}
                    />
                    <Route
                        path={endringssøknadStegPath(StegID.UTTAKSPLAN)}
                        render={(props) => <UttaksplanStegEndring {...props} søkerinfo={søkerinfo} />}
                        key={StegID.UTTAKSPLAN}
                    />
                    <Route
                        path={endringssøknadStegPath(StegID.OPPSUMMERING)}
                        render={(props) => <OppsummeringStegEndring {...props} søkerinfo={søkerinfo} />}
                        key={StegID.OPPSUMMERING}
                    />
                </Switch>
            </Applikasjonsside>
        );
    }
}

export default withRouter(StegRoutes);
