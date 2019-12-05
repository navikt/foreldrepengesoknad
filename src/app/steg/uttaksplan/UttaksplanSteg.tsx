import * as React from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

import { AppState } from '../../redux/reducers';
import { Attachment } from 'app/components/storage/attachment/types/Attachment';
import { default as Steg, StegProps } from '../../components/applikasjon/steg/Steg';
import { DispatchProps } from 'common/redux/types';
import {
    getSeneEndringerSomKreverBegrunnelse,
    skalKunneViseMorsUttaksplanForFarEllerMedmor
} from 'app/util/uttaksplan/uttakUtils';
import { Forelder } from 'common/types';
import { getPeriodelisteElementId } from '../../components/uttaksplanlegger/components/periodeliste/Periodeliste';
import { selectSøknadsinfo } from '../../selectors/søknadsinfoSelector';
import { getStønadskontoParams } from '../../util/uttaksplan/stønadskontoParams';
import { getUttaksstatus, Uttaksstatus } from '../../util/uttaksplan/uttaksstatus';
import { HistoryProps } from '../../types/common';
import {
    Periode,
    TilgjengeligStønadskonto,
    SenEndringÅrsak,
    StønadskontoType
} from '../../types/uttaksplan/periodetyper';
import { SøkerinfoProps } from '../../types/søkerinfo';
import { Søknadsinfo } from '../../selectors/types';
import { StegID } from '../../util/routing/stegConfig';
import { UttaksplanValideringState } from '../../redux/reducers/uttaksplanValideringReducer';
import apiActionCreators from '../../redux/actions/api/apiActionCreators';
import ApplicationSpinner from 'common/components/applicationSpinner/ApplicationSpinner';
import BegrunnelseForSenEndring from './BegrunnelseForSenEndring';
import BekreftGåTilUttaksplanSkjemaDialog from './BekreftGåTilUttaksplanSkjemaDialog';
import BekreftSlettUttaksplanDialog from './BekreftSlettUttaksplanDialog';
import BekreftTilbakestillUttaksplanDialog from './BekreftTilbakestillUttaksplanDialog';
import Block from 'common/components/block/Block';
import isAvailable from '../../util/steg/isAvailable';
import Søknad, { Tilleggsopplysninger, Opplysning } from '../../types/søknad/Søknad';
import søknadActions from '../../redux/actions/søknad/søknadActionCreators';
import Uttaksplanlegger from '../../components/uttaksplanlegger/Uttaksplanlegger';
import {
    selectUttaksplanVeilederinfo,
    selectPeriodelisteMeldinger
} from 'app/selectors/uttaksplanVeilederinfoSelector';
import VeilederInfo from '../../components/veilederInfo/VeilederInfo';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { selectTilgjengeligeStønadskontoer } from 'app/selectors/apiSelector';
import { GetTilgjengeligeStønadskontoerParams } from 'app/api/api';
import getMessage from 'common/util/i18nUtils';
import Sak from 'app/types/søknad/Sak';
import { Saksgrunnlag, Saksperiode } from 'app/types/EksisterendeSak';
import { selectPerioderSomSkalSendesInn } from 'app/selectors/søknadSelector';
import { VeilederMessage, VeiledermeldingerPerPeriode } from 'app/components/veilederInfo/types';
import UttaksplanFeiloppsummering from 'app/components/uttaksplanlegger/components/uttaksplan-feiloppsummering/UttaksplanFeiloppsummering';
import InfoEksisterendeSak from './infoEksisterendeSak/InfoEksisterendeSak';
import Barn from 'app/types/søknad/Barn';
import OversiktBrukteDager from 'app/components/uttaksplanlegger/components/oversiktBrukteDager/OversiktBrukteDager';
import DevPerioderSomSendesInn from './DevPerioderSomSendesInn';
import FeatureBlock from 'app/components/elementer/featureBlock/FeatureBlock';
import { Feature } from 'app/Feature';
import ResetSoknad from 'app/components/applikasjon/resetSoknad/ResetSoknad';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { getAktiveArbeidsforhold } from 'app/api/utils/søkerinfoUtils';
import addPeriode from 'app/util/uttaksplan/builder/addPeriode';
import deletePeriode from 'app/util/uttaksplan/builder/deletePeriode';
import updatePeriode from 'app/util/uttaksplan/builder/updatePeriode';
import { getEndringstidspunkt } from 'app/util/dates/dates';
import { Uttaksdagen } from 'app/util/uttaksplan/Uttaksdagen';
import moment from 'moment';

