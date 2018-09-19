import * as React from 'react';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { AppState } from '../../../redux/reducers';
import { DispatchProps } from 'common/redux/types';
import Steg, { StegProps } from '../../../components/steg/Steg';
import { StegID } from '../../../util/routing/stegConfig';
import { HistoryProps } from '../../../types/common';
import isAvailable from '../util/isAvailable';

import { SøkerinfoProps } from '../../../types/søkerinfo';
import { uttaksplanSkjemaErGyldig } from '../../../util/validation/steg/uttaksplanSkjema';
import søknadActions from '../../../redux/actions/søknad/søknadActionCreators';
import Søknad, { SøknadPartial } from '../../../types/søknad/Søknad';
import { getPermisjonsregler } from '../../../util/uttaksplan/permisjonsregler';
import { getAntallUkerFellesperiode } from '../../../util/uttaksplan/permisjonUtils';
import { getFamiliehendelsedato } from '../../../util/uttaksplan';
import { getUttaksplanSkjemaScenario } from './uttaksplanSkjemaScenario';
import UttaksplanSkjemaScenarioes from './UttaksplanSkjemaScenarioes';
import { apiActionCreators } from '../../../redux/actions';
import { getStønadskontoParams } from '../../../util/uttaksplan/stønadskontoParams';

interface StateProps {
    stegProps: StegProps;
    søknad: SøknadPartial;
    familiehendelsesdato: Date;
    antallUkerFellesperiode: number;
}

type Props = SøkerinfoProps & StateProps & InjectedIntlProps & DispatchProps & HistoryProps;

class UttaksplanSkjemaSteg extends React.Component<Props> {
    componentWillMount() {
        const defaultAntallUkerAvFellesperiode = Math.round(this.props.antallUkerFellesperiode / 2);
        if (this.props.søknad.ekstrainfo.uttaksplanSkjema.fellesperiodeukerMor === undefined) {
            this.props.dispatch(
                søknadActions.uttaksplanUpdateSkjemdata({
                    fellesperiodeukerMor: defaultAntallUkerAvFellesperiode
                })
            );
        }
    }

    render() {
        const { stegProps, dispatch, søkerinfo, antallUkerFellesperiode } = this.props;
        const søknad = this.props.søknad as Søknad;
        return (
            <Steg
                {...stegProps}
                preSubmit={() =>
                    dispatch(
                        apiActionCreators.getTilgjengeligeStønadskonterAndLagUttaksplanForslag(
                            getStønadskontoParams(søknad, søkerinfo.person)
                        )
                    )
                }>
                <UttaksplanSkjemaScenarioes
                    scenario={getUttaksplanSkjemaScenario(søknad, this.props.søkerinfo)}
                    søkerinfo={søkerinfo}
                    søknad={søknad}
                    antallUkerFellesperiode={antallUkerFellesperiode}
                />
            </Steg>
        );
    }
}

const mapStateToProps = (state: AppState, props: SøkerinfoProps & HistoryProps): StateProps => {
    const { history } = props;

    const stegProps: StegProps = {
        id: StegID.UTTAKSPLAN_SKJEMA,
        renderFortsettKnapp: uttaksplanSkjemaErGyldig(state.søknad, props.søkerinfo),
        renderFormTag: true,
        history,
        isAvailable: isAvailable(StegID.UTTAKSPLAN_SKJEMA, state.søknad, props.søkerinfo)
    };

    const permisjonsregler = getPermisjonsregler();

    return {
        stegProps,
        søknad: state.søknad,
        familiehendelsesdato: getFamiliehendelsedato(state.søknad.barn, state.søknad.situasjon),
        antallUkerFellesperiode: getAntallUkerFellesperiode(permisjonsregler, state.søknad.dekningsgrad!)
    };
};

export default connect<StateProps, {}, {}>(mapStateToProps)(injectIntl(UttaksplanSkjemaSteg));
