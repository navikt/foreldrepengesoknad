import * as React from 'react';
import ReactDOM from 'react-dom';
import { Periode, Periodetype } from '../../types/uttaksplan/periodetyper';
import { Systemtittel } from 'nav-frontend-typografi';
import Periodeliste from '../periodeliste/Periodeliste';
import BEMHelper from 'common/util/bem';
import Block from 'common/components/block/Block';
import LinkButton from '../link-button/LinkButton';
import FamiliehendelsedatoInfo from './FamiliehendelsedatoInfo';
import { Søkersituasjon } from '../../types/søknad/Søknad';
import { Barn } from '../../types/søknad/Barn';
import { NavnPåForeldre } from 'common/types';
import { UttaksplanValideringState } from '../../redux/reducers/uttaksplanValideringReducer';
import { FormattedMessage } from 'react-intl';
import Knapperad from 'common/components/knapperad/Knapperad';
import { Knapp } from 'nav-frontend-knapper';
import NyPeriodeForm from '../ny-periode-form/NyPeriodeForm';
import FocusContainer from '../focus-container/FocusContainer';

import './uttaksplanlegger.less';
import TomUttaksplanInfo from '../tom-uttaksplan-info/TomUttaksplanInfo';
import HjerteIkon from '../uttaksplan-ikon/ikoner/HjerteIkon';

export interface Props {
    søkersituasjon: Søkersituasjon;
    barn: Barn;
    uttaksplan: Periode[];
    uttaksplanValidering: UttaksplanValideringState;
    navnPåForeldre: NavnPåForeldre;
    lastAddedPeriodeId: string | undefined;
    erMorUfør: boolean | undefined;
    onAdd: (periode: Periode) => void;
    onUpdate?: (periode: Periode) => void;
    onDelete?: (periode: Periode) => void;
    onRequestReset?: () => void;
}

interface State {
    periodetype?: Periodetype;
    formIsOpen: boolean;
}

const BEM = BEMHelper('uttaksplanlegger');

export const uttaksplanleggerDomId = 'uttaksplanlegger';

class Uttaksplanlegger extends React.Component<Props, State> {
    nyPeriodeForm: FocusContainer | null;
    leggTilOppholdKnapp: Knapp | null;
    leggTilUttakKnapp: Knapp | null;
    periodeliste: Periodeliste | null;

    constructor(props: Props) {
        super(props);

        this.state = {
            formIsOpen: false,
            periodetype: undefined
        };

        this.openForm = this.openForm.bind(this);
        this.openNyUtsettelsesperiodeForm = this.openNyUtsettelsesperiodeForm.bind(this);
        this.openNyUttaksperiodeForm = this.openNyUttaksperiodeForm.bind(this);
        this.closeForm = this.closeForm.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.handleOnCancel = this.handleOnCancel.bind(this);
        this.lukkPeriodeliste = this.lukkPeriodeliste.bind(this);
    }

    openForm(periodetype: Periodetype) {
        this.setState({
            formIsOpen: true,
            periodetype
        });
        setTimeout(() => {
            if (this.nyPeriodeForm) {
                this.nyPeriodeForm.focus();
            }
        });
    }

    openNyUtsettelsesperiodeForm() {
        this.lukkPeriodeliste();
        this.openForm(Periodetype.Utsettelse);
    }

    openNyUttaksperiodeForm() {
        this.lukkPeriodeliste();
        this.openForm(Periodetype.Uttak);
    }

    lukkPeriodeliste() {
        if (this.periodeliste) {
            this.periodeliste.collapseAll();
        }
    }

    closeForm() {
        this.setState({
            formIsOpen: false,
            periodetype: undefined
        });
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
            søkersituasjon,
            barn,
            uttaksplan,
            uttaksplanValidering,
            navnPåForeldre,
            onRequestReset,
            lastAddedPeriodeId,
            erMorUfør
        } = this.props;
        const { formIsOpen, periodetype } = this.state;
        return (
            <section>
                <Block>
                    <div className={BEM.className} id={uttaksplanleggerDomId} tabIndex={-1}>
                        <header className={BEM.element('header')}>
                            <Systemtittel tag="h1" className={BEM.element('header__title')}>
                                Din plan
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
                                <FamiliehendelsedatoInfo barn={barn} søkersituasjon={søkersituasjon} />
                            </span>
                        </header>
                        <Block visible={uttaksplan.length > 0}>
                            <Periodeliste
                                ref={(c) => (this.periodeliste = c)}
                                perioder={uttaksplan}
                                navnPåForeldre={navnPåForeldre}
                                uttaksplanValidering={uttaksplanValidering}
                                lastAddedPeriodeId={lastAddedPeriodeId}
                            />
                        </Block>
                        <Block visible={uttaksplan.length === 0} margin="xl">
                            <TomUttaksplanInfo />
                        </Block>
                        <Block visible={formIsOpen}>
                            {periodetype !== undefined && (
                                <FocusContainer ref={(c) => (this.nyPeriodeForm = c)}>
                                    <NyPeriodeForm
                                        erMorUfør={erMorUfør}
                                        periodetype={periodetype}
                                        onSubmit={this.handleOnSubmit}
                                        onCancel={this.handleOnCancel}
                                    />
                                </FocusContainer>
                            )}
                        </Block>
                    </div>
                </Block>
                <Block margin="none" visible={!formIsOpen}>
                    <Knapperad>
                        <Knapp
                            onClick={this.openNyUtsettelsesperiodeForm}
                            htmlType="button"
                            ref={(c) => (this.leggTilOppholdKnapp = c)}
                            aria-expanded={formIsOpen}>
                            <FormattedMessage id="uttaksplan.leggTil.opphold" />
                        </Knapp>
                        <Knapp
                            onClick={this.openNyUttaksperiodeForm}
                            htmlType="button"
                            ref={(c) => (this.leggTilUttakKnapp = c)}
                            aria-expanded={formIsOpen}>
                            <FormattedMessage id="uttaksplan.leggTil.uttak" />
                        </Knapp>
                    </Knapperad>
                </Block>
            </section>
        );
    }
}
export default Uttaksplanlegger;
