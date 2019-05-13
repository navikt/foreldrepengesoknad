import * as React from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

import { AppState } from '../../../redux/reducers';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { default as Steg, StegProps } from '../../../components/steg/Steg';
import { DispatchProps } from 'common/redux/types';
import { getSeneEndringerSomKreverBegrunnelse } from 'app/util/uttaksplan/uttakUtils';
import { Forelder } from 'common/types';
import { getPeriodelisteElementId } from '../../../components/periodeliste/Periodeliste';
import { getSøknadsinfo } from '../../../selectors/søknadsinfoSelector';
import { getStønadskontoParams } from '../../../util/uttaksplan/stønadskontoParams';
import { getUttaksstatus, skalBeregneAntallDagerBrukt } from '../../../util/uttaksplan/uttaksstatus';
import { HistoryProps } from '../../../types/common';
import { hullMellomSisteUttaksdatoMorFørsteUttaksdatoFar } from 'app/regler/uttaksplan/hullMellomSisteUttaksdatoMorFørsteUttaksdatoFar';
import {
    Periode,
    TilgjengeligStønadskonto,
    SenEndringÅrsak,
    StønadskontoType,
    Stønadskontouttak
} from '../../../types/uttaksplan/periodetyper';
import { SøkerinfoProps } from '../../../types/søkerinfo';
import { Søknadsinfo } from '../../../selectors/types';
import { StegID } from '../../../util/routing/stegConfig';
import { UttaksplanValideringState } from '../../../redux/reducers/uttaksplanValideringReducer';
import apiActionCreators from '../../../redux/actions/api/apiActionCreators';
import ApplicationSpinner from 'common/components/application-spinner/ApplicationSpinner';
import BegrunnelseForSenEndring from './BegrunnelseForSenEndring';
import BekreftGåTilUttaksplanSkjemaDialog from './BekreftGåTilUttaksplanSkjemaDialog';
import BekreftSlettUttaksplanDialog from './BekreftSlettUttaksplanDialog';
import BekreftTilbakestillUttaksplanDialog from './BekreftTilbakestillUttaksplanDialog';
import Block from 'common/components/block/Block';
import isAvailable from '../util/isAvailable';
import Søknad, { Tilleggsopplysninger, Opplysning } from '../../../types/søknad/Søknad';
import søknadActions from '../../../redux/actions/søknad/søknadActionCreators';
import Uttaksoppsummering from '../../../components/uttaksoppsummering/Uttaksoppsummering';
import UttaksplanFeiloppsummering from '../../../components/uttaksplan-feiloppsummering/UttaksplanFeiloppsummering';
import Uttaksplanlegger from '../../../components/uttaksplanlegger/Uttaksplanlegger';
import { getVeilederInfoText } from 'app/util/uttaksplan/steg/util';
import { selectUttaksplanVeilederinfo } from 'app/selectors/uttaksplanVeilederinfoSelector';
import VeilederInfo, { VeilederMessage } from '../../../components/veileder-info/VeilederInfo';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { selectTilgjengeligeStønadskontoer } from 'app/selectors/apiSelector';
import { GetTilgjengeligeStønadskontoerParams } from 'app/api/api';
import getMessage from 'common/util/i18nUtils';
import { Feature, isFeatureEnabled } from '../../../Feature';
import InformasjonEgenSak from '../../../components/informasjon-egen-sak/InformasjonEgenSak';
import { finnEndringerIUttaksplan } from 'app/util/uttaksplan/uttaksplanEndringUtil';

interface StateProps {
    stegProps: StegProps;
    søknad: Søknad;
    søknadsinfo?: Søknadsinfo;
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[];
    uttaksstatus: Stønadskontouttak[];
    perioder: Periode[];
    lastAddedPeriodeId: string | undefined;
    uttaksplanValidering: UttaksplanValideringState;
    isLoadingTilgjengeligeStønadskontoer: boolean;
    årsakTilSenEndring: SenEndringÅrsak;
    vedleggForSenEndring: Attachment[];
    tilleggsopplysninger: Tilleggsopplysninger;
    aktivitetsfriKvote: number;
    uttaksplanVeilederInfo: VeilederMessage[];
    planErEndret: boolean;
}

