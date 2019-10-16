import * as React from 'react';
import ReactDOM from 'react-dom';
import {
    Periode,
    Periodetype,
    Uttaksperiode,
    Utsettelsesperiode,
    StønadskontoType
} from '../../types/uttaksplan/periodetyper';
import { Systemtittel } from 'nav-frontend-typografi';
import Periodeliste from './components/periodeliste/Periodeliste';
import BEMHelper from 'common/util/bem';
import Block from 'common/components/block/Block';
import FamiliehendelsedatoInfo from './FamiliehendelsedatoInfo';
import { Forelder, Tidsperiode } from 'common/types';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import Knapperad from 'common/components/knapperad/Knapperad';
import { Knapp } from 'nav-frontend-knapper';
import NyPeriodeForm from './components/nyPeriodeForm/NyPeriodeForm';
import FocusContainer from '../elementer/focusContainer/FocusContainer';
import TomUttaksplanInfo from './components/tomUttaksplanInfo/TomUttaksplanInfo';
import { Periodene } from '../../util/uttaksplan/Periodene';
import { Søknadsinfo } from '../../selectors/types';
import getInformasjonOmTaptUttakVedUttakEtterSeksUkerFarMedmor from '../../regler/uttaksplan/getInformasjonOmTaptUttakVedUttakEtterSeksUkerFarMedmor';
import { formaterDatoUtenDag } from 'common/util/datoUtils';
import { Uttaksdagen } from '../../util/uttaksplan/Uttaksdagen';
import TapteUttaksdagerFarMedmor from './components/TapteUttaksdagerFarMedmor';
import { PeriodelisteInformasjon } from './components/periodeliste/items/PeriodelisteInfo';
import getMessage from 'common/util/i18nUtils';
import VeilederInfo from '../veilederInfo/VeilederInfo';

import './uttaksplanlegger.less';
import { VeiledermeldingerPerPeriode } from '../veilederInfo/types';
import UttaksplanAdvarselIkon from '../ikoner/uttaksplanIkon/ikoner/AdvarselIkon';
import HjerteIkon from '../ikoner/uttaksplanIkon/ikoner/HjerteIkon';
import LinkButton from '../elementer/linkButton/LinkButton';

interface OwnProps {
    uttaksplan: Periode[];
    søknadsinfo: Søknadsinfo;
    lastAddedPeriodeId: string | undefined;
    forelder: Forelder;
    planErEndret: boolean;
    defaultStønadskontoType?: StønadskontoType;
    meldingerPerPeriode: VeiledermeldingerPerPeriode;
    addPeriode: (periode: Periode) => void;
    updatePeriode: (periode: Periode) => void;
    deletePeriode: (periode: Periode) => void;
    onRequestClear: () => void;
    onRequestRevert: () => void;
}

type Props = OwnProps & InjectedIntlProps;

interface State {
    periodetype?: Periodetype;
    tidsperiode?: Partial<Tidsperiode>;
    formIsOpen: boolean;
}

const initialState: State = {
    formIsOpen: false,
    periodetype: undefined,
    tidsperiode: undefined
};

const BEM = BEMHelper('uttaksplanlegger');

export const UTTAKSPLANLEGGER_DOM_ID = 'uttaksplanlegger';

class Uttaksplanlegger extends React.Component<Props, State> {
    nyPeriodeForm: FocusContainer | null;
    leggTilOppholdKnapp: Knapp | null;
    leggTilUttakKnapp: Knapp | null;
    periodeliste: Periodeliste | null;

    constructor(props: Props) {
        super(props);

        this.state = { ...initialState };

        this.openForm = this.openForm.bind(this);
        this.openNyUtsettelsesperiodeForm = this.openNyUtsettelsesperiodeForm.bind(this);
        this.openNyUttaksperiodeForm = this.openNyUttaksperiodeForm.bind(this);
        this.closeForm = this.closeForm.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.handleOnCancel = this.handleOnCancel.bind(this);
        this.lukkPeriodeliste = this.lukkPeriodeliste.bind(this);
        this.replaceHullWithOpphold = this.replaceHullWithOpphold.bind(this);
        this.replaceHullWithPeriode = this.replaceHullWithPeriode.bind(this);
    }

    openForm(periodetype: Periodetype, tidsperiode?: Partial<Tidsperiode>) {
        this.setState({
            formIsOpen: true,
            periodetype,
            tidsperiode
        });
        setTimeout(() => {
            if (this.nyPeriodeForm) {
                this.nyPeriodeForm.focus();
            }
        });
    }

    replaceHullWithOpphold(tidsperiode?: Tidsperiode) {
        const periode: Partial<Utsettelsesperiode> = {
            type: Periodetype.Utsettelse,
            tidsperiode,
            forelder: this.props.forelder
        };
        this.props.addPeriode(periode as Periode);
    }

