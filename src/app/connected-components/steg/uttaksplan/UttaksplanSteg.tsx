import * as React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import lenker from '../../../util/routing/lenker';
import { StegID } from '../../../util/routing/stegConfig';
import { default as Steg, StegProps } from '../../../components/steg/Steg';
import { AppState } from '../../../redux/reducers';
import Søknad from '../../../types/søknad/Søknad';
import { DispatchProps } from 'common/redux/types';
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
import { UttaksplanValideringState } from '../../../redux/reducers/uttaksplanValideringReducer';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import UttaksplanFeiloppsummering from '../../../components/uttaksplan-feiloppsummering/UttaksplanFeiloppsummering';
import { getPeriodelisteItemId } from '../../../components/periodeliste/Periodeliste';
import BekreftSlettUttaksplanDialog from './BekreftSlettUttaksplanDialog';
import { getUttaksstatus } from '../../../util/uttaksplan/uttaksstatus';
import { getNavnPåForeldre } from '../../../util/uttaksplan';
import { NavnPåForeldre } from 'common/types';
import { erFarEllerMedmor } from '../../../util/domain/personUtil';

interface StateProps {
    stegProps: StegProps;
    søknad: Søknad;
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[];
    uttaksstatus: Stønadskontouttak[];
    perioder: Periode[];
    lastAddedPeriodeId: string | undefined;
    navnPåForeldre: NavnPåForeldre;
    uttaksplanValidering: UttaksplanValideringState;
    isLoadingTilgjengeligeStønadskontoer: boolean;
}

interface UttaksplanStegState {
    bekreftGåTilbakeDialogSynlig: boolean;
    bekreftSlettUttaksplanDialogSynlig: boolean;
    visFeiloppsummering: boolean;
    harKlikketFortsett: boolean;
}

type Props = StateProps & DispatchProps & SøkerinfoProps & HistoryProps;

const getVeilederInfoText = (søknad: Søknad) => {
    const { annenForelder, søker } = søknad;

    if (erFarEllerMedmor(søknad.søker.rolle)) {
        if (
            annenForelder.kanIkkeOppgis ||
            (!annenForelder.harRettPåForeldrepenger && !annenForelder.erUfør) ||
            søker.erAleneOmOmsorg
        ) {
            return <FormattedMessage id="uttaksplan.informasjon.farMedmor.aleneOmsorg" />;
        } else if (annenForelder.erUfør) {
            return <FormattedMessage id="uttaksplan.informasjon.farMedmor.deltOmsorgMorUfør" />;
        } else {
            return (
                <FormattedHTMLMessage
                    id="uttaksplan.informasjon.farMedmor.deltUttak"
                    values={{
                        navn: annenForelder.fornavn,
                        link: lenker.viktigeFrister
                    }}
                />
            );
        }
    } else {
        if (annenForelder.kanIkkeOppgis || !annenForelder.harRettPåForeldrepenger || søker.erAleneOmOmsorg) {
            return <FormattedMessage id="uttaksplan.informasjon.mor.aleneOmsorg" />;
        } else {
            return <FormattedMessage id="uttaksplan.informasjon.mor.deltOmsorg" />;
        }
    }
};

class UttaksplanSteg extends React.Component<Props, UttaksplanStegState> {
    feilOppsummering: React.Component | null;

    constructor(props: Props) {
        super(props);

        const { søknad, tilgjengeligeStønadskontoer, dispatch } = this.props;

        this.onBekreftGåTilbake = this.onBekreftGåTilbake.bind(this);
        this.showBekreftGåTilbakeDialog = this.showBekreftGåTilbakeDialog.bind(this);
        this.hideBekreftGåTilbakeDialog = this.hideBekreftGåTilbakeDialog.bind(this);
        this.handleOnPeriodeErrorClick = this.handleOnPeriodeErrorClick.bind(this);
        this.hideBekreftSlettUttaksplanDialog = this.hideBekreftSlettUttaksplanDialog.bind(this);
        this.showBekreftSlettUttaksplanDialog = this.showBekreftSlettUttaksplanDialog.bind(this);
        this.onBekreftSlettUttaksplan = this.onBekreftSlettUttaksplan.bind(this);
        this.delayedSetFocusOnFeiloppsummering = this.delayedSetFocusOnFeiloppsummering.bind(this);

        this.state = {
            bekreftGåTilbakeDialogSynlig: false,
            bekreftSlettUttaksplanDialogSynlig: false,
            visFeiloppsummering: false,
            harKlikketFortsett: false
        };

        if (søknad.ekstrainfo.uttaksplanSkjema.forslagLaget === false) {
            dispatch(søknadActions.uttaksplanLagForslag(tilgjengeligeStønadskontoer));
        }
        if (tilgjengeligeStønadskontoer.length === 0) {
            dispatch(apiActionCreators.getTilgjengeligeStønadskonter(getStønadskontoParams(søknad)));
        }
    }

    showBekreftGåTilbakeDialog() {
        this.setState({ bekreftGåTilbakeDialogSynlig: true });
    }

    hideBekreftGåTilbakeDialog() {
        this.setState({ bekreftGåTilbakeDialogSynlig: false });
    }

    showBekreftSlettUttaksplanDialog() {
        this.setState({ bekreftSlettUttaksplanDialogSynlig: true });
    }

    hideBekreftSlettUttaksplanDialog() {
        this.setState({ bekreftSlettUttaksplanDialogSynlig: false });
    }