interface UttaksplanStegState {
    bekreftGåTilbakeDialogSynlig: boolean;
    bekreftSlettUttaksplanDialogSynlig: boolean;
    bekreftTilbakestillUttaksplanDialogSynlig: boolean;
    visFeiloppsummering: boolean;
    harKlikketFortsett: boolean;
}

type Props = StateProps & DispatchProps & SøkerinfoProps & HistoryProps & InjectedIntlProps;

class UttaksplanSteg extends React.Component<Props, UttaksplanStegState> {
    feilOppsummering: React.Component | null;

    constructor(props: Props) {
        super(props);

        const { søknad, tilgjengeligeStønadskontoer, stegProps, søknadsinfo, dispatch } = this.props;

        this.onBekreftGåTilbake = this.onBekreftGåTilbake.bind(this);
        this.showBekreftGåTilbakeDialog = this.showBekreftGåTilbakeDialog.bind(this);
        this.hideBekreftGåTilbakeDialog = this.hideBekreftGåTilbakeDialog.bind(this);
        this.handleOnPeriodeErrorClick = this.handleOnPeriodeErrorClick.bind(this);
        this.hideBekreftSlettUttaksplanDialog = this.hideBekreftSlettUttaksplanDialog.bind(this);
        this.showBekreftSlettUttaksplanDialog = this.showBekreftSlettUttaksplanDialog.bind(this);
        this.showBekreftTilbakestillUttaksplanDialog = this.showBekreftTilbakestillUttaksplanDialog.bind(this);
        this.hideBekreftTilbakestillUttaksplanDialog = this.hideBekreftTilbakestillUttaksplanDialog.bind(this);
        this.onBekreftSlettUttaksplan = this.onBekreftSlettUttaksplan.bind(this);
        this.delayedSetFocusOnFeiloppsummering = this.delayedSetFocusOnFeiloppsummering.bind(this);
        this.onBekreftTilbakestillUttaksplan = this.onBekreftTilbakestillUttaksplan.bind(this);

        this.state = {
            bekreftGåTilbakeDialogSynlig: false,
            bekreftSlettUttaksplanDialogSynlig: false,
            bekreftTilbakestillUttaksplanDialogSynlig: false,
            visFeiloppsummering: false,
            harKlikketFortsett: false
        };
        if (stegProps.isAvailable && søknadsinfo !== undefined) {
            const { forslagLaget, startdatoPermisjon } = søknad.ekstrainfo.uttaksplanSkjema;
            if (forslagLaget === false) {
                dispatch(søknadActions.uttaksplanLagForslag());
            }
            if (tilgjengeligeStønadskontoer.length === 0) {
                const params: GetTilgjengeligeStønadskontoerParams = getStønadskontoParams(
                    søknadsinfo,
                    startdatoPermisjon
                );
                dispatch(apiActionCreators.getTilgjengeligeStønadskontoer(params, this.props.history));
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

    showBekreftTilbakestillUttaksplanDialog() {
        this.setState({ bekreftTilbakestillUttaksplanDialogSynlig: true });
    }

    hideBekreftSlettUttaksplanDialog() {
        this.setState({ bekreftSlettUttaksplanDialogSynlig: false });
    }

    hideBekreftTilbakestillUttaksplanDialog() {
        this.setState({ bekreftTilbakestillUttaksplanDialogSynlig: false });
    }

    onBekreftGåTilbake() {
        this.setState({ bekreftGåTilbakeDialogSynlig: false });
        this.props.history.push(StegID.UTTAKSPLAN_SKJEMA);
    }

    onBekreftSlettUttaksplan() {
        this.setState({ bekreftSlettUttaksplanDialogSynlig: false });
        this.props.dispatch(søknadActions.uttaksplanSetPerioder([]));
    }

    onBekreftTilbakestillUttaksplan() {
        this.setState({ bekreftTilbakestillUttaksplanDialogSynlig: false });
        const {
            søknad: {
                ekstrainfo: { sakForEndring }
            }
        } = this.props;
        this.props.dispatch(søknadActions.uttaksplanSetPerioder((sakForEndring && sakForEndring.uttaksplan) || []));
    }

    handleOnPeriodeErrorClick(periodeId: string) {
        const el = document.getElementById(getPeriodelisteElementId(periodeId));
        if (el) {
            el.focus();
        }
    }

    handleBegrunnelseChange = (årsak: string) => (begrunnelse: string) => {
        this.props.dispatch(
            søknadActions.setTilleggsopplysning(Opplysning.BEGRUNNELSE_FOR_SEN_ENDRING, begrunnelse, årsak)
        );
    };

    handleBegrunnelseVedleggChange = (vedlegg: Attachment[]) => {
        vedlegg.forEach((v) => {
            v.beskrivelse = getMessage(this.props.intl, 'vedlegg.beskrivelse.begrunnelseForSenEndring');
        });
        this.props.dispatch(søknadActions.setVedleggForSenEndring(vedlegg));
    };

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
            lastAddedPeriodeId,
            dispatch,
            årsakTilSenEndring,
            vedleggForSenEndring,
            tilleggsopplysninger,
            søknadsinfo,
            aktivitetsfriKvote,
            uttaksplanVeilederInfo,
            planErEndret,
            intl
        } = this.props;

        if (!søknadsinfo) {
            return (
                <Steg {...this.props.stegProps} renderFortsettKnapp={false}>
                    Det oppstod en feil, vennligst prøv på nytt
                </Steg>
            );
        }

        const { sakForEndring } = søknad.ekstrainfo;
        const { visFeiloppsummering } = this.state;
        const perioderIUttaksplan = søknad.uttaksplan.length > 0;

        const gjelderDagerBrukt = skalBeregneAntallDagerBrukt(
            søknadsinfo.søknaden.erDeltUttak,
            søknadsinfo.søker.erFarEllerMedmor,
            søknadsinfo.søknaden.erEndringssøknad,
            søknadsinfo.søknaden.erEnkelEndringssøknadMedUttaksplan
        );

        const defaultStønadskontoType =
            tilgjengeligeStønadskontoer.length === 1 ? tilgjengeligeStønadskontoer[0].konto : undefined;

        const visVeileder = søknad.ekstrainfo.erEnkelEndringssøknad !== true;

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
                    <>
                        {visVeileder && (
                            <VeilederInfo messages={[getVeilederInfoText(søknadsinfo, aktivitetsfriKvote, intl)]} />
                        )}
                        {isFeatureEnabled(Feature.hentSakForEndring) &&
                            sakForEndring && (
                                <Block>
                                    <InformasjonEgenSak
                                        sak={sakForEndring}
                                        tilgjengeligeStønadskontoer={tilgjengeligeStønadskontoer}
                                    />
                                </Block>
                            )}
                        <Block>
                            <Uttaksplanlegger
                                planErEndret={planErEndret}
                                uttaksplanForEndring={sakForEndring && sakForEndring.uttaksplan}
                                uttaksplan={søknad.uttaksplan}
                                søknadsinfo={søknadsinfo}
                                uttaksplanValidering={uttaksplanValidering}
                                lastAddedPeriodeId={lastAddedPeriodeId}
                                defaultStønadskontoType={defaultStønadskontoType}
                                onAdd={(periode) => dispatch(søknadActions.uttaksplanAddPeriode(periode))}
                                onRequestClear={() => this.showBekreftSlettUttaksplanDialog()}
                                onRequestRevert={
                                    sakForEndring ? () => this.showBekreftTilbakestillUttaksplanDialog() : undefined
                                }
                                onDelete={(periode) => dispatch(søknadActions.uttaksplanDeletePeriode(periode))}
                                forelder={søknadsinfo.søker.erFarEllerMedmor ? Forelder.FARMEDMOR : Forelder.MOR}
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

                        <Block visible={uttaksplanVeilederInfo.length > 0}>
                            <VeilederInfo
                                messages={uttaksplanVeilederInfo}
                                paneltype="plakat"
                                kompakt={true}
                                veilederStil={'normal'}
                                ariaTittel={getMessage(intl, 'uttaksplan.regelAvvik.ariaTittel')}
                            />
                        </Block>

                        {årsakTilSenEndring !== SenEndringÅrsak.Ingen && (
                            <BegrunnelseForSenEndring
                                årsak={årsakTilSenEndring}
                                begrunnelse={
                                    tilleggsopplysninger.begrunnelseForSenEndring
                                        ? tilleggsopplysninger.begrunnelseForSenEndring.tekst
                                        : ''
                                }
                                vedlegg={vedleggForSenEndring}
                                onBegrunnelseChange={this.handleBegrunnelseChange(årsakTilSenEndring)}
                                onVedleggChange={this.handleBegrunnelseVedleggChange}
                            />
                        )}
                    </>
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
                <BekreftTilbakestillUttaksplanDialog
                    synlig={this.state.bekreftTilbakestillUttaksplanDialogSynlig}
                    onSlett={this.onBekreftTilbakestillUttaksplan}
                    onAngre={this.hideBekreftTilbakestillUttaksplanDialog}
                />
            </Steg>
        );
    }
}

