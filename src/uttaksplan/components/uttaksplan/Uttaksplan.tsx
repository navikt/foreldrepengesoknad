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
    Permisjonsregler,
    Periodetype
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
import {
    TimelineItem,
    TimelineItemType
} from 'uttaksplan/components/timeline/types';
import Varighet from 'uttaksplan/components/tidslinje/elementer/Varighet';
import TidsperiodeTekst from 'uttaksplan/components/tidslinje/elementer/TidsperiodeTekst';
import { mapInnslagToTimelineItem } from 'uttaksplan/components/uttaksplan/utils';
import UttaksplanSkjema from 'uttaksplan/components/uttaksplan/uttaksplanSkjema';
import {
    setDekningsgrad,
    setFellesperiodeukerMor,
    visTidslinje,
    visPeriodeDialog
} from 'uttaksplan/redux/actions';

export type Props = OwnProps & StateProps & DispatchProps;

import '../skjema/skjema.less';

export interface StateProps {
    dekningsgrad: Dekningsgrad;
    ukerFellesperiode: number;
    permisjonsregler: Permisjonsregler;
    form: UttaksplanFormState;
    innslag: Tidslinjeinnslag[];
    periode: PeriodeState;
    visPermisjonsplan: boolean;
    sisteRegistrertePermisjonsdag?: Date;
    statePerioder: Periode[];
    tidsromForUtsettelse?: Tidsperiode;
}

interface OwnProps {
    termindato: Date;
    navnForelder1: string;
    navnForelder2: string;
    perioder?: Periode[];
    /** Default 100% */
    initialDekningsgrad?: Dekningsgrad;
    onLagPerioder: (perioder: Periode[]) => void;
}

class Uttaksplan extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleItemClick = this.handleItemClick.bind(this);
    }
    handleItemClick(item: TimelineItem) {
        if (item.type === TimelineItemType.event) {
            const periode = item.data as Periode;
            if (periode.type === Periodetype.Utsettelse) {
                this.props.dispatch(visPeriodeDialog(periode));
            }
        }
    }
    render() {
        const {
            periode,
            innslag,
            termindato,
            statePerioder,
            onLagPerioder,
            tidsromForUtsettelse,
            navnForelder1,
            navnForelder2,
            permisjonsregler,
            ukerFellesperiode,
            visPermisjonsplan,
            dispatch,
            form
        } = this.props;

        return (
            <React.Fragment>
                <div className="blokk-m no-print">
                    <UttaksplanSkjema
                        dekningsgrad={form.dekningsgrad}
                        fellesperiodeukerForelder1={
                            form.fellesperiodeukerForelder1
                        }
                        navnForelder1={navnForelder1}
                        navnForelder2={navnForelder2}
                        permisjonsregler={permisjonsregler}
                        ukerFellesperiode={ukerFellesperiode}
                        onChangeDekningsgrad={(dg) =>
                            dispatch(setDekningsgrad(dg))
                        }
                        onChangeFordeling={(uker) =>
                            dispatch(setFellesperiodeukerMor(uker))
                        }
                    />
                    <Knapp
                        onClick={() => {
                            onLagPerioder(statePerioder);
                            dispatch(visTidslinje(true));
                        }}>
                        Vis uttaksplan
                    </Knapp>
                </div>
                {visPermisjonsplan && (
                    <div className="tidsplan">
                        <Timeline
                            items={innslag.map((i) =>
                                mapInnslagToTimelineItem(i)
                            )}
                            navnForelder1={navnForelder1}
                            navnForelder2={navnForelder2}
                            iconRenderer={(icon) => (
                                <UttaksplanIkon
                                    ikon={icon as UttaksplanIkonKeys}
                                />
                            )}
                            onItemClick={(item: TimelineItem) => {
                                this.handleItemClick(item);
                            }}
                            durationRenderer={(dager: number) => (
                                <Varighet dager={dager} />
                            )}
                            rangeRenderer={(
                                startdato: Date,
                                sluttdato: Date
                            ) => (
                                <TidsperiodeTekst
                                    tidsperiode={{ startdato, sluttdato }}
                                    visSluttdato={true}
                                />
                            )}
                        />

                        {visPermisjonsplan &&
                            tidsromForUtsettelse &&
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
                )}
            </React.Fragment>
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
    const dekningsgrad: Dekningsgrad =
        form.dekningsgrad || props.initialDekningsgrad || '100%';
    const permisjonsregler = getPermisjonsregler(props.termindato);
    const ukerFellesperiode = getAntallUkerFellesperiode(
        permisjonsregler,
        dekningsgrad
    );
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
        ukerFellesperiode,
        dekningsgrad,
        visPermisjonsplan:
            innslag &&
            innslag.length > 0 &&
            dekningsgrad !== undefined &&
            termindato !== undefined &&
            view.visTidslinje === true
    };
};

export default connect(mapStateToProps)(Uttaksplan);
