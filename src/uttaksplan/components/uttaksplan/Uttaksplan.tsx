import * as React from 'react';
import { connect } from 'react-redux';
import {
    UttaksplanAppState,
    PeriodeState,
    UttaksplanFormState
} from 'uttaksplan/redux/types';
import { tidslinjeFraPerioder } from 'uttaksplan/selectors/tidslinjeSelector';
import { Tidslinjeinnslag } from 'uttaksplan/components/tidslinje/types';
import {
    Tidsperiode,
    Dekningsgrad,
    Periode,
    Utsettelsesperiode,
    Permisjonsregler
} from 'uttaksplan/types';
import {
    getGyldigTidsromForUtsettelse,
    getAntallUkerFellesperiode
} from 'uttaksplan/utils/permisjonUtils';
import {
    getSisteRegistrertePermisjonsdag,
    getStonadsperioderOgUtsettelser
} from 'uttaksplan/selectors/periodeSelector';
import { DispatchProps } from 'app/redux/types';
import UtsettelseDialog from 'uttaksplan/components/utsettelseDialog/UtsettelseDialog';
import { getPermisjonsregler } from 'uttaksplan/data/permisjonsregler';

import '../../styles/uttaksplan.less';
import { Knapp } from 'nav-frontend-knapper';
import Timeline from 'uttaksplan/components/timeline/Timeline';
import UttaksplanIkon, {
    UttaksplanIkonKeys
} from 'uttaksplan/components/uttaksplan/UttaksplanIkon';
import { TimelineItem } from 'uttaksplan/components/timeline/types';
import Varighet from 'uttaksplan/components/tidslinje/elementer/Varighet';
import TidsperiodeTekst from 'uttaksplan/components/tidslinje/elementer/TidsperiodeTekst';
import { mapInnslagToTimelineItem } from 'uttaksplan/components/uttaksplan/utils';
import UttaksplanSkjema from 'uttaksplan/components/uttaksplan/uttaksplanSkjema';
import {
    setDekningsgrad,
    setFellesperiodeukerMor
} from 'uttaksplan/redux/actions';

export type Props = OwnProps & StateProps & DispatchProps;

import '../skjema/skjema.less';

export interface StateProps {
    permisjonsregler: Permisjonsregler;
    form: UttaksplanFormState;
    innslag: Tidslinjeinnslag[];
    periode: PeriodeState;
    visPermisjonsplan: boolean;
    sisteRegistrertePermisjonsdag?: Date;
    statePerioder: Periode[];
    tidsromForUtsettelse?: Tidsperiode;
    dekningsgrad?: Dekningsgrad;
}

interface OwnProps {
    termindato: Date;
    navnForelder1: string;
    navnForelder2: string;
    perioder?: Periode[];
    onLagPerioder: (perioder: Periode[]) => void;
}

class UttaksplanEksempelskjema extends React.Component<Props> {
    render() {
        const {
            periode,
            innslag,
            termindato,
            perioder,
            statePerioder,
            onLagPerioder,
            tidsromForUtsettelse,
            navnForelder1,
            navnForelder2,
            permisjonsregler,
            dispatch,
            form
        } = this.props;

        if (!perioder) {
            return (
                <div className="blokk-m no-print">
                    <UttaksplanSkjema
                        dekningsgrad={form.dekningsgrad}
                        fellesperiodeukerForelder1={
                            form.fellesperiodeukerForelder1
                        }
                        navnForelder1={navnForelder1}
                        navnForelder2={navnForelder2}
                        permisjonsregler={permisjonsregler}
                        ukerFellesperiode={getAntallUkerFellesperiode(
                            permisjonsregler,
                            form.dekningsgrad
                        )}
                        onChangeDekningsgrad={(dg) =>
                            dispatch(setDekningsgrad(dg))
                        }
                        onChangeFordeling={(uker) =>
                            dispatch(setFellesperiodeukerMor(uker))
                        }
                    />
                    <Knapp onClick={() => onLagPerioder(statePerioder)}>
                        Vis uttaksplan
                    </Knapp>
                </div>
            );
        }

        return (
            <div className="tidsplan">
                <Timeline
                    items={innslag.map((i) => mapInnslagToTimelineItem(i))}
                    navnForelder1={navnForelder1}
                    navnForelder2={navnForelder2}
                    iconRenderer={(icon) => (
                        <UttaksplanIkon ikon={icon as UttaksplanIkonKeys} />
                    )}
                    onItemClick={(item: TimelineItem) => {
                        // console.log(item);
                    }}
                    durationRenderer={(dager: number) => (
                        <Varighet dager={dager} />
                    )}
                    rangeRenderer={(startdato: Date, sluttdato: Date) => (
                        <TidsperiodeTekst
                            tidsperiode={{ startdato, sluttdato }}
                            visSluttdato={true}
                        />
                    )}
                />

                {tidsromForUtsettelse &&
                    termindato && (
                        <div>
                            <UtsettelseDialog
                                isOpen={periode.dialogErApen}
                                navnForelder1={navnForelder1}
                                navnForelder2={navnForelder2}
                                utsettelser={
                                    periode.perioder as Utsettelsesperiode[]
                                }
                                utsettelse={
                                    periode.valgtPeriode as Utsettelsesperiode
                                }
                                tidsrom={tidsromForUtsettelse}
                                permisjonsregler={permisjonsregler}
                                termindato={termindato}
                            />
                        </div>
                    )}
            </div>
        );
    }
}

const mapStateToProps = (
    appState: UttaksplanAppState,
    props: OwnProps
): StateProps => {
    const sisteRegistrertePermisjonsdag = getSisteRegistrertePermisjonsdag(
        appState
    );
    const { termindato } = props;
    const { form, periode, view } = appState.uttaksplan;
    const { dekningsgrad } = form;
    const permisjonsregler = getPermisjonsregler(props.termindato);
    const tidsromForUtsettelse =
        termindato && dekningsgrad && sisteRegistrertePermisjonsdag
            ? getGyldigTidsromForUtsettelse(
                  termindato,
                  dekningsgrad,
                  permisjonsregler,
                  sisteRegistrertePermisjonsdag
              )
            : undefined;
    let innslag: Tidslinjeinnslag[] = [];
    innslag = tidslinjeFraPerioder(appState);
    return {
        statePerioder: getStonadsperioderOgUtsettelser(appState),
        innslag,
        form,
        periode,
        sisteRegistrertePermisjonsdag,
        tidsromForUtsettelse,
        permisjonsregler,
        visPermisjonsplan:
            innslag &&
            innslag.length > 0 &&
            dekningsgrad !== undefined &&
            termindato !== undefined &&
            view.visTidslinje === true
    };
};

export default connect(mapStateToProps)(UttaksplanEksempelskjema);
