import * as React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import lenker from '../../../util/routing/lenker';
import { StegID } from '../../../util/routing/stegConfig';
import { default as Steg, StegProps } from '../../../components/steg/Steg';
import { AppState } from '../../../redux/reducers';
import Søknad, { EndringTilbakeITid } from '../../../types/søknad/Søknad';
import { DispatchProps } from 'common/redux/types';
import { SøkerinfoProps } from '../../../types/søkerinfo';
import { HistoryProps } from '../../../types/common';
import { Periode, TilgjengeligStønadskonto, EndringTilbakeITidÅrsak } from '../../../types/uttaksplan/periodetyper';
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
import { Forelder } from 'common/types';
import { getErSøkerFarEllerMedmor } from '../../../util/domain/personUtil';
import { MissingAttachment } from '../../../types/MissingAttachment';
import { findMissingAttachmentsForPerioder } from '../../../util/attachments/missingAttachmentUtil';
import OvertrukneDager from './OvertrukneDager';
import { beregnGjenståendeUttaksdager } from 'app/util/uttaksPlanStatus';
import { Søknadsinfo } from '../../../selectors/types';
import { getSøknadsinfo } from '../../../selectors/søknadsinfoSelector';
import getInformasjonOmTaptUttakVedUttakEtterSeksUkerFarMedmor from '../../../regler/uttaksplan/getInformasjonOmTaptUttakVedUttakEtterSeksUkerFarMedmor';
import { Periodene } from '../../../util/uttaksplan/Periodene';
import { finnÅrsakTilEndringTilbakeITid } from 'app/util/uttaksplan/uttakUtils';
import BegrunnelseForIkkeÅSøkeTidligere from './BegrunnelseForIkkeÅSøkeTidligere';
import { Attachment } from 'common/storage/attachment/types/Attachment';

interface StateProps {
    stegProps: StegProps;
    søknad: Søknad;
    søknadsinfo?: Søknadsinfo;
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[];
    uttaksstatus: Stønadskontouttak[];
    uttaksstatusOvertrukneDager: Stønadskontouttak[];
    perioder: Periode[];
    lastAddedPeriodeId: string | undefined;
    uttaksplanValidering: UttaksplanValideringState;
    isLoadingTilgjengeligeStønadskontoer: boolean;
    missingAttachments: MissingAttachment[];
    årsakTilEndringTilbakeITid: EndringTilbakeITidÅrsak;
    endringTilbakeITid: Partial<EndringTilbakeITid>;
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
        this.getOvertrukneKontoer = this.getOvertrukneKontoer.bind(this);

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

    handleBegrunnelseChange = (begrunnelse: string) => {
        this.props.dispatch(
            søknadActions.setEndringTilbakeITid({
                begrunnelse
            })
        );
    };

    handleBegrunnelseVedleggChange = (vedlegg: Attachment[]) => {
        this.props.dispatch(
            søknadActions.setEndringTilbakeITid({
                vedlegg
            })
        );
    };

    getOvertrukneKontoer(uttaksstatusOvertrukneDager: Stønadskontouttak[]) {
        return uttaksstatusOvertrukneDager.filter((konto) => konto.antallDager < 0);
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
            uttaksstatusOvertrukneDager,
            tilgjengeligeStønadskontoer,
            lastAddedPeriodeId,
            dispatch,
            missingAttachments,
            årsakTilEndringTilbakeITid,
            endringTilbakeITid,
            søknadsinfo
        } = this.props;

        if (!søknadsinfo) {
            return null;
        }

        const { visFeiloppsummering } = this.state;
        const perioderIUttaksplan = søknad.uttaksplan.length > 0;
        const gjelderDagerBrukt = skalBeregneAntallDagerBrukt(
            søknadsinfo.søknaden.erDeltUttak,
            søknadsinfo.søker.erFarEllerMedmor,
            søknadsinfo.søknaden.erEndringssøknad
        );
        const overtrukneKontoer = this.getOvertrukneKontoer(uttaksstatusOvertrukneDager);