    onBekreftGåTilbake() {
        this.setState({ bekreftGåTilbakeDialogSynlig: false });
        this.props.history.push(StegID.UTTAKSPLAN_SKJEMA);
    }

    onBekreftSlettUttaksplan() {
        this.setState({ bekreftSlettUttaksplanDialogSynlig: false });
        this.props.dispatch(søknadActions.uttaksplanSetPerioder([]));
    }

    handleOnPeriodeErrorClick(periodeId: string) {
        const el = document.getElementById(getPeriodelisteItemId(periodeId));
        if (el) {
            el.focus();
        }
    }

    delayedSetFocusOnFeiloppsummering() {
        setTimeout(() => {
            if (this.feilOppsummering) {
                const el = ReactDOM.findDOMNode(this.feilOppsummering);
                if (el) {
                    (el as HTMLElement).focus();
                }
            }
        });
    }

    render() {
        const {
            søknad,
            uttaksplanValidering,
            isLoadingTilgjengeligeStønadskontoer,
            uttaksstatus,
            tilgjengeligeStønadskontoer,
            navnPåForeldre,
            lastAddedPeriodeId,
            dispatch
        } = this.props;
        const { visFeiloppsummering } = this.state;
        const perioderIUttaksplan = søknad.uttaksplan.length > 0;

        return (
            <Steg
                {...this.props.stegProps}
                onRequestNavigateToNextStep={() => {
                    this.setState({
                        harKlikketFortsett: true,
                        visFeiloppsummering: uttaksplanValidering.erGyldig === false
                    });
                    if (uttaksplanValidering.erGyldig === false) {
                        this.delayedSetFocusOnFeiloppsummering();
                    }
                    return uttaksplanValidering.erGyldig;
                }}
                confirmNavigateToPreviousStep={perioderIUttaksplan ? this.showBekreftGåTilbakeDialog : undefined}
                errorSummaryRenderer={() => (
                    <UttaksplanFeiloppsummering
                        ref={(c) => (this.feilOppsummering = c)}
                        uttaksplanValidering={uttaksplanValidering}
                        erSynlig={visFeiloppsummering}
                        uttaksplan={søknad.uttaksplan}
                        navnPåForeldre={navnPåForeldre}
                        onErrorClick={(periodeId: string) => this.handleOnPeriodeErrorClick(periodeId)}
                    />
                )}>
                {isLoadingTilgjengeligeStønadskontoer === true ? (
                    <ApplicationSpinner />
                ) : (
                    <React.Fragment>
                        <Veilederinfo maxWidth="30">{getVeilederInfoText(søknad)}</Veilederinfo>
                        <Block>
                            <Uttaksplanlegger
                                søkersituasjon={søknad.situasjon}
                                barn={søknad.barn}
                                uttaksplan={søknad.uttaksplan}
                                uttaksplanValidering={uttaksplanValidering}
                                lastAddedPeriodeId={lastAddedPeriodeId}
                                onAdd={(periode) => dispatch(søknadActions.uttaksplanAddPeriode(periode))}
                                onRequestReset={() => this.showBekreftSlettUttaksplanDialog()}
                                navnPåForeldre={navnPåForeldre}
                            />
                        </Block>
                        {søknad.uttaksplan &&
                            tilgjengeligeStønadskontoer.length > 0 && (
                                <Block margin="l">
                                    <Uttaksoppsummering uttak={uttaksstatus} navnPåForeldre={navnPåForeldre} />
                                </Block>
                            )}
                    </React.Fragment>
                )}
                <BekreftGåTilUttaksplanSkjemaDialog
                    synlig={this.state.bekreftGåTilbakeDialogSynlig}
                    onGåTilbake={this.onBekreftGåTilbake}
                    onBliVærende={this.hideBekreftGåTilbakeDialog}
                />
                <BekreftSlettUttaksplanDialog
                    synlig={this.state.bekreftSlettUttaksplanDialogSynlig}
                    onSlett={this.onBekreftSlettUttaksplan}
                    onAngre={this.hideBekreftSlettUttaksplanDialog}
                />
            </Steg>
        );
    }
}

const mapStateToProps = (state: AppState, props: HistoryProps & SøkerinfoProps): StateProps => {
    const {
        søknad,
        api: { tilgjengeligeStønadskontoer, isLoadingTilgjengeligeStønadskontoer }
    } = state;
    const { søkerinfo, history } = props;

    const uttaksstatus: Stønadskontouttak[] = getUttaksstatus(
        tilgjengeligeStønadskontoer,
        søknad.uttaksplan,
        søknad.søker.rolle
    );

    const stegProps: StegProps = {
        id: StegID.UTTAKSPLAN,
        renderFortsettKnapp: isLoadingTilgjengeligeStønadskontoer !== true,
        renderFormTag: false,
        history,
        isAvailable: isAvailable(StegID.UTTAKSPLAN, søknad, søkerinfo)
    };

    const navnPåForeldre = getNavnPåForeldre(state.søknad, state.api.søkerinfo!.person);

    return {
        søknad,
        tilgjengeligeStønadskontoer,
        stegProps,
        uttaksstatus,
        navnPåForeldre,
        lastAddedPeriodeId: søknad.ekstrainfo.lastAddedPeriodeId,
        uttaksplanValidering: state.uttaksplanValidering,
        perioder: søknad.uttaksplan,
        isLoadingTilgjengeligeStønadskontoer
    };
};

export default connect<StateProps, {}, {}>(mapStateToProps)(UttaksplanSteg);
