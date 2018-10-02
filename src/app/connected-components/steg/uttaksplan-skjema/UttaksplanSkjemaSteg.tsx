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
import Søknad, { SøknadPartial, Søkersituasjon } from '../../../types/søknad/Søknad';
import { getPermisjonsregler } from '../../../util/uttaksplan/permisjonsregler';
import { getAntallUkerFellesperiode } from '../../../util/uttaksplan/permisjonUtils';
import { getFamiliehendelsedato, getNavnPåForeldre } from '../../../util/uttaksplan';
import { getUttaksplanSkjemaScenario, UttaksplanSkjemaScenario } from './uttaksplanSkjemaScenario';
import UttaksplanSkjemaScenarioes from './UttaksplanSkjemaScenarioes';
import { apiActionCreators } from '../../../redux/actions';
import { getStønadskontoParams } from '../../../util/uttaksplan/stønadskontoParams';
import { NavnPåForeldre } from 'common/types';
import { Uttaksdagen } from '../../../util/uttaksplan/Uttaksdagen';

interface StateProps {
    stegProps: StegProps;
    søknad: SøknadPartial;
    navnPåForeldre: NavnPåForeldre;
    familiehendelsesdato: Date;
    antallUkerFellesperiode: number;
    scenario: UttaksplanSkjemaScenario;
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
        const { stegProps, dispatch, antallUkerFellesperiode, navnPåForeldre, scenario } = this.props;
        const søknad = this.props.søknad as Søknad;
        return (
            <Steg
                {...stegProps}
                preSubmit={() =>
                    dispatch(
                        apiActionCreators.getTilgjengeligeStønadskonterAndLagUttaksplanForslag(
                            getStønadskontoParams(søknad)
                        )
                    )
                }>
                <UttaksplanSkjemaScenarioes
                    scenario={scenario}
                    søknad={søknad}
                    navnPåForeldre={navnPåForeldre}
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
        renderFortsettKnapp: uttaksplanSkjemaErGyldig(state.søknad),
        fortsettKnappLabel: state.søknad.situasjon !== Søkersituasjon.FØDSEL ? 'Fortsett' : undefined,
        renderFormTag: true,
        history,
        isAvailable: isAvailable(StegID.UTTAKSPLAN_SKJEMA, state.søknad, props.søkerinfo)
    };

    const permisjonsregler = getPermisjonsregler();
    const familiehendelsesdato = getFamiliehendelsedato(state.søknad.barn, state.søknad.situasjon);
    const scenario = getUttaksplanSkjemaScenario(state.søknad);
    const søknad = { ...state.søknad };
    const skjemadata = søknad.ekstrainfo.uttaksplanSkjema;
    if (
        scenario === UttaksplanSkjemaScenario.s3_morFødsel &&
        skjemadata.skalIkkeHaUttakFørTermin !== true &&
        skjemadata.startdatoPermisjon === undefined
    ) {
        const defaultStartdato = Uttaksdagen(familiehendelsesdato).trekkFra(
            permisjonsregler.antallUkerForeldrepengerFørFødsel * 5
        );
        søknad.ekstrainfo.uttaksplanSkjema.startdatoPermisjon = defaultStartdato;
    }
    return {
        stegProps,
        søknad,
        familiehendelsesdato,
        navnPåForeldre: getNavnPåForeldre(state.søknad, props.søkerinfo.person),
        antallUkerFellesperiode: getAntallUkerFellesperiode(permisjonsregler, state.søknad.dekningsgrad!),
        scenario
    };
};

export default connect<StateProps, {}, {}>(mapStateToProps)(injectIntl(UttaksplanSkjemaSteg));