interface StateProps {
    stegProps: StegProps;
    søknad: Søknad;
    søknadsinfo?: Søknadsinfo;
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[];
    uttaksstatus: Uttaksstatus | undefined;
    lastAddedPeriodeId: string | undefined;
    uttaksplanValidering: UttaksplanValideringState;
    isLoadingTilgjengeligeStønadskontoer: boolean;
    årsakTilSenEndring?: SenEndringÅrsak;
    vedleggForSenEndring: Attachment[];
    tilleggsopplysninger: Tilleggsopplysninger;
    aktivitetsfriKvote: number;
    uttaksplanVeilederInfo: VeilederMessage[];
    meldingerPerPeriode: VeiledermeldingerPerPeriode;
    planErEndret: boolean;
    sak?: Sak;
    grunnlag: Saksgrunnlag | undefined;
    perioderSomSkalSendesInn: Periode[];
    barn: Barn;
    arbeidsforhold: Arbeidsforhold[];
    relevantStartDatoForUttak: Date | undefined;
}

interface UttaksplanStegState {
    bekreftGåTilbakeDialogSynlig: boolean;
    bekreftSlettUttaksplanDialogSynlig: boolean;
    bekreftTilbakestillUttaksplanDialogSynlig: boolean;
    visFeiloppsummering: boolean;
    harKlikketFortsett: boolean;
}

type Props = StateProps & DispatchProps & SøkerinfoProps & HistoryProps & InjectedIntlProps;

const getUttaksstatusFunc = (søknadsinfo: Søknadsinfo) => (
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    uttaksplan: Periode[]
) => {
    return getUttaksstatus(søknadsinfo, tilgjengeligeStønadskontoer, uttaksplan);
};
class UttaksplanSteg extends React.Component<Props, UttaksplanStegState> {
    feilOppsummering: React.Component | null;

