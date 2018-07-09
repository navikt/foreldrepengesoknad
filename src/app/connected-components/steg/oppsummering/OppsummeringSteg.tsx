import * as React from 'react';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { BekreftCheckboksPanel } from 'nav-frontend-skjema';

import Steg, { StegProps } from '../../../components/steg/Steg';

import { AppState } from '../../../redux/reducers';
import { DispatchProps } from 'common/redux/types';
import { HistoryProps } from '../../../types/common';
import Person from '../../../types/Person';
import getMessage from 'common/util/i18nUtils';

import søknadActions from '../../../redux/actions/søknad/søknadActionCreators';
import Søknad from '../../../types/søknad/Søknad';
import { Periode } from 'uttaksplan/types';
import { apiActionCreators } from '../../../redux/actions';
import routeConfig from '../../../util/routing/routeConfig';
import { StegID } from '../../../util/routing/stegConfig';
import summaryActionCreators from '../../../redux/actions/summary/summaryActionCreators';
import OppsummeringWrapper from 'common/components/oppsummering/OppsummeringWrapper';

interface StateProps {
    person: Person;
    søknad: Søknad;
    godkjenteSteg: {};
    stegProps: StegProps;
    perioder: Periode[];
}

type Props = StateProps & InjectedIntlProps & DispatchProps & HistoryProps;
class OppsummeringSteg extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.sendSøknadAndRedirect = this.sendSøknadAndRedirect.bind(this);
    }

    sendSøknadAndRedirect() {
        const { søknad, perioder, dispatch, history } = this.props;
        dispatch(
            apiActionCreators.sendSøknad({
                ...søknad,
                uttaksplan: [...(perioder || [])]
            })
        );
        history.push(`${routeConfig.APP_ROUTE_PREFIX}søknad-sendt`);
    }

    confirmSteg(stegID: StegID) {
        const { dispatch } = this.props;
        dispatch(summaryActionCreators.approveSteg(stegID));
    }

    render() {
        const {
            søknad,
            person,
            godkjenteSteg,
            stegProps,
            dispatch,
            intl
        } = this.props;
        if (person === undefined) {
            return null;
        }

        return (
            <Steg {...stegProps} onSubmit={this.sendSøknadAndRedirect}>
                <OppsummeringWrapper
                    className="blokk-m"
                    person={person}
                    søknad={søknad}
                    godkjenteSteg={godkjenteSteg}
                    confirmSteg={(stegID: StegID) => this.confirmSteg(stegID)}
                />
                <BekreftCheckboksPanel
                    className="blokk-m"
                    checked={søknad.harGodkjentOppsummering}
                    label={getMessage(intl, 'oppsummering.samtykke')}
                    onChange={() => {
                        dispatch(
                            søknadActions.updateSøknad({
                                harGodkjentOppsummering: !søknad.harGodkjentOppsummering
                            })
                        );
                    }}
                />
            </Steg>
        );
    }
}

const mapStateToProps = (state: AppState, props: Props): StateProps => {
    const søknad = state.søknad;
    const person = state.api.person as Person;
    const stegProps = {
        id: StegID.OPPSUMMERING,
        renderFortsettKnapp: søknad.harGodkjentOppsummering, // TODO check if all steps is approved.
        history: props.history
    };

    return {
        person,
        søknad,
        godkjenteSteg: state.summary.godkjenteSteg,
        perioder: state.uttaksplan.uttaksplan.perioder,
        stegProps
    };
};

export default connect<StateProps, {}, {}>(mapStateToProps)(
    injectIntl(OppsummeringSteg)
);