    replaceHullWithPeriode(tidsperiode?: Tidsperiode) {
        const periode: Partial<Uttaksperiode> = {
            type: Periodetype.Uttak,
            tidsperiode,
            forelder: this.props.forelder,
            konto: this.props.defaultStønadskontoType
        };
        this.props.addPeriode(periode as Periode);
    }

    openNyUtsettelsesperiodeForm(tidsperiode?: Tidsperiode) {
        this.lukkPeriodeliste();
        this.openForm(Periodetype.Utsettelse, tidsperiode);
    }

    openNyUttaksperiodeForm() {
        this.lukkPeriodeliste();
        const tidsperiode: Partial<Tidsperiode> | undefined =
            this.props.uttaksplan.length > 0
                ? {
                      fom: Periodene(this.props.uttaksplan).getFørsteUttaksdagEtterSistePeriode()
                  }
                : undefined;

        this.openForm(Periodetype.Uttak, tidsperiode);
    }

    lukkPeriodeliste() {
        if (this.periodeliste) {
            this.periodeliste.collapseAll();
        }
    }

    closeForm() {
        this.setState(initialState);
    }

    handleOnSubmit(periode: Periode) {
        const { addPeriode } = this.props;
        addPeriode(periode);
        this.closeForm();
    }

    handleOnCancel() {
        const { periodetype } = this.state;
        this.closeForm();
        setTimeout(() => {
            if (periodetype === Periodetype.Utsettelse && this.leggTilOppholdKnapp) {
                (ReactDOM.findDOMNode(this.leggTilOppholdKnapp) as HTMLElement).focus();
            } else if (periodetype === Periodetype.Uttak && this.leggTilUttakKnapp) {
                (ReactDOM.findDOMNode(this.leggTilUttakKnapp) as HTMLElement).focus();
            }
        });
    }

