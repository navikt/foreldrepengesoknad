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
import { getPeriodelisteElementId } from '../../../components/periodeliste/Periodeliste';
import BekreftSlettUttaksplanDialog from './BekreftSlettUttaksplanDialog';
import { getUttaksstatus, skalBeregneAntallDagerBrukt } from '../../../util/uttaksplan/uttaksstatus';
import { getNavnPåForeldre } from '../../../util/uttaksplan';
import { NavnPåForeldre, Forelder } from 'common/types';
import { getErSøkerFarEllerMedmor } from '../../../util/domain/personUtil';
import { getErDeltUttak } from '../../../util/uttaksplan/forslag/util';
import { MissingAttachment } from '../../../types/MissingAttachment';
import { findMissingAttachmentsForPerioder } from '../../../util/attachments/missingAttachmentUtil';
import { isFeatureEnabled, Feature } from '../../../Feature';

interface StateProps {
    stegProps: StegProps;
    søknad: Søknad;
    erDeltUttak: boolean;
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[];
    uttaksstatus: Stønadskontouttak[];
    perioder: Periode[];
    lastAddedPeriodeId: string | undefined;
    navnPåForeldre: NavnPåForeldre;
    uttaksplanValidering: UttaksplanValideringState;
    isLoadingTilgjengeligeStønadskontoer: boolean;
    missingAttachments: MissingAttachment[];
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

    if (getErSøkerFarEllerMedmor(søknad.søker.rolle)) {
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
                        navnAnnenForelder: annenForelder.fornavn,
                        link: lenker.viktigeFrister
                    }}
                />
            );
        }
    } else {
        if (annenForelder.kanIkkeOppgis || !annenForelder.harRettPåForeldrepenger || søker.erAleneOmOmsorg) {
            return <FormattedMessage id="uttaksplan.informasjon.mor.aleneOmsorg" />;
        } else {
            return (
                <FormattedMessage
                    id="uttaksplan.informasjon.mor.deltOmsorg"
                    values={{ navnAnnenForelder: annenForelder.fornavn }}
                />
            );
        }
    }
};

class UttaksplanSteg extends React.Component<Props, UttaksplanStegState> {
    feilOppsummering: React.Component | null;

    constructor(props: Props) {
        super(props);

        const { søknad, tilgjengeligeStønadskontoer, stegProps, dispatch } = this.props;

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
        if (stegProps.isAvailable) {
            if (søknad.ekstrainfo.uttaksplanSkjema.forslagLaget === false) {
                dispatch(søknadActions.uttaksplanLagForslag(tilgjengeligeStønadskontoer));
            }
            if (tilgjengeligeStønadskontoer.length === 0) {
                dispatch(
                    apiActionCreators.getTilgjengeligeStønadskonter(getStønadskontoParams(søknad), this.props.history)
                );
            }
            if (
                isFeatureEnabled(Feature.hentUttaksplanForEndring) &&
                søknad.erEndringssøknad &&
                søknad.saksnummer !== undefined &&
                søknad.ekstrainfo.endringUttaksplan === undefined
            ) {
                dispatch(apiActionCreators.getUttaksplanForSak(søknad.saksnummer));
            }
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
        const el = document.getElementById(getPeriodelisteElementId(periodeId));
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
            erDeltUttak,
            dispatch,
            missingAttachments
        } = this.props;

        const { visFeiloppsummering } = this.state;
        const perioderIUttaksplan = søknad.uttaksplan.length > 0;
        const gjelderDagerBrukt = skalBeregneAntallDagerBrukt(
            erDeltUttak,
            getErSøkerFarEllerMedmor(søknad.søker.rolle),
            søknad.erEndringssøknad
        );
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
                        <Veilederinfo>{getVeilederInfoText(søknad)}</Veilederinfo>
                        <Block>
                            <Uttaksplanlegger
                                søknad={søknad}
                                uttaksplanValidering={uttaksplanValidering}
                                lastAddedPeriodeId={lastAddedPeriodeId}
                                onAdd={(periode) => dispatch(søknadActions.uttaksplanAddPeriode(periode))}
                                onRequestReset={() => this.showBekreftSlettUttaksplanDialog()}
                                onDelete={(periode) => dispatch(søknadActions.uttaksplanDeletePeriode(periode))}
                                navnPåForeldre={navnPåForeldre}
                                forelder={
                                    getErSøkerFarEllerMedmor(søknad.søker.rolle) ? Forelder.FARMEDMOR : Forelder.MOR
                                }
                            />
                        </Block>
                        {søknad.uttaksplan &&
                            tilgjengeligeStønadskontoer.length > 0 && (
                                <Block margin="l">
                                    <Uttaksoppsummering
                                        uttak={uttaksstatus}
                                        navnPåForeldre={navnPåForeldre}
                                        gjelderDagerBrukt={gjelderDagerBrukt}
                                    />
                                </Block>
                            )}
                        {uttaksplanValidering.erGyldig &&
                            missingAttachments.length > 0 && (
                                <Veilederinfo type="advarsel">
                                    <FormattedMessage id="oppsummering.veileder.manglendeVedlegg" />
                                </Veilederinfo>
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
        søknad.søker.rolle,
        søknad.erEndringssøknad
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
        erDeltUttak: getErDeltUttak(tilgjengeligeStønadskontoer),
        lastAddedPeriodeId: søknad.ekstrainfo.lastAddedPeriodeId,
        uttaksplanValidering: state.uttaksplanValidering,
        perioder: søknad.uttaksplan,
        isLoadingTilgjengeligeStønadskontoer,
        missingAttachments: findMissingAttachmentsForPerioder(søknad.uttaksplan, søknad.søker.rolle)
    };
};

export default connect<StateProps, {}, {}>(mapStateToProps)(UttaksplanSteg);
