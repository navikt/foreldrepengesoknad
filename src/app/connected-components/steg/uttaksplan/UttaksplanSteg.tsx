import * as React from 'react';
import { connect } from 'react-redux';
import { StegID } from '../../../util/routing/stegConfig';
import { default as Steg, StegProps } from '../../../components/steg/Steg';
import { AppState } from '../../../redux/reducers';
import Søknad from '../../../types/søknad/Søknad';
import { DispatchProps } from 'common/redux/types';
import Person from '../../../types/Person';
import { SøkerinfoProps } from '../../../types/søkerinfo';
import { HistoryProps } from '../../../types/common';
import { Periode, TilgjengeligStønadskonto } from '../../../types/uttaksplan/periodetyper';
import isAvailable from '../util/isAvailable';
import søknadActions from '../../../redux/actions/søknad/søknadActionCreators';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import Uttaksplanlegger from '../../../components/uttaksplanlegger/Uttaksplanlegger';
import Block from 'common/components/block/Block';
import apiActionCreators from '../../../redux/actions/api/apiActionCreators';
import { getStønadskontoParams } from '../../../util/uttaksplan/stønadskontoParams';
import BekreftGåTilUttaksplanSkjemaDialog from './BekreftGåTilUttaksplanSkjemaDialog';
import ApplicationSpinner from 'common/components/application-spinner/ApplicationSpinner';
import Uttaksoppsummering, { Stønadskontouttak } from '../../../components/uttaksoppsummering/Uttaksoppsummering';
import { beregnGjenståendeUttaksdager } from '../../../util/uttaksPlanStatus';

interface StateProps {
    stegProps: StegProps;
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[];
    søknad: Søknad;
    person: Person;
    uttaksStatus: Stønadskontouttak[];
    perioder: Periode[];
    isLoadingTilgjengeligeStønadskontoer: boolean;
}

interface UttaksplanStegState {
    bekreftDialogSynlig: boolean;
}

type Props = StateProps & DispatchProps & SøkerinfoProps & HistoryProps;

class UttaksplanSteg extends React.Component<Props, UttaksplanStegState> {
    constructor(props: Props) {
        super(props);

        const { søknad, person, dispatch, tilgjengeligeStønadskontoer } = this.props;
        this.onBekreftGåTilbake = this.onBekreftGåTilbake.bind(this);
        this.showBekreftDialog = this.showBekreftDialog.bind(this);
        this.hideBekreftDialog = this.hideBekreftDialog.bind(this);

        this.state = {
            bekreftDialogSynlig: false
        };

        if (!søknad.ekstrainfo.uttaksplanSkjema.forslagLaget) {
            dispatch(søknadActions.uttaksplanLagForslag(tilgjengeligeStønadskontoer));
        }
        if (tilgjengeligeStønadskontoer.length === 0) {
            dispatch(apiActionCreators.getTilgjengeligeStønadskonter(getStønadskontoParams(søknad, person)));
        }
        dispatch(apiActionCreators.getTilgjengeligeStønadskonter(getStønadskontoParams(søknad, person)));
    }

    showBekreftDialog() {
        this.setState({ bekreftDialogSynlig: true });
    }

    hideBekreftDialog() {
        this.setState({ bekreftDialogSynlig: false });
    }

    onBekreftGåTilbake() {
        this.setState({ bekreftDialogSynlig: false });
        this.props.history.push(StegID.UTTAKSPLAN_SKJEMA);
    }

    render() {
        const { søknad, søkerinfo, isLoadingTilgjengeligeStønadskontoer, dispatch, uttaksStatus } = this.props;
        const navn = {
            navnMor: søkerinfo.person.fornavn,
            navnFarMedmor: søknad.annenForelder ? søknad.annenForelder.fornavn : undefined
        };
        const perioderIUttaksplan = søknad.uttaksplan.length > 0;

        return (
            <Steg
                {...this.props.stegProps}
                confirmNavigateToPreviousStep={perioderIUttaksplan ? this.showBekreftDialog : undefined}>
                {isLoadingTilgjengeligeStønadskontoer === true ? (
                    <ApplicationSpinner />
                ) : (
                    <React.Fragment>
                        <Veilederinfo maxWidth="30">
                            Her velger du hvordan du ønsker å legge opp ditt uttak.
                        </Veilederinfo>
                        <Block>
                            <Uttaksplanlegger
                                søkersituasjon={søknad.situasjon}
                                barn={søknad.barn}
                                uttaksplan={søknad.uttaksplan}
                                onAdd={(periode) => dispatch(søknadActions.uttaksplanAddPeriode(periode))}
                                onRequestReset={() => dispatch(søknadActions.uttaksplanSetPerioder([]))}
                                {...navn}
                            />
                        </Block>
                        <Block margin="l">
                            <Uttaksoppsummering uttak={uttaksStatus} {...navn} />
                        </Block>
                    </React.Fragment>
                )}
                <BekreftGåTilUttaksplanSkjemaDialog
                    synlig={this.state.bekreftDialogSynlig}
                    onGåTilbake={this.onBekreftGåTilbake}
                    onBliVærende={this.hideBekreftDialog}
                />
            </Steg>
        );
    }
}

const mapStateToProps = (state: AppState, props: HistoryProps & SøkerinfoProps): StateProps => {
    const {
        søknad,
        api: { tilgjengeligeStønadskontoer }
    } = state;
    const { søkerinfo, history } = props;

    const uttaksStatus: Stønadskontouttak[] = beregnGjenståendeUttaksdager(
        tilgjengeligeStønadskontoer,
        søknad.uttaksplan
    );
    const stegProps: StegProps = {
        id: StegID.UTTAKSPLAN,
        renderFortsettKnapp: true,
        renderFormTag: false,
        history,
        isAvailable: isAvailable(StegID.UTTAKSPLAN, søknad, søkerinfo)
    };

    return {
        søknad,
        tilgjengeligeStønadskontoer,
        person: props.søkerinfo.person,
        stegProps,
        uttaksStatus,
        perioder: søknad.uttaksplan,
        isLoadingTilgjengeligeStønadskontoer: state.api.isLoadingTilgjengeligeStønadskontoer
    };
};

export default connect<StateProps, {}, {}>(mapStateToProps)(UttaksplanSteg);