    constructor(props: Props) {
        super(props);

        const {
            søknad,
            tilgjengeligeStønadskontoer,
            stegProps,
            søknadsinfo,
            dispatch,
            grunnlag,
            barn,
            arbeidsforhold
        } = this.props;

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
        this.handleAddPeriode = this.handleAddPeriode.bind(this);
        this.handleDeletePeriode = this.handleDeletePeriode.bind(this);
        this.handleUpdatePeriode = this.handleUpdatePeriode.bind(this);

        this.state = {
            bekreftGåTilbakeDialogSynlig: false,
            bekreftSlettUttaksplanDialogSynlig: false,
            bekreftTilbakestillUttaksplanDialogSynlig: false,
            visFeiloppsummering: false,
            harKlikketFortsett: false
        };
        if (stegProps.isAvailable && søknadsinfo !== undefined) {
            const { forslagLaget, startdatoPermisjon } = søknad.ekstrainfo.uttaksplanSkjema;
            const { eksisterendeSak } = søknad.ekstrainfo;

            if (eksisterendeSak) {
                const { saksperioder } = eksisterendeSak;
                let startDato: Date | undefined;
                const inneholderPlanPerioderForSøkerOppgittAvAnnenPart = saksperioder.some((sp: Saksperiode) => {
                    if (sp.angittAvAnnenPart === true) {
                        startDato = sp.tidsperiode.fom;
                        return true;
                    }

                    return false;
                });

                if (søknad.erEndringssøknad && inneholderPlanPerioderForSøkerOppgittAvAnnenPart && startDato) {
                    dispatch(søknadActions.setEndringstidspunkt(startDato));
                }
            }

            if (forslagLaget === false) {
                dispatch(søknadActions.uttaksplanLagForslag());
            }

            if (tilgjengeligeStønadskontoer.length === 0) {
                const params: GetTilgjengeligeStønadskontoerParams = getStønadskontoParams(
                    søknadsinfo,
                    startdatoPermisjon,
                    barn,
                    grunnlag
                );

                dispatch(apiActionCreators.getTilgjengeligeStønadskontoer(params, this.props.history));
            }

            if (arbeidsforhold.length > 0) {
                dispatch(
                    apiActionCreators.fjernInaktiveArbeidsforhold(
                        getAktiveArbeidsforhold(arbeidsforhold, søknadsinfo.søknaden.familiehendelsesdato)
                    )
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
        this.props.dispatch(søknadActions.uttaksplanUpdateSkjemdata({ ønskerTomPlan: true }));
    }

    onBekreftTilbakestillUttaksplan() {
        this.setState({ bekreftTilbakestillUttaksplanDialogSynlig: false });
        this.props.dispatch(søknadActions.resetUttaksplanEndringer());
        this.props.dispatch(søknadActions.uttaksplanLagForslag());
        const { søknadsinfo, søknad } = this.props;
        if (
            søknadsinfo &&
            søknadsinfo.søknaden.erEnkelEndringssøknad &&
            søknad.ekstrainfo.eksisterendeSak &&
            søknad.ekstrainfo.eksisterendeSak.uttaksplan
        ) {
            this.props.dispatch(søknadActions.uttaksplanSetPerioder(søknad.ekstrainfo.eksisterendeSak.uttaksplan));
        }
    }

    handleOnPeriodeErrorClick(periodeId: string) {
        const el = document.getElementById(getPeriodelisteElementId(periodeId));
        if (el) {
            el.focus();
        }
    }

    handleAddPeriode(nyPeriode: Periode, opprinneligPlan: Periode[] | undefined, søknadsinfo: Søknadsinfo) {
        const { søknad, tilgjengeligeStønadskontoer, relevantStartDatoForUttak } = this.props;
        const {
            familiehendelsesdato,
            erFlerbarnssøknad,
            erEndringssøknad,
            erEnkelEndringssøknad
        } = søknadsinfo.søknaden;

        const { updatedPlan, id } = addPeriode(
            getUttaksstatusFunc(søknadsinfo),
            søknad.uttaksplan,
            nyPeriode,
            tilgjengeligeStønadskontoer,
            familiehendelsesdato,
            erFlerbarnssøknad,
            erEndringssøknad && !erEnkelEndringssøknad,
            relevantStartDatoForUttak,
            opprinneligPlan
        );

        const endringstidspunkt = getEndringstidspunkt(opprinneligPlan, updatedPlan, erEndringssøknad);
        this.props.dispatch(søknadActions.uttaksplanSetPerioder(updatedPlan, endringstidspunkt, id));
    }

    handleDeletePeriode(slettetPeriode: Periode, opprinneligPlan: Periode[] | undefined, søknadsinfo: Søknadsinfo) {
        const { søknad, tilgjengeligeStønadskontoer, relevantStartDatoForUttak } = this.props;
        const {
            familiehendelsesdato,
            erFlerbarnssøknad,
            erEndringssøknad,
            erEnkelEndringssøknad
        } = søknadsinfo.søknaden;

        const updatedPlan = deletePeriode(
            getUttaksstatusFunc(søknadsinfo),
            søknad.uttaksplan,
            slettetPeriode,
            tilgjengeligeStønadskontoer,
            familiehendelsesdato,
            erFlerbarnssøknad,
            erEndringssøknad && !erEnkelEndringssøknad,
            relevantStartDatoForUttak,
            opprinneligPlan
        );

        const endringstidspunkt = getEndringstidspunkt(opprinneligPlan, updatedPlan, erEndringssøknad);
        this.props.dispatch(søknadActions.uttaksplanSetPerioder(updatedPlan, endringstidspunkt));
    }

    handleUpdatePeriode(oppdatertPeriode: Periode, opprinneligPlan: Periode[] | undefined, søknadsinfo: Søknadsinfo) {
        const { søknad, tilgjengeligeStønadskontoer, relevantStartDatoForUttak } = this.props;
        const {
            familiehendelsesdato,
            erFlerbarnssøknad,
            erEndringssøknad,
            erEnkelEndringssøknad
        } = søknadsinfo.søknaden;

        const updatedPlan = updatePeriode(
            getUttaksstatusFunc(søknadsinfo),
            søknad.uttaksplan,
            oppdatertPeriode,
            tilgjengeligeStønadskontoer,
            familiehendelsesdato,
            erFlerbarnssøknad,
            erEndringssøknad && !erEnkelEndringssøknad,
            relevantStartDatoForUttak,
            opprinneligPlan
        );

        const endringstidspunkt = getEndringstidspunkt(opprinneligPlan, updatedPlan, erEndringssøknad);
        this.props.dispatch(søknadActions.uttaksplanSetPerioder(updatedPlan, endringstidspunkt));
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
            årsakTilSenEndring,
            vedleggForSenEndring,
            tilleggsopplysninger,
            søknadsinfo,
            uttaksplanVeilederInfo,
            planErEndret,
            meldingerPerPeriode,
            perioderSomSkalSendesInn,
            history,
            intl
        } = this.props;

        if (!søknadsinfo) {
            return <ResetSoknad history={history} />;
        }

        const { eksisterendeSak } = søknad.ekstrainfo;
        const { visFeiloppsummering } = this.state;
        const perioderIUttaksplan = søknad.uttaksplan.length > 0;
        const opprinneligPlan =
            søknad.ekstrainfo.eksisterendeSak && !søknad.ekstrainfo.uttaksplanSkjema.ønskerTomPlan
                ? søknad.ekstrainfo.eksisterendeSak.uttaksplan
                : undefined;

        const defaultStønadskontoType =
            tilgjengeligeStønadskontoer.length === 1 ? tilgjengeligeStønadskontoer[0].konto : undefined;

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
                )}
            >
                {isLoadingTilgjengeligeStønadskontoer === true ? (
                    <ApplicationSpinner />
                ) : (
                    <>
                        {eksisterendeSak && (
                            <Block>
                                <InfoEksisterendeSak
                                    søknadsinfo={søknadsinfo}
                                    tilgjengeligeStønadskontoer={tilgjengeligeStønadskontoer}
                                    eksisterendeSak={eksisterendeSak}
                                    erIUttaksplanenSteg={true}
                                    skalKunneViseInfoOmEkisterendeSak={
                                        !søknadsinfo.søknaden.erEndringssøknad &&
                                        skalKunneViseMorsUttaksplanForFarEllerMedmor(
                                            eksisterendeSak.grunnlag,
                                            søknadsinfo
                                        )
                                    }
                                />
                            </Block>
                        )}
                        <Block>
                            <Uttaksplanlegger
                                planErEndret={planErEndret}
                                uttaksplan={søknad.uttaksplan}
                                søknadsinfo={søknadsinfo}
                                lastAddedPeriodeId={lastAddedPeriodeId}
                                defaultStønadskontoType={defaultStønadskontoType}
                                addPeriode={(periode) => this.handleAddPeriode(periode, opprinneligPlan, søknadsinfo)}
                                deletePeriode={(periode) =>
                                    this.handleDeletePeriode(periode, opprinneligPlan, søknadsinfo)
                                }
                                updatePeriode={(periode) =>
                                    this.handleUpdatePeriode(periode, opprinneligPlan, søknadsinfo)
                                }
                                onRequestClear={() => this.showBekreftSlettUttaksplanDialog()}
                                onRequestRevert={() => this.showBekreftTilbakestillUttaksplanDialog()}
                                meldingerPerPeriode={meldingerPerPeriode}
                                forelder={søknadsinfo.søker.erFarEllerMedmor ? Forelder.farMedmor : Forelder.mor}
                            />
                        </Block>

                        {søknad.uttaksplan &&
                            tilgjengeligeStønadskontoer.length > 0 &&
                            uttaksstatus && (
                                <>
                                    <Block margin="l">
                                        <OversiktBrukteDager
                                            tilgjengeligeStønadskontoer={tilgjengeligeStønadskontoer}
                                            perioder={søknad.uttaksplan}
                                            søknadsinfo={søknadsinfo}
                                            uttaksstatus={uttaksstatus}
                                            navnPåForeldre={søknadsinfo.navn.navnPåForeldre}
                                        />
                                    </Block>
                                </>
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

                        {eksisterendeSak &&
                            eksisterendeSak.uttaksplan && (
                                <FeatureBlock
                                    feature={Feature.visPerioderSomSendesInn}
                                    render={() => (
                                        <Block>
                                            <DevPerioderSomSendesInn
                                                søknadsinfo={søknadsinfo}
                                                perioderSomSkalSendesInn={perioderSomSkalSendesInn}
                                            />
                                        </Block>
                                    )}
                                />
                            )}

                        {årsakTilSenEndring &&
                            årsakTilSenEndring !== SenEndringÅrsak.Ingen && (
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
        api: { isLoadingTilgjengeligeStønadskontoer, sakForEndringssøknad: sak }
    } = state;
    const { søkerinfo, history } = props;

    const søknadsinfo = selectSøknadsinfo(state);
    const tilgjengeligeStønadskontoer = selectTilgjengeligeStønadskontoer(state);
    const perioderSomSkalSendesInn = selectPerioderSomSkalSendesInn(state);
    const årsakTilSenEndring = getSeneEndringerSomKreverBegrunnelse(perioderSomSkalSendesInn);
    const grunnlag = søknad.ekstrainfo.eksisterendeSak ? søknad.ekstrainfo.eksisterendeSak.grunnlag : undefined;

    const stegProps: StegProps = {
        id: StegID.UTTAKSPLAN,
        renderFortsettKnapp: isLoadingTilgjengeligeStønadskontoer !== true && perioderSomSkalSendesInn.length > 0,
        renderFormTag: false,
        history,
        isAvailable: isAvailable(StegID.UTTAKSPLAN, søknad, søkerinfo, søknadsinfo)
    };

    let relevantStartDatoForUttak: Date | undefined;
    if (søknadsinfo) {
        const { søknaden, søker, uttaksdatoer } = søknadsinfo;

        if (
            søknaden.erFødsel &&
            søknaden.erDeltUttak &&
            søker.erFarEllerMedmor &&
            !søknad.ekstrainfo.erEnkelEndringssøknad
        ) {
            const { morSinSisteUttaksdag } = state.søknad.ekstrainfo.uttaksplanSkjema;
            const dagEtterMorsSisteDag = morSinSisteUttaksdag ? Uttaksdagen(morSinSisteUttaksdag).neste() : undefined;
            const { førsteUttaksdagEtterSeksUker } = uttaksdatoer.etterFødsel;

            relevantStartDatoForUttak = moment(dagEtterMorsSisteDag).isSameOrAfter(moment(førsteUttaksdagEtterSeksUker))
                ? dagEtterMorsSisteDag
                : førsteUttaksdagEtterSeksUker;
        }
    }

    const uttaksstatus = søknadsinfo
        ? getUttaksstatus(søknadsinfo, tilgjengeligeStønadskontoer, søknad.uttaksplan)
        : undefined;

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
        isLoadingTilgjengeligeStønadskontoer,
        årsakTilSenEndring,
        vedleggForSenEndring: søknad.vedleggForSenEndring,
        tilleggsopplysninger: søknad.tilleggsopplysninger,
        barn: søknad.barn,
        uttaksplanVeilederInfo: selectUttaksplanVeilederinfo(props.intl)(state).filter(
            (melding) => melding.skjulesIOppsummering !== true
        ),
        meldingerPerPeriode: selectPeriodelisteMeldinger(props.intl)(state),
        aktivitetsfriKvote,
        planErEndret: søknad.erEndringssøknad && perioderSomSkalSendesInn.length > 0,
        perioderSomSkalSendesInn,
        sak,
        arbeidsforhold: søkerinfo.arbeidsforhold,
        grunnlag,
        relevantStartDatoForUttak
    };
};

export default injectIntl(connect<StateProps, {}, {}>(mapStateToProps)(UttaksplanSteg));
