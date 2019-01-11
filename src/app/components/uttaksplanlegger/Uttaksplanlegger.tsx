import * as React from 'react';
import ReactDOM from 'react-dom';
import { Periode, Periodetype, Uttaksperiode, Utsettelsesperiode } from '../../types/uttaksplan/periodetyper';
import { Systemtittel } from 'nav-frontend-typografi';
import Periodeliste from '../periodeliste/Periodeliste';
import BEMHelper from 'common/util/bem';
import Block from 'common/components/block/Block';
import LinkButton from '../link-button/LinkButton';
import FamiliehendelsedatoInfo from './FamiliehendelsedatoInfo';
import Søknad from '../../types/søknad/Søknad';
import { Forelder } from 'common/types';
import { UttaksplanValideringState } from '../../redux/reducers/uttaksplanValideringReducer';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import Knapperad from 'common/components/knapperad/Knapperad';
import { Knapp } from 'nav-frontend-knapper';
import NyPeriodeForm from '../ny-periode-form/NyPeriodeForm';
import FocusContainer from '../focus-container/FocusContainer';
import TomUttaksplanInfo from '../tom-uttaksplan-info/TomUttaksplanInfo';
import HjerteIkon from '../uttaksplan-ikon/ikoner/HjerteIkon';
import { Tidsperiode } from 'nav-datovelger/src/datovelger/types';
import { Periodene } from '../../util/uttaksplan/Periodene';
import { Søknadsinfo } from '../../selectors/types';
import getInformasjonOmTaptUttakVedUttakEtterSeksUkerFarMedmor from '../../regler/uttaksplan/getInformasjonOmTaptUttakVedUttakEtterSeksUkerFarMedmor';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import { formaterDatoUtenDag } from 'common/util/datoUtils';
import { Uttaksdagen } from '../../util/uttaksplan/Uttaksdagen';
import TapteUttaksdagerFarMedmor from './meldinger/TapteUttaksdagerFarMedmor';

import './uttaksplanlegger.less';
import AdvarselIkon from '../uttaksplan-ikon/ikoner/AdvarselIkon';
import { PeriodelisteInformasjon } from '../periodeliste/items/PeriodelisteInfo';
import getMessage from 'common/util/i18nUtils';

interface OwnProps {
    søknad: Søknad;
    søknadsinfo: Søknadsinfo;
    uttaksplanValidering: UttaksplanValideringState;
    lastAddedPeriodeId: string | undefined;
    forelder: Forelder;
    onAdd: (periode: Periode) => void;
    onUpdate?: (periode: Periode) => void;
    onDelete?: (periode: Periode) => void;
    onRequestReset?: () => void;
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

export const uttaksplanleggerDomId = 'uttaksplanlegger';

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
        this.settInnNyttOpphold = this.settInnNyttOpphold.bind(this);
        this.settInnNyPeriode = this.settInnNyPeriode.bind(this);
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

    settInnNyttOpphold(tidsperiode?: Tidsperiode) {
        const periode: Partial<Utsettelsesperiode> = {
            type: Periodetype.Utsettelse,
            tidsperiode
        };
        this.props.onAdd(periode as Periode);
    }
    settInnNyPeriode(tidsperiode?: Tidsperiode) {
        const periode: Partial<Uttaksperiode> = {
            type: Periodetype.Uttak,
            tidsperiode,
            forelder: this.props.forelder
        };
        this.props.onAdd(periode as Periode);
    }

    openNyUtsettelsesperiodeForm(tidsperiode?: Tidsperiode) {
        this.lukkPeriodeliste();
        this.openForm(Periodetype.Utsettelse, tidsperiode);
    }

