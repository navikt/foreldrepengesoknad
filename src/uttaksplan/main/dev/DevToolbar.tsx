import * as React from 'react';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import Knapperad from 'common/components/knapperad/Knapperad';
import { Knapp } from 'nav-frontend-knapper';
import BEMHelper from 'common/util/bem';
import { DispatchProps } from 'common/redux/types';
import { UttaksplanAppState } from 'uttaksplan/redux/types';
import {
    opprettEllerOppdaterPeriode,
    opprettPerioder,
    dev
} from 'uttaksplan/redux/actions';
import {
    Periodetype,
    Utsettelsesperiode,
    UtsettelseÅrsakType,
    Periode,
    Dekningsgrad,
    Permisjonsregler,
    Uttaksperiode,
    StønadskontoType
} from 'uttaksplan/types';
import { normaliserDato } from 'common/util/datoUtils';
import './devUtil';

import './dev.less';
import { uttaksdagUtil, tidsperiodeUtil } from 'uttaksplan/utils/dataUtils';

export interface StateProps {
    appState: UttaksplanAppState;
    perioder: Periode[];
}

export interface OwnProps {
    termindato: Date;
    dekningsgrad: Dekningsgrad;
    permisjonsregler: Permisjonsregler;
    fellesperiodeukerForelder1: number;
    fellesperiodeukerForelder2: number;
}

export type Props = OwnProps & DispatchProps & StateProps & InjectedIntlProps;

const BEM = BEMHelper('dev');

const mockUtsettelse: Utsettelsesperiode = {
    forelder: 'forelder1',
    type: Periodetype.Utsettelse,
    årsak: UtsettelseÅrsakType.Ferie,
    tidsperiode: {
        startdato: normaliserDato(new Date(2018, 7, 30)),
        sluttdato: normaliserDato(new Date(2018, 7, 31))
    }
};

const mockUtsettelse2: Utsettelsesperiode = {
    ...mockUtsettelse,
    årsak: UtsettelseÅrsakType.Arbeid,
    tidsperiode: {
        startdato: normaliserDato(new Date(2018, 9, 22)),
        sluttdato: normaliserDato(new Date(2018, 9, 22))
    }
};

const mockUttaksperiode: Uttaksperiode = {
    forelder: 'forelder1',
    konto: StønadskontoType.Foreldrepenger,
    tidsperiode: {
        startdato: normaliserDato(new Date(2018, 7, 27)),
        sluttdato: normaliserDato(new Date(2018, 7, 27))
    },
    type: Periodetype.Uttak
};

class DevToolbar extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        this.leggTilUtsettelse = this.leggTilUtsettelse.bind(this);
        this.leggTilUtsettelse2 = this.leggTilUtsettelse2.bind(this);
        this.leggTilPeriode = this.leggTilPeriode.bind(this);
        this.lagOpphold = this.lagOpphold.bind(this);
        this.flyttPeriode = this.flyttPeriode.bind(this);
        this.play = this.play.bind(this);
        this.reset = this.reset.bind(this);
    }

    leggTilUtsettelse() {
        this.props.dispatch(opprettEllerOppdaterPeriode(mockUtsettelse));
    }

    leggTilUtsettelse2() {
        this.props.dispatch(opprettEllerOppdaterPeriode(mockUtsettelse2));
    }

    leggTilPeriode() {
        this.props.dispatch(opprettEllerOppdaterPeriode(mockUttaksperiode));
    }

    reset() {
        const {
            dispatch,
            termindato,
            permisjonsregler,
            dekningsgrad,
            fellesperiodeukerForelder1,
            fellesperiodeukerForelder2
        } = this.props;

        dispatch(
            opprettPerioder(
                termindato,
                dekningsgrad,
                fellesperiodeukerForelder1,
                fellesperiodeukerForelder2,
                permisjonsregler
            )
        );
    }

    lagOpphold() {
        const periode = this.props.appState.uttaksplan.periode.perioder[3];
        const tidsperiode = tidsperiodeUtil(periode.tidsperiode).setStartdato(
            uttaksdagUtil(periode.tidsperiode.startdato).neste()
        );
        this.props.dispatch(
            opprettEllerOppdaterPeriode({
                ...periode,
                tidsperiode
            })
        );
    }
    flyttPeriode() {
        const periode = this.props.appState.uttaksplan.periode.perioder[4];
        const tidsperiode = tidsperiodeUtil(periode.tidsperiode).setStartdato(
            uttaksdagUtil(periode.tidsperiode.startdato).leggTil(-2)
        );
        this.props.dispatch(
            opprettEllerOppdaterPeriode({
                ...periode,
                tidsperiode
            })
        );
    }

    play() {
        this.leggTilPeriode();
        setTimeout(() => {
            this.lagOpphold();
            setTimeout(() => {
                this.flyttPeriode();
            }, 0);
        }, 0);
    }

    render() {
        return (
            <div className={BEM.element('toolbar')}>
                <Knapperad>
                    <Knapp onClick={this.leggTilUtsettelse}>+ U1</Knapp>
                    <Knapp onClick={this.leggTilUtsettelse2}>+ U2</Knapp>
                    <Knapp onClick={this.leggTilPeriode}>+ P</Knapp>
                    <Knapp onClick={this.flyttPeriode}>+ F</Knapp>
                    <Knapp onClick={this.lagOpphold}>+ O</Knapp>
                    <Knapp onClick={this.play}>>></Knapp>
                    <Knapp onClick={this.reset}>R</Knapp>
                    <Knapp onClick={() => this.props.dispatch(dev('refordel'))}>
                        Rebuild
                    </Knapp>
                </Knapperad>
            </div>
        );
    }
}

const mapStateToProps = (state: UttaksplanAppState): StateProps => {
    return {
        appState: state,
        perioder: state.uttaksplan.periode.perioder
    };
};

export default connect(mapStateToProps)(injectIntl(DevToolbar));
