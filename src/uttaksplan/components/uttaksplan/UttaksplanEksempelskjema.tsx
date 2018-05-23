import * as React from 'react';
import { connect } from 'react-redux';
import {
    UttaksplanAppState,
    UtsettelseState,
    UttaksplanFormState
} from 'uttaksplan/redux/types';
import { tidslinjeFraPerioder } from 'uttaksplan/selectors/tidslinjeSelector';
import { Tidslinjeinnslag } from 'uttaksplan/components/tidslinje/types';
import { utsettelseVisDialog } from 'uttaksplan/redux/actions';
import {
    Utsettelsesperiode,
    Tidsperiode,
    Spraak,
    Dekningsgrad,
    Periode
} from 'uttaksplan/types';
import { getGyldigTidsromForUtsettelse } from 'uttaksplan/utils/permisjonUtils';
import {
    getSisteRegistrertePermisjonsdag,
    getStonadsperioderOgUtsettelser
} from 'uttaksplan/selectors/periodeSelector';
import { DispatchProps } from 'app/redux/types';
import Permisjonsplan from 'uttaksplan/components/permisjonsplan/Permisjonsplan';
import UtsettelseDialog from 'uttaksplan/components/utsettelseDialog/UtsettelseDialog';
import { getPermisjonsregler } from 'uttaksplan/data/permisjonsregler';

export interface StateProps {
    form: UttaksplanFormState;
    innslag: Tidslinjeinnslag[];
    utsettelse: UtsettelseState;
    visPermisjonsplan: boolean;
    sisteRegistrertePermisjonsdag?: Date;
    perioder: Periode[];
}

interface OwnProps {
    sprak?: Spraak;
    navnForelder1: string;
    navnForelder2: string;
    termindato: Date;
    dekningsgrad: Dekningsgrad;
    onVelgPerioder: (perioder: Periode[]) => void;
}

import '../../styles/uttaksplan.less';
import { Knapp } from 'nav-frontend-knapper';

export type Props = OwnProps & StateProps & DispatchProps;

class UttaksplanEksempelskjema extends React.Component<Props> {
    render() {
        const {
            utsettelse,
            innslag,
            dispatch,
            sisteRegistrertePermisjonsdag,
            termindato,
            dekningsgrad,
            perioder,
            onVelgPerioder
        } = this.props;

        const navnForelder1 = this.props.navnForelder1;
        const navnForelder2 = this.props.navnForelder2;
        const permisjonsregler = getPermisjonsregler(this.props.termindato);

        const tidsromForUtsettelse: Tidsperiode | undefined =
            termindato && dekningsgrad && sisteRegistrertePermisjonsdag
                ? getGyldigTidsromForUtsettelse(
                      termindato,
                      dekningsgrad,
                      permisjonsregler,
                      sisteRegistrertePermisjonsdag
                  )
                : undefined;

        return (
            <div>
                <Permisjonsplan
                    navnForelder1={navnForelder1}
                    navnForelder2={navnForelder2}
                    permisjonsregler={permisjonsregler}
                    fellesperiodeukerForelder1={13}
                    fellesperiodeukerForelder2={13}
                    innslag={innslag}
                    onRedigerUtsettelse={(u: Utsettelsesperiode) =>
                        dispatch(utsettelseVisDialog(u))
                    }
                    onLeggTilUtsettelse={() => dispatch(utsettelseVisDialog())}
                />

                {tidsromForUtsettelse &&
                    termindato && (
                        <div>
                            <UtsettelseDialog
                                isOpen={utsettelse.dialogErApen}
                                navnForelder1={navnForelder1}
                                navnForelder2={navnForelder2}
                                utsettelser={utsettelse.utsettelser}
                                utsettelse={utsettelse.valgtUtsettelse}
                                tidsrom={tidsromForUtsettelse}
                                permisjonsregler={permisjonsregler}
                                termindato={termindato}
                            />
                        </div>
                    )}
                <Knapp onClick={() => onVelgPerioder(perioder)}>
                    Velg denne uttaksplanen
                </Knapp>
            </div>
        );
    }
}

const mapStateToProps = (state: UttaksplanAppState): StateProps => {
    let innslag: Tidslinjeinnslag[] = [];
    innslag = tidslinjeFraPerioder(state);

    return {
        perioder: getStonadsperioderOgUtsettelser(state),
        innslag,
        form: state.uttaksplan.uttaksplanForm,
        utsettelse: state.uttaksplan.utsettelse,
        sisteRegistrertePermisjonsdag: getSisteRegistrertePermisjonsdag(state),
        visPermisjonsplan:
            innslag &&
            innslag.length > 0 &&
            state.uttaksplan.uttaksplanForm.dekningsgrad !== undefined &&
            state.uttaksplan.uttaksplanForm.termindato !== undefined &&
            state.uttaksplan.view.visTidslinje === true
    };
};

export default connect(mapStateToProps)(UttaksplanEksempelskjema);
