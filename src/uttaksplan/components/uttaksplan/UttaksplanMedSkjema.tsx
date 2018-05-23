import * as React from 'react';
import { connect } from 'react-redux';
import { Knapp } from 'nav-frontend-knapper';
import {
    UttaksplanAppState,
    UtsettelseState,
    UttaksplanFormState
} from 'uttaksplan/redux/types';
import { tidslinjeFraPerioder } from 'uttaksplan/selectors/tidslinjeSelector';
import {
    Tidslinjeinnslag,
    TidslinjeinnslagType,
    InnslagPeriodetype
} from 'uttaksplan/components/tidslinje/types';
import { utsettelseVisDialog, visTidslinje } from 'uttaksplan/redux/actions';
import {
    Utsettelsesperiode,
    Tidsperiode,
    Periodetype,
    StonadskontoType,
    Spraak
} from 'uttaksplan/types';
import { getGyldigTidsromForUtsettelse } from 'uttaksplan/utils/permisjonUtils';
import TidslinjeAktivitetskravInfo from 'uttaksplan/components/content/TidslinjeAktivitetskravInfo';
import { getSisteRegistrertePermisjonsdag } from 'uttaksplan/selectors/periodeSelector';
import { DispatchProps } from 'app/redux/types';
import { FormattedMessage } from 'react-intl';
import UttaksplanSkjema from 'uttaksplan/components/skjema/Skjema';
import Permisjonsplan from 'uttaksplan/components/permisjonsplan/Permisjonsplan';
import UtsettelseDialog from 'uttaksplan/components/utsettelseDialog/UtsettelseDialog';
import PlanleggerInfo from 'uttaksplan/components/content/PlanleggerInfo';

export interface StateProps {
    form: UttaksplanFormState;
    innslag: Tidslinjeinnslag[];
    utsettelse: UtsettelseState;
    visPermisjonsplan: boolean;
    sisteRegistrertePermisjonsdag?: Date;
}

interface OwnProps {
    sprak?: Spraak;
}

import '../../styles/uttaksplan.less';

export type Props = OwnProps & StateProps & DispatchProps;

export class Main extends React.Component<Props> {
    render() {
        const {
            form,
            utsettelse,
            innslag,
            visPermisjonsplan,
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
                <section className="blokk-l">
                    <h1 className="m-textCenter applikasjonstittel blokk-s">
                        <FormattedMessage id="uttaksplan.applikasjonstittel" />
                    </h1>
                    <div className="blokk-m">
                        <PlanleggerInfo />
                    </div>
                </section>

                <section>
                    <h2 className="sr-only">
                        <FormattedMessage id="uttaksplan.skjermleser.skjema.tittel" />
                    </h2>
                    <div className="blokk-m no-print">
                        <UttaksplanSkjema />
                    </div>
                    {!this.props.visPermisjonsplan &&
                        this.props.form.dekningsgrad &&
                        this.props.form.termindato && (
                            <div className="blokk-m no-print m-textCenter">
                                <Knapp
                                    onClick={() =>
                                        dispatch(visTidslinje(true))
                                    }>
                                    <FormattedMessage id="uttaksplan.knapp.vispermisjonsplan" />
                                </Knapp>
                            </div>
                        )}
                </section>

                {visPermisjonsplan && (
                    <Permisjonsplan
                        navnForelder1={form.navnForelder1}
                        navnForelder2={form.navnForelder2}
                        permisjonsregler={form.permisjonsregler}
                        fellesperiodeukerForelder1={
                            form.fellesperiodeukerForelder1
                        }
                        fellesperiodeukerForelder2={
                            form.fellesperiodeukerForelder2
                        }
                        innslag={innslag}
                        onRedigerUtsettelse={(u: Utsettelsesperiode) =>
                            dispatch(utsettelseVisDialog(u))
                        }
                        onLeggTilUtsettelse={() =>
                            dispatch(utsettelseVisDialog())
                        }
                    />
                )}

                {tidsromForUtsettelse &&
                    form.termindato && (
                        <div>
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
                        </div>
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

export default connect(mapStateToProps)(Main);
