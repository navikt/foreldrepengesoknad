import * as React from 'react';
import { Switch, Route } from 'react-router';
import UttaksplanMedSkjema from 'uttaksplan/components/uttaksplan/UttaksplanMedSkjema';
import UttaksplanKunTidslinje from 'uttaksplan/components/uttaksplan/UttaksplanKunTidslinje';

export interface Props {}

const Uttaksplan: React.StatelessComponent<Props> = (props) => (
    <Switch>
        <Route
            component={UttaksplanKunTidslinje}
            path="/foreldrepengesoknad/uttaksplan/tidslinje"
            exact={true}
        />
        <Route
            component={UttaksplanMedSkjema}
            path="/foreldrepengesoknad/uttaksplan"
            exact={true}
        />
    </Switch>
);

export default Uttaksplan;
