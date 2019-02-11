import * as React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import ReactDOM from 'react-dom';

import { AppState } from '../../../redux/reducers';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { beregnGjenståendeUttaksdager } from 'app/util/uttaksPlanStatus';
import { default as Steg, StegProps } from '../../../components/steg/Steg';
import { DispatchProps } from 'common/redux/types';
import { findMissingAttachmentsForPerioder } from '../../../util/attachments/missingAttachmentUtil';
import { finnÅrsakTilSenEndring } from 'app/util/uttaksplan/uttakUtils';
import { Forelder } from 'common/types';
import { getErSøkerFarEllerMedmor } from '../../../util/domain/personUtil';
import { getPeriodelisteElementId } from '../../../components/periodeliste/Periodeliste';
import { getSøknadsinfo } from '../../../selectors/søknadsinfoSelector';
import { getStønadskontoParams } from '../../../util/uttaksplan/stønadskontoParams';
import { getUttaksstatus, skalBeregneAntallDagerBrukt } from '../../../util/uttaksplan/uttaksstatus';
import { HistoryProps } from '../../../types/common';
import { hullMellomSisteUttaksdatoMorFørsteUttaksdatoFar } from 'app/regler/uttaksplan/hullMellomSisteUttaksdatoMorFørsteUttaksdatoFar';
import { MissingAttachment } from '../../../types/MissingAttachment';
import {
    Periode,
    TilgjengeligStønadskonto,
    SenEndringÅrsak,
    Periodetype,
    isUttaksperiode,
    StønadskontoType,
    isUtsettelsesperiode
} from '../../../types/uttaksplan/periodetyper';
import { Periodene } from '../../../util/uttaksplan/Periodene';
import { SøkerinfoProps } from '../../../types/søkerinfo';
import { Søknadsinfo } from '../../../selectors/types';
import { StegID } from '../../../util/routing/stegConfig';
import { UttaksplanValideringState } from '../../../redux/reducers/uttaksplanValideringReducer';
import apiActionCreators from '../../../redux/actions/api/apiActionCreators';
import ApplicationSpinner from 'common/components/application-spinner/ApplicationSpinner';
import BegrunnelseForSenEndring from './BegrunnelseForSenEndring';
import BekreftGåTilUttaksplanSkjemaDialog from './BekreftGåTilUttaksplanSkjemaDialog';
import BekreftSlettUttaksplanDialog from './BekreftSlettUttaksplanDialog';
import Block from 'common/components/block/Block';
import getInformasjonOmTaptUttakVedUttakEtterSeksUkerFarMedmor from '../../../regler/uttaksplan/getInformasjonOmTaptUttakVedUttakEtterSeksUkerFarMedmor';
import isAvailable from '../util/isAvailable';
import lenker from '../../../util/routing/lenker';
import OvertrukneDager from './OvertrukneDager';
import Søknad, { Tilleggsopplysninger, Opplysning } from '../../../types/søknad/Søknad';
import søknadActions from '../../../redux/actions/søknad/søknadActionCreators';
import Uttaksoppsummering, { Stønadskontouttak } from '../../../components/uttaksoppsummering/Uttaksoppsummering';
import UttaksplanFeiloppsummering from '../../../components/uttaksplan-feiloppsummering/UttaksplanFeiloppsummering';
import Uttaksplanlegger from '../../../components/uttaksplanlegger/Uttaksplanlegger';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import { formaterDato } from 'common/util/datoUtils';
import { Uttaksdagen } from 'app/util/uttaksplan/Uttaksdagen';

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
    årsakTilSenEndring: SenEndringÅrsak;
    vedleggForSenEndring: Attachment[];
    tilleggsopplysninger: Tilleggsopplysninger;
    aktivitetsfriKvote: number;
}

interface UttaksplanStegState {
    bekreftGåTilbakeDialogSynlig: boolean;
    bekreftSlettUttaksplanDialogSynlig: boolean;
    visFeiloppsummering: boolean;
    harKlikketFortsett: boolean;
}

type Props = StateProps & DispatchProps & SøkerinfoProps & HistoryProps;