    openNyUttaksperiodeForm() {
        this.lukkPeriodeliste();
        const tidsperiode: Partial<Tidsperiode> | undefined =
            this.props.søknad.uttaksplan.length > 0
                ? {
                      fom: Periodene(this.props.søknad.uttaksplan).getFørsteUttaksdagEtterSistePeriode()
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
        const { onAdd } = this.props;
        onAdd(periode);
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
            søknad,
            uttaksplanValidering,
            søknadsinfo,
            onRequestReset,
            lastAddedPeriodeId,
            forelder,
            intl
        } = this.props;
        const { barn, uttaksplan } = søknad;
        const { formIsOpen, periodetype } = this.state;
        const antallFeriedager = Periodene(uttaksplan).getAntallFeriedager(forelder);

        const infoOmTaptUttakVedUttakEtterSeksUkerFarMedmor = getInformasjonOmTaptUttakVedUttakEtterSeksUkerFarMedmor(
            uttaksplan,
            søknadsinfo.søknaden.familiehendelsesdato,
            søknadsinfo.søker.erFarEllerMedmor,
            søknadsinfo.mor.harRett === false,
            søknadsinfo.mor.erUfør
        );

        const infoItems: PeriodelisteInformasjon[] = [];

        if (infoOmTaptUttakVedUttakEtterSeksUkerFarMedmor) {
            infoItems.push({
                id: 'infoOmTaptUttakVedUttakEtterSeksUkerFarMedmor',
                ikon: <AdvarselIkon />,
                tittel: getMessage(intl, 'periodeliste.hull.tittel'),
                beskrivelse: getMessage(intl, 'periodeliste.hull.beskrivelse', {
                    dager: infoOmTaptUttakVedUttakEtterSeksUkerFarMedmor.antallUttaksdagerTapt
                }),
                renderContent: () => (
                    <TapteUttaksdagerFarMedmor
                        info={infoOmTaptUttakVedUttakEtterSeksUkerFarMedmor}
                        onLeggTilOpphold={this.settInnNyttOpphold}
                    />
                )
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
                    <div className={BEM.className} id={uttaksplanleggerDomId} tabIndex={-1}>
                        <header className={BEM.element('header')}>
                            <Systemtittel tag="h1" className={BEM.element('header__title')}>
                                <FormattedMessage id="uttaksplan.tittel" />
                            </Systemtittel>
                            {onRequestReset &&
                                uttaksplan.length > 0 && (
                                    <div className={BEM.element('header__reset')}>
                                        <LinkButton
                                            className={BEM.element('resetLink')}
                                            onClick={() => onRequestReset()}>
                                            <FormattedMessage id="uttaksplan.slettPlan" />
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
                                <FamiliehendelsedatoInfo barn={barn} søkersituasjon={søknadsinfo.søknaden.situasjon} />
                            </span>
                        </header>
                        <Block visible={uttaksplan.length > 0}>
                            <Periodeliste
                                ref={(c) => (this.periodeliste = c)}
                                perioder={uttaksplan}
                                informasjon={infoItems}
                                navnPåForeldre={søknadsinfo.navn.navnPåForeldre}
                                uttaksplanValidering={uttaksplanValidering}
                                lastAddedPeriodeId={lastAddedPeriodeId}
                                onLeggTilOpphold={this.settInnNyttOpphold}
                                onLeggTilPeriode={this.settInnNyPeriode}
                                onFjernPeriode={this.props.onDelete}
                                antallFeriedager={antallFeriedager}
                            />
                        </Block>
                        <Block visible={uttaksplan.length === 0}>
                            <Block margin="l">
                                <TomUttaksplanInfo />
                            </Block>
                            <Block visible={informerOmNårPeriodenBegynnerÅLøpe} margin="none">
                                <Veilederinfo>
                                    <FormattedMessage
                                        id="uttaksplan.infoVedTapteUttaksdager.tomUttaksplan"
                                        values={{
                                            dato: formaterDatoUtenDag(
                                                Uttaksdagen(
                                                    søknadsinfo.uttaksdatoer.etterFødsel.sisteUttaksdagInnenforSeksUker
                                                ).neste()
                                            )
                                        }}
                                    />
                                </Veilederinfo>
                            </Block>
                        </Block>
                        <Block visible={formIsOpen}>
                            {periodetype !== undefined && (
                                <FocusContainer ref={(c) => (this.nyPeriodeForm = c)}>
                                    <NyPeriodeForm
                                        antallFeriedager={antallFeriedager}
                                        erMorUfør={søknadsinfo.mor.erUfør}
                                        periodetype={periodetype}
                                        forelder={forelder}
                                        onSubmit={this.handleOnSubmit}
                                        onCancel={this.handleOnCancel}
                                        tidsperiode={this.state.tidsperiode}
                                        søknad={this.props.søknad}
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
                            aria-expanded={formIsOpen}>
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
