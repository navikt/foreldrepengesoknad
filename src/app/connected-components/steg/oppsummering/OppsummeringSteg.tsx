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
import { apiActionCreators } from '../../../redux/actions';
import routeConfig from '../../../util/routing/routeConfig';
import { StegID } from '../../../util/routing/stegConfig';
import OppsummeringWrapper from 'common/components/summary/SummaryWrapper';
import { ForeldrepengesøknadResponse } from '../../../types/ForeldrepengesøknadResponse';
import { SøkerinfoProps } from '../../../types/søkerinfo';
import { Periode } from '../../../types/uttaksplan/periodetyper';
import { lagMockUttaksplan } from '../../../util/uttaksplan/forslag/mockUttaksplan';
import MockUttaksplan from '../../../dev/mock-uttaksplan/MockUttaksplan';

interface StateProps {
    person: Person;
    søknad: Søknad;
    kvittering?: ForeldrepengesøknadResponse;
    stegProps: StegProps;
    perioder: Periode[];
}

type Props = SøkerinfoProps & StateProps & InjectedIntlProps & DispatchProps & HistoryProps;
class OppsummeringSteg extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.sendSøknad = this.sendSøknad.bind(this);
    }

    componentDidMount() {
        const mockPerioder = lagMockUttaksplan(this.props.søknad);
        this.props.dispatch(søknadActions.uttaksplanSetPerioder(mockPerioder));
    }

    componentDidUpdate(previousProps: Props, newProps: Props) {
        if (this.props.kvittering) {
            this.props.history.push(`${routeConfig.APP_ROUTE_PREFIX}søknad-sendt`);
        }
    }

    sendSøknad() {
        const { søknad, perioder, dispatch } = this.props;
        dispatch(
            apiActionCreators.sendSøknad({
                ...søknad,
                uttaksplan: [...(perioder || [])]
            })
        );
    }

    render() {
        const { søknad, søkerinfo, stegProps, dispatch, intl } = this.props;
        const { person } = søkerinfo;
        if (person === undefined) {
            return null;
        }

        return (
            <Steg {...stegProps} onSubmit={this.sendSøknad}>
                <OppsummeringWrapper className="blokk-m" søkerinfo={søkerinfo} søknad={søknad} />

                <MockUttaksplan
                    perioder={this.props.søknad.uttaksplan}
                    navnForelder1={person.fornavn}
                    navnForelder2={søknad.annenForelder ? søknad.annenForelder.navn : undefined}
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
    const { person } = props.søkerinfo;
    const stegProps: StegProps = {
        id: StegID.OPPSUMMERING,
        renderFortsettKnapp: søknad.harGodkjentOppsummering, // TODO check if all steps is approved.
        renderFormTag: true,
        history: props.history
    };

    return {
        person,
        søknad,
        perioder: state.søknad.uttaksplan,
        kvittering: state.api.kvittering,
        stegProps
    };
};

export default connect<StateProps, {}, {}>(mapStateToProps)(injectIntl(OppsummeringSteg));