        const infoOmTaptUttakVedUttakEtterSeksUkerFarMedmor = getInformasjonOmTaptUttakVedUttakEtterSeksUkerFarMedmor(
            søknad.uttaksplan,
            søknadsinfo.søknaden.familiehendelsesdato,
            søknadsinfo.søker.erFarEllerMedmor,
            søknadsinfo.mor.harRett === false,
            søknadsinfo.mor.erUfør
        );

        const planInneholderTapteDager =
            Periodene(søknad.uttaksplan).getHull().length > 0 ||
            infoOmTaptUttakVedUttakEtterSeksUkerFarMedmor !== undefined;

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
                        navnPåForeldre={søknadsinfo.navn.navnPåForeldre}
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
                                søknadsinfo={søknadsinfo}
                                uttaksplanValidering={uttaksplanValidering}
                                lastAddedPeriodeId={lastAddedPeriodeId}
                                onAdd={(periode) => dispatch(søknadActions.uttaksplanAddPeriode(periode))}
                                onRequestReset={() => this.showBekreftSlettUttaksplanDialog()}
                                onDelete={(periode) => dispatch(søknadActions.uttaksplanDeletePeriode(periode))}
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
                                        navnPåForeldre={søknadsinfo.navn.navnPåForeldre}
                                        gjelderDagerBrukt={gjelderDagerBrukt}
                                    />
                                </Block>
                            )}
                        {overtrukneKontoer.length > 0 && (
                            <OvertrukneDager
                                overtrukneKontoer={overtrukneKontoer}
                                navnPåForeldre={søknadsinfo.navn.navnPåForeldre}
                            />
                        )}
                        {søknad.erEndringssøknad}
                        {årsakTilEndringTilbakeITid !== EndringTilbakeITidÅrsak.Ingen && (
                            <BegrunnelseForIkkeÅSøkeTidligere
                                årsak={årsakTilEndringTilbakeITid}
                                begrunnelse={endringTilbakeITid.begrunnelse}
                                vedlegg={endringTilbakeITid.vedlegg}
                                onBegrunnelseChange={this.handleBegrunnelseChange}
                                onVedleggChange={this.handleBegrunnelseVedleggChange}
                            />
                        )}

                        <Block margin="xs" visible={planInneholderTapteDager}>
                            <Veilederinfo type="advarsel">
                                <FormattedMessage id="uttaksplan.veileder.planenInneholderHull" />
                            </Veilederinfo>
                        </Block>
                        <Block margin="xs" visible={uttaksplanValidering.erGyldig && missingAttachments.length > 0}>
                            <Veilederinfo type="advarsel">
                                <FormattedMessage id="oppsummering.veileder.manglendeVedlegg" />
                            </Veilederinfo>
                        </Block>
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

    const søknadsinfo = getSøknadsinfo(state);

    const uttaksstatus: Stønadskontouttak[] = getUttaksstatus(
        tilgjengeligeStønadskontoer,
        søknad.uttaksplan,
        søknad.søker.rolle,
        søknad.erEndringssøknad
    );

    const uttaksstatusOvertrukneDager = beregnGjenståendeUttaksdager(
        tilgjengeligeStønadskontoer,
        søknad.uttaksplan,
        false
    );

    const årsakTilEndringTilbakeITid: EndringTilbakeITidÅrsak = finnÅrsakTilEndringTilbakeITid(søknad.uttaksplan);

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
        uttaksstatusOvertrukneDager,
        søknadsinfo,
        lastAddedPeriodeId: søknad.ekstrainfo.lastAddedPeriodeId,
        uttaksplanValidering: state.uttaksplanValidering,
        perioder: søknad.uttaksplan,
        isLoadingTilgjengeligeStønadskontoer,
        årsakTilEndringTilbakeITid,
        endringTilbakeITid: state.søknad.endringTilbakeITid,
        missingAttachments: findMissingAttachmentsForPerioder(
            søknad.uttaksplan,
            søknad.søker.rolle,
            søknad.annenForelder
        )
    };
};

export default connect<StateProps, {}, {}>(mapStateToProps)(UttaksplanSteg);
