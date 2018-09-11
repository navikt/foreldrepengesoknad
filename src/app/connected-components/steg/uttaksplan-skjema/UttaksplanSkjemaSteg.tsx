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
import Søknad, { SøknadPartial } from '../../../types/søknad/Søknad';
import getUttaksplanSkjemaStegVisibility, { UttaksplanSkjemaStegVisibility } from './uttaksplanSkjemaVisibility';
import PlanlagtOppholdIUttakSpørsmål from '../../../spørsmål/PlanlagtOppholdIUttakSpørsmål';
import FordelingFellesperiodeSpørsmål from '../../../spørsmål/FordelingFellesperiodeSpørsmål';
import { getPermisjonsregler } from '../../../util/uttaksplan/permisjonsregler';
import { getAntallUkerFellesperiode } from '../../../util/uttaksplan/permisjonUtils';
import { getFamiliehendelsedato } from '../../../util/uttaksplan';
import MorSinSisteUttaksdagSpørsmål from './enkeltspørsmål/MorSinSisteUttaksdagSpørsmål';
import HarAnnenForelderSøktForeldrepengerSpørsmål from './enkeltspørsmål/HarAnnenForelderSøktForeldrepengerSpørsmål';
import StartdatoPermisjonBolk from './enkeltspørsmål/StartdatoPermisjonBolk';
import SkalStarteRettEtterMorSpørsmål from './enkeltsp\u00F8rsm\u00E5l/SkalStarteRettEtterMorSp\u00F8rsm\u00E5l';
import SkalHaDelAvFellesperiodeSpørsmål from './enkeltsp\u00F8rsm\u00E5l/SkalHaDelAvFellesperiodeSp\u00F8rsm\u00E5l';
import UtsettelseEtterMor from './enkeltsp\u00F8rsm\u00E5l/UtsettelseEtterMor';
import { getUttaksplanSkjemaScenario, UttaksplanSkjemaScenario } from './uttaksplanSkjemaScenario';

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
    renderQuestions() {
        const scenario: UttaksplanSkjemaScenario = getUttaksplanSkjemaScenario(
            this.props.søknad as Søknad,
            this.props.søkerinfo
        );
        const { vis, antallUkerFellesperiode, søkerinfo, søknad } = this.props;
        switch (scenario) {
            case UttaksplanSkjemaScenario['1-farMedmor-fødsel-førsteganggsøknad-beggeHarRett']:
                return (
                    <>
                        <HarAnnenForelderSøktForeldrepengerSpørsmål visible={vis.harAnnenForelderSøktFPSpørsmål} />
                        <DekningsgradSpørsmål visible={vis.dekningsgradSpørsmål} />
                        <MorSinSisteUttaksdagSpørsmål visible={vis.morSinSisteUttaksdagSpørsmål} />
                        <SkalStarteRettEtterMorSpørsmål visible={vis.skalStarteRettEtterMorSpørsmål} />
                        <UtsettelseEtterMor visible={vis.utsettelseEtterMor} />
                        <SkalHaDelAvFellesperiodeSpørsmål visible={vis.skalHaDelAvFellesperiodeSpørsmål} />
                    </>
                );
            case UttaksplanSkjemaScenario['3-mor-fødsel-førsteganggsøknad']:
                return (
                    <>
                        <StartdatoPermisjonBolk visible={vis.startdatoPermisjonSpørsmål} />
                        <PlanlagtOppholdIUttakSpørsmål visible={vis.planlagtOppholdIUttakSpørsmål} />
                        <FordelingFellesperiodeSpørsmål
                            visible={vis.fordelingFellesperiodeSpørsmål}
                            ukerFellesperiode={antallUkerFellesperiode}
                            navnForelder1={søkerinfo.person.fornavn}
                            navnForelder2={søknad.annenForelder.navn}
                        />
                    </>
                );
            default:
                return <>Ukjent scenario</>;
        }
    }
    render() {
        const { stegProps } = this.props;

        return <Steg {...stegProps}>{this.renderQuestions()}</Steg>;
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
