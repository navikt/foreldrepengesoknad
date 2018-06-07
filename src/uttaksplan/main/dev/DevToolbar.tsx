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
    Permisjonsregler
} from 'uttaksplan/types';
import { normaliserDato } from 'common/util/datoUtils';

import './dev.less';
import { uttaksdag } from 'uttaksplan/utils/uttaksdagerUtils';

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
        startdato: normaliserDato(new Date(2018, 6, 18)),
        sluttdato: normaliserDato(new Date(2018, 6, 20))
    }
};

const mockUtsettelse2: Utsettelsesperiode = {
    ...mockUtsettelse,
    årsak: UtsettelseÅrsakType.Arbeid,
    tidsperiode: {
        startdato: normaliserDato(new Date(2018, 6, 25)),
        sluttdato: normaliserDato(new Date(2018, 6, 27))
    }
};

class DevToolbar extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        this.leggTilUtsettelse = this.leggTilUtsettelse.bind(this);
        this.leggTilUtsettelse2 = this.leggTilUtsettelse2.bind(this);
        this.lagOpphold = this.lagOpphold.bind(this);
        this.reset = this.reset.bind(this);
    }

    leggTilUtsettelse() {
        this.props.dispatch(opprettEllerOppdaterPeriode(mockUtsettelse));
    }

    leggTilUtsettelse2() {
        this.props.dispatch(opprettEllerOppdaterPeriode(mockUtsettelse2));
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
        const periode = this.props.appState.uttaksplan.periode.perioder[2];
        this.props.dispatch(
            opprettEllerOppdaterPeriode({
                ...periode,
                tidsperiode: {
                    ...periode.tidsperiode,
                    startdato: uttaksdag(periode.tidsperiode.startdato).neste()
                }
            })
        );
    }

    render() {
        return (
            <div className={BEM.element('toolbar')}>
                <Knapperad>
                    <Knapp onClick={this.leggTilUtsettelse}>
                        + Utsettelse 1
                    </Knapp>
                    <Knapp onClick={this.leggTilUtsettelse2}>
                        + Utsettelse 2
                    </Knapp>
                    <Knapp onClick={() => this.props.dispatch(dev('refordel'))}>
                        Ref
                    </Knapp>
                    <Knapp onClick={this.lagOpphold}>+ Opphold</Knapp>
                    <Knapp onClick={this.reset}>Reset</Knapp>
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
