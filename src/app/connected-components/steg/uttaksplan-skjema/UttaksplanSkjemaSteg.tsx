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
import { uttaksplanSkjemaErGyldig } from '../../../util/validation/steg/uttaksplaSkjema';
import DekningsgradSpørsmål from './enkeltspørsmål/DekningsgradSpørsmål';
import søknadActions from '../../../redux/actions/søknad/søknadActionCreators';
import { SøknadPartial } from '../../../types/søknad/Søknad';
import getUttaksplanSkjemaStegVisibility, { UttaksplanSkjemaStegVisibility } from './uttaksplanSkjemaVisibility';
import PlanlagtOppholdIUttakSpørsmål from '../../../spørsmål/PlanlagtOppholdIUttakSpørsmål';
import FordelingFellesperiodeSpørsmål from '../../../spørsmål/FordelingFellesperiodeSpørsmål';
import { getPermisjonsregler } from '../../../util/uttaksplan/permisjonsregler';
import { getAntallUkerFellesperiode } from '../../../util/uttaksplan/permisjonUtils';
import { getFamiliehendelsedato } from '../../../util/uttaksplan';
import MorSinSisteUttaksdagSpørsmål from './enkeltspørsmål/MorSinSisteUttaksdagSpørsmål';
import HarAnnenForelderSøktForeldrepengerSpørsmål from './enkeltspørsmål/HarAnnenForelderSøktForeldrepengerSpørsmål';
import StartdatoPermisjonBolk from './enkeltspørsmål/StartdatoPermisjonBolk';

interface StateProps {
    stegProps: StegProps;
    søknad: SøknadPartial;
    familiehendelsesdato: Date;
    antallUkerFellesperiode: number;
    vis: UttaksplanSkjemaStegVisibility;
}

type Props = SøkerinfoProps & StateProps & InjectedIntlProps & DispatchProps & HistoryProps;

class UttaksplanSkjemaSteg extends React.Component<Props> {
    componentWillMount() {
        const defaultAntallUkerAvFellesperiode = Math.round(this.props.antallUkerFellesperiode / 2);
        if (this.props.søknad.ekstrainfo.uttaksplanSkjema.fellesperiodeukerForelder1 === undefined) {
            this.props.dispatch(
                søknadActions.uttaksplanUpdateSkjemdata({
                    fellesperiodeukerForelder1: defaultAntallUkerAvFellesperiode
                })
            );
        }
    }
    render() {
        const { søknad, vis, antallUkerFellesperiode, stegProps, søkerinfo } = this.props;

        return (
            <Steg {...stegProps}>
                <HarAnnenForelderSøktForeldrepengerSpørsmål visible={vis.harAnnenForelderSøktFPSpørsmål} />
                <DekningsgradSpørsmål visible={vis.dekningsgradSpørsmål} />
                <MorSinSisteUttaksdagSpørsmål visible={vis.morSinSisteUttaksdagSpørsmål} />
                <StartdatoPermisjonBolk visible={vis.startdatoPermisjonSpørsmål} />
                <MorSinSisteUttaksdagSpørsmål visible={vis.morSinSisteUttaksdagSpørsmål} />
                <FordelingFellesperiodeSpørsmål
                    visible={vis.fordelingFellesperiodeSpørsmål}
                    ukerFellesperiode={antallUkerFellesperiode}
                    navnForelder1={søkerinfo.person.fornavn}
                    navnForelder2={søknad.annenForelder.navn}
                />
                <PlanlagtOppholdIUttakSpørsmål visible={vis.planlagtOppholdIUttakSpørsmål} />
            </Steg>
        );
    }
}

const mapStateToProps = (state: AppState, props: SøkerinfoProps & HistoryProps): StateProps => {
    const { history } = props;

    const stegProps: StegProps = {
        id: StegID.UTTAKSPLAN_SKJEMA,
        renderFortsettKnapp: uttaksplanSkjemaErGyldig(state.søknad, props.søkerinfo),
        history,
        isAvailable: isAvailable(StegID.UTTAKSPLAN_SKJEMA, state.søknad, props.søkerinfo)
    };

    const permisjonsregler = getPermisjonsregler();

    return {
        stegProps,
        søknad: state.søknad,
        familiehendelsesdato: getFamiliehendelsedato(state.søknad.barn, state.søknad.situasjon),
        antallUkerFellesperiode: getAntallUkerFellesperiode(permisjonsregler, state.søknad.dekningsgrad!),
        vis: getUttaksplanSkjemaStegVisibility(state.søknad, props.søkerinfo)
    };
};

export default connect<StateProps, {}, {}>(mapStateToProps)(injectIntl(UttaksplanSkjemaSteg));