    render() {
        const {
            søknadsinfo,
            onRequestClear,
            onRequestRevert,
            lastAddedPeriodeId,
            forelder,
            uttaksplan,
            planErEndret,
            meldingerPerPeriode,
            intl
        } = this.props;
        const { formIsOpen, periodetype } = this.state;
        const antallFeriedager = Periodene(uttaksplan).getAntallFeriedager(forelder);

        const infoOmTaptUttakVedUttakEtterSeksUkerFarMedmor = getInformasjonOmTaptUttakVedUttakEtterSeksUkerFarMedmor(
            uttaksplan,
            søknadsinfo.søknaden.familiehendelsesdato,
            søknadsinfo.søker.erFarEllerMedmor,
            søknadsinfo.mor.harRett === false,
            søknadsinfo.mor.erUfør,
            !!(søknadsinfo.søker.erFarEllerMedmor && søknadsinfo.annenForelder.kanIkkeOppgis),
            !!(søknadsinfo.søker.erFarEllerMedmor && søknadsinfo.søker.erAleneOmOmsorg)
        );

        const infoItems: PeriodelisteInformasjon[] = [];

        if (infoOmTaptUttakVedUttakEtterSeksUkerFarMedmor) {
            infoItems.push({
                id: 'infoOmTaptUttakVedUttakEtterSeksUkerFarMedmor',
                ikon: <UttaksplanAdvarselIkon />,
                tittel: getMessage(intl, 'periodeliste.hull.tittel'),
                beskrivelse: getMessage(intl, 'periodeliste.hull.beskrivelse', {
                    dager: infoOmTaptUttakVedUttakEtterSeksUkerFarMedmor.antallUttaksdagerTapt
                }),
                renderContent: () => (
                    <TapteUttaksdagerFarMedmor
                        info={infoOmTaptUttakVedUttakEtterSeksUkerFarMedmor}
                        onLeggTilOpphold={this.replaceHullWithOpphold}
                    />
                ),
                annenForelderSamtidigUttakPeriode: undefined
            });
        }

        const informerOmNårPeriodenBegynnerÅLøpe =
            uttaksplan.length === 0 &&
            søknadsinfo.søker.erFarEllerMedmor &&
            !søknadsinfo.søker.erAleneOmOmsorg &&
            !søknadsinfo.mor.harRett &&
            !søknadsinfo.mor.erUfør;

        return (
            <section>
                <Block>
                    <div className={BEM.block} id={UTTAKSPLANLEGGER_DOM_ID} tabIndex={-1}>
                        <header className={BEM.element('header')}>
                            <Systemtittel tag="h2" className={BEM.element('header__title')}>
                                <FormattedMessage id="uttaksplan.tittel" />
                            </Systemtittel>
                            {onRequestClear &&
                                uttaksplan.length > 0 && (
                                    <div className={BEM.element('header__reset')}>
                                        <LinkButton
                                            className={BEM.element('resetLink')}
                                            onClick={() => onRequestClear()}>
                                            <FormattedMessage id="uttaksplan.slettPlan" />
                                        </LinkButton>
                                    </div>
                                )}
                            {onRequestRevert &&
                                (planErEndret || søknadsinfo.søknaden.ønskerTomPlan) && (
                                    <div className={BEM.element('header__reset')}>
                                        <LinkButton
                                            className={BEM.element('resetLink')}
                                            onClick={() => onRequestRevert()}>
                                            <FormattedMessage id="uttaksplan.tilbakestillPlan" />
                                        </LinkButton>
                                    </div>
                                )}

                            <span className={BEM.element('header__details')}>
                                <span
                                    className={BEM.element('header__details__icon')}
                                    role="presentation"
                                    aria-hidden={true}>
                                    <HjerteIkon fylt={true} title="Hjerte" />
                                </span>
                                <FamiliehendelsedatoInfo
                                    familiehendelsesdato={søknadsinfo.søknaden.familiehendelsesdato}
                                    søkersituasjon={søknadsinfo.søknaden.situasjon}
                                    erBarnetFødt={søknadsinfo.søknaden.erBarnFødt}
                                />
                            </span>
                        </header>
                        <Block visible={uttaksplan.length > 0}>
                            <Periodeliste
                                erDeltUttak={søknadsinfo.søknaden.erDeltUttak}
                                ref={(c) => (this.periodeliste = c)}
                                perioder={uttaksplan}
                                informasjon={infoItems}
                                meldingerPerPeriode={meldingerPerPeriode}
                                navn={søknadsinfo.navn}
                                lastAddedPeriodeId={lastAddedPeriodeId}
                                onReplaceHullWithOpphold={this.replaceHullWithOpphold}
                                onReplaceHullWithPeriode={this.replaceHullWithPeriode}
                                deletePeriode={this.props.deletePeriode}
                                updatePeriode={this.props.updatePeriode}
                                antallFeriedager={antallFeriedager}
                            />
                        </Block>
                        <Block visible={uttaksplan.length === 0}>
                            <Block margin="l">
                                <TomUttaksplanInfo />
                            </Block>
                            <Block visible={informerOmNårPeriodenBegynnerÅLøpe} margin="none">
                                <VeilederInfo
                                    messages={[
                                        {
                                            type: 'normal',
                                            contentIntlKey: 'uttaksplan.infoVedTapteUttaksdager.tomUttaksplan',
                                            values: {
                                                dato: formaterDatoUtenDag(
                                                    Uttaksdagen(
                                                        søknadsinfo.uttaksdatoer.etterFødsel
                                                            .sisteUttaksdagInnenforSeksUker
                                                    ).neste()
                                                )
                                            }
                                        }
                                    ]}
                                />
                            </Block>
                        </Block>
                        <Block visible={formIsOpen}>
                            {periodetype !== undefined && (
                                <FocusContainer ref={(c) => (this.nyPeriodeForm = c)}>
                                    <NyPeriodeForm
                                        søknadsinfo={søknadsinfo}
                                        antallFeriedager={antallFeriedager}
                                        erMorUfør={søknadsinfo.mor.erUfør}
                                        periodetype={periodetype}
                                        forelder={forelder}
                                        onSubmit={this.handleOnSubmit}
                                        onCancel={this.handleOnCancel}
                                        tidsperiode={this.state.tidsperiode}
                                        navnPåForeldre={søknadsinfo.navn.navnPåForeldre}
                                    />
                                </FocusContainer>
                            )}
                        </Block>
                    </div>
                </Block>
                <Block margin="none" visible={!formIsOpen}>
                    <Knapperad style="mobile-50-50">
                        <Knapp
                            onClick={() => this.openNyUtsettelsesperiodeForm()}
                            htmlType="button"
                            ref={(c) => (this.leggTilOppholdKnapp = c)}
                            aria-expanded={formIsOpen}
                            data-name="openNyUtsettelseForm">
                            <FormattedMessage id="uttaksplan.leggTil.opphold" />
                        </Knapp>
                        <Knapp
                            onClick={() => this.openNyUttaksperiodeForm()}
                            htmlType="button"
                            ref={(c) => (this.leggTilUttakKnapp = c)}
                            aria-expanded={formIsOpen}
                            data-name="openNyPeriodeForm">
                            <FormattedMessage id="uttaksplan.leggTil.uttak" />
                        </Knapp>
                    </Knapperad>
                </Block>
            </section>
        );
    }
}
export default injectIntl(Uttaksplanlegger);
