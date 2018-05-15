import * as React from 'react';
import { connect } from 'react-redux';
import {
    UtsettelseState,
    UttaksplanFormState,
    UttaksplanAppState
} from 'uttaksplan/redux/types';
import { tidslinjeFraPerioder } from 'uttaksplan/selectors/tidslinjeSelector';
import {
    Tidslinjeinnslag,
    TidslinjeinnslagType,
    InnslagPeriodetype
} from 'uttaksplan/components/tidslinje/types';
import { utsettelseVisDialog } from 'uttaksplan/redux/actions';
import {
    Utsettelsesperiode,
    Tidsperiode,
    Periodetype,
    StonadskontoType,
    Spraak
} from 'uttaksplan/types';
import { getGyldigTidsromForUtsettelse } from 'uttaksplan/utils/permisjonUtils';
import { getSisteRegistrertePermisjonsdag } from 'uttaksplan/selectors/periodeSelector';
import UtsettelseDialog from 'uttaksplan/components/utsettelseDialog/UtsettelseDialog';
import { DispatchProps } from 'app/redux/types';
import TidslinjeAktivitetskravInfo from 'uttaksplan/components/content/TidslinjeAktivitetskravInfo';
import Permisjonsplan from 'uttaksplan/components/permisjonsplan/Permisjonsplan';

export interface StateProps {
    form: UttaksplanFormState;
    innslag: Tidslinjeinnslag[];
    utsettelse: UtsettelseState;
    sisteRegistrertePermisjonsdag?: Date;
}

interface OwnProps {
    sprak?: Spraak;
}

export type Props = OwnProps & StateProps & DispatchProps;

export class Main extends React.Component<Props> {
    render() {
        const {
            form,
            utsettelse,
            innslag,
            dispatch,
            sisteRegistrertePermisjonsdag
        } = this.props;

        if (form.fellesperiodeukerForelder2 > 0) {
            const forsteForelder2Periode = innslag.find(
                (i) =>
                    i.type === TidslinjeinnslagType.periode &&
                    i.periode.type === Periodetype.Stonadsperiode &&
                    i.periode.forelder === 'forelder2' &&
                    i.periode.konto === StonadskontoType.Fellesperiode
            );
            if (forsteForelder2Periode) {
                (forsteForelder2Periode as InnslagPeriodetype).ekstrainfo = {
                    tekst: (
                        <TidslinjeAktivitetskravInfo
                            navnForelder1={form.navnForelder1}
                            navnForelder2={form.navnForelder2}
                        />
                    )
                };
            }
        }
        const tidsromForUtsettelse: Tidsperiode | undefined =
            form.termindato &&
            form.dekningsgrad &&
            sisteRegistrertePermisjonsdag
                ? getGyldigTidsromForUtsettelse(
                      form.termindato,
                      form.dekningsgrad,
                      form.permisjonsregler,
                      sisteRegistrertePermisjonsdag
                  )
                : undefined;

        return (
            <div>
                <Permisjonsplan
                    navnForelder1={form.navnForelder1}
                    navnForelder2={form.navnForelder2}
                    permisjonsregler={form.permisjonsregler}
                    fellesperiodeukerForelder1={form.fellesperiodeukerForelder1}
                    fellesperiodeukerForelder2={form.fellesperiodeukerForelder2}
                    innslag={innslag}
                    onRedigerUtsettelse={(u: Utsettelsesperiode) =>
                        dispatch(utsettelseVisDialog(u))
                    }
                    onLeggTilUtsettelse={() => dispatch(utsettelseVisDialog())}
                />

                {form.termindato &&
                    tidsromForUtsettelse && (
                        <UtsettelseDialog
                            isOpen={utsettelse.dialogErApen}
                            navnForelder1={form.navnForelder1}
                            navnForelder2={form.navnForelder2}
                            utsettelser={utsettelse.utsettelser}
                            utsettelse={utsettelse.valgtUtsettelse}
                            tidsrom={tidsromForUtsettelse}
                            permisjonsregler={form.permisjonsregler}
                            termindato={form.termindato}
                        />
                    )}
            </div>
        );
    }
}

const mapStateToProps = (state: UttaksplanAppState): StateProps => {
    let innslag: Tidslinjeinnslag[] = [];
    innslag = tidslinjeFraPerioder(state);

    return {
        innslag,
        form: state.uttaksplan.form,
        utsettelse: state.uttaksplan.utsettelse,
        sisteRegistrertePermisjonsdag: getSisteRegistrertePermisjonsdag(state)
    };
};

export default connect(mapStateToProps)(Main);
