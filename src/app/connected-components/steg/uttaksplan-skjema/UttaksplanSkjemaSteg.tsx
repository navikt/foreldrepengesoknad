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
import Søknad from '../../../types/søknad/Søknad';
import { getPermisjonsregler } from '../../../util/uttaksplan/permisjonsregler';
import { getAntallUkerFellesperiode } from '../../../util/uttaksplan/permisjonUtils';
import { getFamiliehendelsedato, getNavnPåForeldre } from '../../../util/uttaksplan';
import { getUttaksplanSkjemaScenario, UttaksplanSkjemaScenario } from './uttaksplanSkjemaScenario';
import UttaksplanSkjemaScenarioes from './UttaksplanSkjemaScenarioes';
import { apiActionCreators } from '../../../redux/actions';
import { getStønadskontoParams } from '../../../util/uttaksplan/stønadskontoParams';
import { NavnPåForeldre } from 'common/types';
import { Uttaksdagen } from '../../../util/uttaksplan/Uttaksdagen';
import ApplicationSpinner from 'common/components/application-spinner/ApplicationSpinner';

interface StateProps {
    stegProps: StegProps;
    søknad: Søknad;
    navnPåForeldre: NavnPåForeldre;
    antallUkerFellesperiode: number;
    scenario: UttaksplanSkjemaScenario;
    isLoadingTilgjengeligeStønadskontoer: boolean;
}

type Props = SøkerinfoProps & StateProps & InjectedIntlProps & DispatchProps & HistoryProps;

class UttaksplanSkjemaSteg extends React.Component<Props> {
    constructor(props: Props) {
        super(props);

        const { dispatch, stegProps, søknad } = props;

        if (stegProps.isAvailable) {
            dispatch(
                apiActionCreators.getTilgjengeligeStønadsuker(getStønadskontoParams({ ...søknad, dekningsgrad: '100' }))
            );
            dispatch(
                apiActionCreators.getTilgjengeligeStønadsuker(getStønadskontoParams({ ...søknad, dekningsgrad: '80' }))
            );
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        const dekningsgrad = this.props.søknad.dekningsgrad;
        if (dekningsgrad !== nextProps.søknad.dekningsgrad) {
            this.props.dispatch(
                søknadActions.uttaksplanUpdateSkjemdata({
                    fellesperiodeukerMor: Math.round(nextProps.antallUkerFellesperiode / 2)
                })
            );
        }
    }

    render() {
        const {
            stegProps,
            dispatch,
            antallUkerFellesperiode,
            navnPåForeldre,
            scenario,
            isLoadingTilgjengeligeStønadskontoer
        } = this.props;
        const søknad = this.props.søknad as Søknad;
        return (
            <Steg
                {...stegProps}
                onPreSubmit={() =>
                    dispatch(
                        apiActionCreators.getTilgjengeligeStønadskonterAndLagUttaksplanForslag(
                            getStønadskontoParams(søknad)
                        )
                    )
                }>
                {isLoadingTilgjengeligeStønadskontoer === true ? (
                    <ApplicationSpinner />
                ) : (
                    <UttaksplanSkjemaScenarioes
                        scenario={scenario}
                        søknad={søknad}
                        navnPåForeldre={navnPåForeldre}
                        antallUkerFellesperiode={antallUkerFellesperiode}
                    />
                )}
            </Steg>
        );
    }
}

const mapStateToProps = (state: AppState, props: SøkerinfoProps & HistoryProps): StateProps => {
    const { history } = props;

    const stegProps: StegProps = {
        id: StegID.UTTAKSPLAN_SKJEMA,
        renderFortsettKnapp: uttaksplanSkjemaErGyldig(state.søknad),
        fortsettKnappLabel: 'Fortsett',
        renderFormTag: true,
        history,
        isAvailable: isAvailable(StegID.UTTAKSPLAN_SKJEMA, state.søknad, props.søkerinfo)
    };

    const permisjonsregler = getPermisjonsregler();
    const familiehendelsesdato = getFamiliehendelsedato(state.søknad.barn, state.søknad.situasjon);
    const scenario = getUttaksplanSkjemaScenario(state.søknad);
    const {
        api: { isLoadingTilgjengeligeStønadskontoer }
    } = state;
    const søknad = { ...state.søknad };
    const skjemadata = søknad.ekstrainfo.uttaksplanSkjema;
    const førsteUttaksdag = Uttaksdagen(familiehendelsesdato).denneEllerNeste();
    if (
        scenario === UttaksplanSkjemaScenario.s3_morFødsel &&
        skjemadata.skalIkkeHaUttakFørTermin !== true &&
        skjemadata.startdatoPermisjon === undefined
    ) {
        const defaultStartdato = Uttaksdagen(førsteUttaksdag).trekkFra(
            permisjonsregler.antallUkerForeldrepengerFørFødsel * 5
        );
        søknad.ekstrainfo.uttaksplanSkjema.startdatoPermisjon = defaultStartdato;
    }
    return {
        stegProps,
        søknad,
        navnPåForeldre: getNavnPåForeldre(state.søknad, props.søkerinfo.person),
        antallUkerFellesperiode: getAntallUkerFellesperiode(permisjonsregler, state.søknad.dekningsgrad!),
        scenario,
        isLoadingTilgjengeligeStønadskontoer
    };
};

export default connect<StateProps, {}, {}>(mapStateToProps)(injectIntl(UttaksplanSkjemaSteg));