const getVeilederInfoText = (søknad: Søknad, aktivitetsfriKvote: number) => {
    const { annenForelder, søker } = søknad;

    if (getErSøkerFarEllerMedmor(søknad.søker.rolle)) {
        if (
            annenForelder.kanIkkeOppgis ||
            (!annenForelder.harRettPåForeldrepenger && !annenForelder.erUfør) ||
            søker.erAleneOmOmsorg
        ) {
            return <FormattedMessage id="uttaksplan.informasjon.farMedmor.aleneOmsorg" />;
        } else if (annenForelder.erUfør) {
            return (
                <FormattedMessage
                    id="uttaksplan.informasjon.farMedmor.deltOmsorgMorUfør"
                    values={{ aktivitetsfriKvote }}
                />
            );
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
        this.planErBareUtsettelser = this.planErBareUtsettelser.bind(this);

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

    handleBegrunnelseChange = (årsak: string) => (begrunnelse: string) => {
        this.props.dispatch(
            søknadActions.setTilleggsopplysning(Opplysning.BEGRUNNELSE_FOR_SEN_ENDRING, begrunnelse, årsak)
        );
    };

    handleBegrunnelseVedleggChange = (vedlegg: Attachment[]) => {
        this.props.dispatch(søknadActions.setVedleggForSenEndring(vedlegg));
    };

    getOvertrukneKontoer(uttaksstatusOvertrukneDager: Stønadskontouttak[]) {
        return uttaksstatusOvertrukneDager.filter((konto) => konto.antallDager < 0);
    }

    planErBareUtsettelser(perioder: Periode[]) {
        return !perioder.some((p) => !isUtsettelsesperiode(p)) && perioder.length > 0;
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
            årsakTilSenEndring,
            vedleggForSenEndring,
            tilleggsopplysninger,
            søknadsinfo,
            aktivitetsfriKvote
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
        const planInneholderAnnetEnnAktivitetsfriKvote = søknad.uttaksplan
            .filter((p) => p.type !== Periodetype.Hull)
            .some(
                (p) => (isUttaksperiode(p) && p.konto !== StønadskontoType.AktivitetsfriKvote) || !isUttaksperiode(p)
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
                        navnPåForeldre={søknadsinfo.navn.navnPåForeldre}
                        onErrorClick={(periodeId: string) => this.handleOnPeriodeErrorClick(periodeId)}
                    />
                )}>
                {isLoadingTilgjengeligeStønadskontoer === true ? (
                    <ApplicationSpinner />
                ) : (
                    <React.Fragment>
                        <Veilederinfo>{getVeilederInfoText(søknad, aktivitetsfriKvote)}</Veilederinfo>
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
                        <Block margin="xs" visible={this.planErBareUtsettelser(søknad.uttaksplan)}>
                            <Veilederinfo type="advarsel">
                                <FormattedMessage
                                    id="uttaksplan.veileder.planenInneholderKunUtsettelser"
                                    values={{
                                        sisteDag: formaterDato(
                                            Uttaksdagen(
                                                Periodene(søknad.uttaksplan).getFørsteUttaksdagEtterSistePeriode()!
                                            ).forrige(),
                                            'D. MMMM YYYY'
                                        )
                                    }}
                                />
                            </Veilederinfo>
                        </Block>
                        <Block
                            margin="xs"
                            visible={planInneholderTapteDager && planInneholderAnnetEnnAktivitetsfriKvote}>
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

    const årsakTilSenEndring: SenEndringÅrsak = finnÅrsakTilSenEndring(søknad.uttaksplan);

    const stegProps: StegProps = {
        id: StegID.UTTAKSPLAN,
        renderFortsettKnapp: isLoadingTilgjengeligeStønadskontoer !== true,
        renderFormTag: false,
        history,
        isAvailable: isAvailable(StegID.UTTAKSPLAN, søknad, søkerinfo)
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

    const aktivitetsfriKvoteKonto = tilgjengeligeStønadskontoer.find(
        ({ konto }) => konto === StønadskontoType.AktivitetsfriKvote
    );

    const aktivitetsfriKvote = aktivitetsfriKvoteKonto ? Math.round(aktivitetsfriKvoteKonto.dager / 5) : 0;

    return {
        søknad,
        tilgjengeligeStønadskontoer,
        stegProps,
        uttaksstatus,
        uttaksstatusOvertrukneDager,
        søknadsinfo,
        lastAddedPeriodeId: søknad.ekstrainfo.lastAddedPeriodeId,
        uttaksplanValidering: state.uttaksplanValidering,
        perioder,
        isLoadingTilgjengeligeStønadskontoer,
        årsakTilSenEndring,
        vedleggForSenEndring: søknad.vedleggForSenEndring,
        tilleggsopplysninger: søknad.tilleggsopplysninger,
        missingAttachments: findMissingAttachmentsForPerioder(
            søknad.uttaksplan,
            søknad.søker.rolle,
            søknad.annenForelder
        ),
        aktivitetsfriKvote
    };
};

export default connect<StateProps, {}, {}>(mapStateToProps)(UttaksplanSteg);