const mapStateToProps = (state: AppState, props: HistoryProps & SøkerinfoProps & InjectedIntlProps): StateProps => {
    const {
        søknad,
        api: { isLoadingTilgjengeligeStønadskontoer }
    } = state;
    const { søkerinfo, history } = props;

    const søknadsinfo = getSøknadsinfo(state);
    const tilgjengeligeStønadskontoer = selectTilgjengeligeStønadskontoer(state);

    const årsakTilSenEndring: SenEndringÅrsak = getSeneEndringerSomKreverBegrunnelse(søknad.uttaksplan);

    const uttaksplanForEndring = søknad.ekstrainfo.sakForEndring
        ? søknad.ekstrainfo.sakForEndring.uttaksplan
        : undefined;

    const planErEndret =
        uttaksplanForEndring !== undefined &&
        finnEndringerIUttaksplan(uttaksplanForEndring, søknad.uttaksplan).length > 0;

    const stegProps: StegProps = {
        id: StegID.UTTAKSPLAN,
        renderFortsettKnapp: isLoadingTilgjengeligeStønadskontoer !== true,
        renderFormTag: false,
        history,
        isAvailable: isAvailable(StegID.UTTAKSPLAN, søknad, søkerinfo, søknadsinfo)
    };

    let perioder = søknad.uttaksplan;
    if (søknadsinfo) {
        const { søknaden, søker } = søknadsinfo;

        if (søknaden.erFødsel && søknaden.erDeltUttak && søker.erFarEllerMedmor) {
            const sisteUttaksdatoMor = state.søknad.ekstrainfo.uttaksplanSkjema.morSinSisteUttaksdag;
            const førsteUttaksdatoFar = state.søknad.ekstrainfo.uttaksplanSkjema.farSinFørsteUttaksdag;
            perioder = hullMellomSisteUttaksdatoMorFørsteUttaksdatoFar(
                perioder,
                sisteUttaksdatoMor,
                førsteUttaksdatoFar
            );
        }
    }
    const uttaksstatus: Stønadskontouttak[] = søknadsinfo
        ? getUttaksstatus(søknadsinfo, tilgjengeligeStønadskontoer, søknad.uttaksplan)
        : [];

    const aktivitetsfriKvoteKonto = tilgjengeligeStønadskontoer.find(
        ({ konto }) => konto === StønadskontoType.AktivitetsfriKvote
    );

    const aktivitetsfriKvote = aktivitetsfriKvoteKonto ? Math.round(aktivitetsfriKvoteKonto.dager / 5) : 0;

    return {
        søknad,
        tilgjengeligeStønadskontoer,
        stegProps,
        uttaksstatus,
        søknadsinfo,
        lastAddedPeriodeId: søknad.ekstrainfo.lastAddedPeriodeId,
        uttaksplanValidering: state.uttaksplanValidering,
        perioder,
        isLoadingTilgjengeligeStønadskontoer,
        årsakTilSenEndring,
        vedleggForSenEndring: søknad.vedleggForSenEndring,
        tilleggsopplysninger: søknad.tilleggsopplysninger,
        uttaksplanVeilederInfo: selectUttaksplanVeilederinfo(props.intl)(state),
        aktivitetsfriKvote,
        planErEndret
    };
};

export default injectIntl(connect<StateProps, {}, {}>(mapStateToProps)(UttaksplanSteg));
