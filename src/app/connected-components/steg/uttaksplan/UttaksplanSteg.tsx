import * as React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import lenker from '../../../util/routing/lenker';
import { StegID } from '../../../util/routing/stegConfig';
import { default as Steg, StegProps } from '../../../components/steg/Steg';
import { AppState } from '../../../redux/reducers';
import Søknad, { SøkerRolle } from '../../../types/søknad/Søknad';
import { DispatchProps } from 'common/redux/types';
import { SøkerinfoProps } from '../../../types/søkerinfo';
import { HistoryProps } from '../../../types/common';
import { Periode, StønadskontoType, TilgjengeligStønadskonto } from '../../../types/uttaksplan/periodetyper';
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
import { UttaksplanValideringState } from '../../../redux/reducers/uttaksplanValideringReducer';
import { FormattedMessage } from 'react-intl';
import Lenke from 'nav-frontend-lenker';
import UttaksplanFeiloppsummering from '../../../components/uttaksplan-feiloppsummering/UttaksplanFeiloppsummering';
import { getPeriodelisteItemId } from '../../../components/periodeliste/Periodeliste';
import { erFarEllerMedmor } from '../../../util/domain/personUtil';
import BekreftSlettUttaksplanDialog from './BekreftSlettUttaksplanDialog';

interface StateProps {
    stegProps: StegProps;
    søknad: Søknad;
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[];
    uttaksstatus: Stønadskontouttak[];
    perioder: Periode[];
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
    if (
        (søknad.søker.rolle === SøkerRolle.FAR || søknad.søker.rolle === SøkerRolle.MEDMOR) &&
        søknad.annenForelder.kanIkkeOppgis !== true &&
        søknad.annenForelder.harRettPåForeldrepenger === true
    ) {
        return (
            <FormattedMessage
                id="uttaksplan.informasjonFarMedmorDeltUttak"
                values={{
                    navn: søknad.annenForelder.fornavn,
                    link: (
                        <Lenke href={lenker.viktigeFrister} target="_blank">
                            <FormattedMessage id="uttaksplan.fristerLinkTekst" />
                        </Lenke>
                    )
                }}
            />
        );
    } else {
        return <FormattedMessage id="uttaksplan.informasjonTilSøker" />;
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

    render() {
        const {
            søknad,
            uttaksplanValidering,
            isLoadingTilgjengeligeStønadskontoer,
            uttaksstatus,
            dispatch
        } = this.props;
        const { visFeiloppsummering } = this.state;
        const { uttaksplanInfo } = søknad.ekstrainfo;
        const perioderIUttaksplan = søknad.uttaksplan.length > 0;

        return (
            <Steg
                {...this.props.stegProps}
                requestNavigateToNextStep={() => {
                    this.setState({
                        harKlikketFortsett: true,
                        visFeiloppsummering: uttaksplanValidering.erGyldig === false
                    });
                    setTimeout(() => {
                        if (this.feilOppsummering) {
                            const el = ReactDOM.findDOMNode(this.feilOppsummering);
                            if (el) {
                                (el as HTMLElement).focus();
                            }
                        }
                    });
                    return uttaksplanValidering.erGyldig;
                }}
                confirmNavigateToPreviousStep={perioderIUttaksplan ? this.showBekreftGåTilbakeDialog : undefined}
                errorSummaryRenderer={() => (
                    <UttaksplanFeiloppsummering
                        ref={(c) => (this.feilOppsummering = c)}
                        uttaksplanValidering={uttaksplanValidering}
                        erSynlig={visFeiloppsummering}
                        uttaksplan={søknad.uttaksplan}
                        onErrorClick={(periodeId: string) => this.handleOnPeriodeErrorClick(periodeId)}
                    />
                )}>
                {isLoadingTilgjengeligeStønadskontoer === true || !uttaksplanInfo ? (
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
                                onAdd={(periode) => dispatch(søknadActions.uttaksplanAddPeriode(periode))}
                                onRequestReset={() => this.showBekreftSlettUttaksplanDialog()}
                                navnPåForeldre={uttaksplanInfo.navnPåForeldre}
                            />
                        </Block>
                        {søknad.uttaksplan &&
                            søknad.uttaksplan.length > 0 && (
                                <Block margin="l">
                                    <Uttaksoppsummering
                                        uttak={uttaksstatus}
                                        navnPåForeldre={uttaksplanInfo.navnPåForeldre}
                                    />
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

const getUttaksstatus = (
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    uttaksplan: Periode[],
    søkerrolle: SøkerRolle
) => {
    const uttaksstatus: Stønadskontouttak[] = beregnGjenståendeUttaksdager(tilgjengeligeStønadskontoer, uttaksplan);
    if (erFarEllerMedmor(søkerrolle)) {
        return uttaksstatus.filter((kontouttak) => kontouttak.konto !== StønadskontoType.ForeldrepengerFørFødsel);
    }
    return uttaksstatus;
};

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

    return {
        søknad,
        tilgjengeligeStønadskontoer,
        stegProps,
        uttaksstatus,
        uttaksplanValidering: state.uttaksplanValidering,
        perioder: søknad.uttaksplan,
        isLoadingTilgjengeligeStønadskontoer
    };
};

export default connect<StateProps, {}, {}>(mapStateToProps)(UttaksplanSteg);
