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
import DekningsgradSpørsmål from '../../../spørsm\u00E5l/DekningsgradSpørsm\u00E5l';
import søknadActions from '../../../redux/actions/søknad/søknadActionCreators';
import { SøknadPartial } from '../../../types/søknad/Søknad';
import Block from 'common/components/block/Block';
import getUttaksplanSkjemaStegVisibility, { UttaksplanSkjemaStegVisibility } from './uttaksplanSkjemaVisibility';
import StartdatoPermisjonBolk from '../../../bolker/StartdatoPermisjonBolk';
import PlanlagtOppholdIUttakSpørsmål from '../../../spørsm\u00E5l/PlanlagtOppholdIUttakSpørsm\u00E5l';
import FordelingFellesperiodeSpørsmål from '../../../spørsm\u00E5l/FordelingFellesperiodeSpørsm\u00E5l';
import { getPermisjonsregler } from '../../../util/uttaksplan/permisjonsregler';
import { getAntallUkerFellesperiode } from '../../../util/uttaksplan/permisjonUtils';
import { getFamiliehendelsedato } from '../../../util/uttaksplan';
import MorSinSisteUttaksdagSpørsmål from '../../../spørsmål/MorSinSisteUttaksdagSpørsmål';

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
        const {
            søknad,
            vis,
            antallUkerFellesperiode,
            familiehendelsesdato,
            stegProps,
            søkerinfo,
            dispatch
        } = this.props;
        const { uttaksplanSkjema } = søknad.ekstrainfo;
        return (
            <Steg {...stegProps}>
                <Block visible={vis.dekningsgradSpørsmål}>
                    <DekningsgradSpørsmål
                        dekningsgrad={søknad.dekningsgrad}
                        erAleneomsorg={søknad.søker.erAleneOmOmsorg}
                        onChange={(dekningsgrad) => dispatch(søknadActions.updateSøknad({ dekningsgrad }))}
                    />
                </Block>
                <Block visible={vis.startdatoPermisjonSpørsmål} hasChildBlocks={true}>
                    <StartdatoPermisjonBolk
                        familiehendelsesdato={familiehendelsesdato}
                        startdato={uttaksplanSkjema.startdatoPermisjon}
                        skalIkkeHaUttakFørTermin={uttaksplanSkjema.skalIkkeHaUttakFørTermin}
                        onDatoChange={(dato) =>
                            dispatch(
                                søknadActions.uttaksplanUpdateSkjemdata({
                                    startdatoPermisjon: dato,
                                    skalIkkeHaUttakFørTermin: false
                                })
                            )
                        }
                        onSkalIkkeHaUttakChange={(skalIkkeHaUttak) =>
                            dispatch(
                                søknadActions.uttaksplanUpdateSkjemdata({
                                    skalIkkeHaUttakFørTermin: skalIkkeHaUttak,
                                    startdatoPermisjon: undefined
                                })
                            )
                        }
                    />
                </Block>
                <Block visible={vis.morSinSisteUttaksdagSpørsmål}>
                    <MorSinSisteUttaksdagSpørsmål
                        startdato={uttaksplanSkjema.morSinSisteUttaksdag}
                        onChange={(morSinSisteUttaksdag) =>
                            dispatch(
                                søknadActions.uttaksplanUpdateSkjemdata({
                                    morSinSisteUttaksdag
                                })
                            )
                        }
                    />
                </Block>
                <Block visible={vis.fordelingFellesperiodeSpørsmål}>
                    <FordelingFellesperiodeSpørsmål
                        ukerFellesperiode={antallUkerFellesperiode}
                        ukerForelder1={uttaksplanSkjema.fellesperiodeukerForelder1!}
                        navnForelder1={søkerinfo.person.fornavn}
                        navnForelder2={søknad.annenForelder.navn}
                        onChange={(fellesperiodeukerForelder1) =>
                            dispatch(søknadActions.uttaksplanUpdateSkjemdata({ fellesperiodeukerForelder1 }))
                        }
                    />
                </Block>
                <Block visible={vis.planlagtOppholdIUttakSpørsmål}>
                    <PlanlagtOppholdIUttakSpørsmål
                        harPlanlagtOpphold={uttaksplanSkjema.harPlanlagtOppholdIUttak}
                        onChange={(harPlanlagtOppholdIUttak) =>
                            dispatch(
                                søknadActions.uttaksplanUpdateSkjemdata({
                                    harPlanlagtOppholdIUttak
                                })
                            )
                        }
                    />
                </Block>
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
