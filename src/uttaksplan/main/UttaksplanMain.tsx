import * as React from 'react';
import { connect } from 'react-redux';
import {
    UttaksplanAppState,
    PeriodeState,
    UttaksplanFormState
} from 'uttaksplan/redux/types';
import { tidslinjeFraPerioder } from 'uttaksplan/selectors/tidslinjeSelector';
import { Tidslinjeinnslag } from 'uttaksplan/components/tidslinje/types';
import { Periode, Permisjonsregler, Periodetype } from 'uttaksplan/types';
import {
    getGyldigTidsromForUtsettelse,
    getAntallUkerFellesperiode
} from 'uttaksplan/utils/permisjonUtils';
import { getSisteRegistrertePermisjonsdag } from 'uttaksplan/selectors/periodeSelector';
import { DispatchProps } from 'common/redux/types';
import { getPermisjonsregler } from 'uttaksplan/data/permisjonsregler';

import { Knapp } from 'nav-frontend-knapper';
import Timeline from 'uttaksplan/components/timeline/Timeline';
import {
    TimelineItem,
    TimelineItemType
} from 'uttaksplan/components/timeline/types';
import TidsperiodeTekst from 'uttaksplan/components/tidslinje/elementer/TidsperiodeTekst';
import {
    setDekningsgrad,
    setFellesperiodeukerMor,
    visTidslinje,
    visPeriodeDialog,
    opprettPerioder,
    setTermindato
} from 'uttaksplan/redux/actions';

import PeriodeDialog from 'uttaksplan/components/periodeDialog/PeriodeDialog';
import { Dekningsgrad } from 'common/types';
import { Tidsperiode } from 'nav-datovelger';
import UkerOgDager from 'common/components/uker-og-dager/UkerOgDager';
import Knapperad from 'common/components/knapperad/Knapperad';
import UttaksplanSkjema from 'uttaksplan/skjema/uttaksplanSkjema/UttaksplanSkjema';

import { mapInnslagToTimelineItem } from 'uttaksplan/utils/innslagUtils';
import UttaksplanIkon, {
    UttaksplanIkonKeys
} from 'uttaksplan/components/uttaksplanIkon/UttaksplanIkon';

import '../styles/uttaksplan.less';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import DevHelper from 'uttaksplan/main/dev/DevToolbar';
import FordelingUttaksplan from 'uttaksplan/connectedComponents/fordelingUttaksplan/FordelingUttaksplan';

export interface StateProps {
    dekningsgrad: Dekningsgrad;
    ukerFellesperiode: number;
    permisjonsregler: Permisjonsregler;
    form: UttaksplanFormState;
    innslag: Tidslinjeinnslag[];
    periode: PeriodeState;
    visPermisjonsplan: boolean;
    sisteRegistrertePermisjonsdag?: Date;
    tidsromForUtsettelse?: Tidsperiode;
}

interface OwnProps {
    termindato: Date;
    navnForelder1: string;
    navnForelder2: string;
    perioder?: Periode[];
    /** Default 100% */
    initialDekningsgrad?: Dekningsgrad;
    onChange: (perioder: Periode[]) => void;
}

export type Props = OwnProps & StateProps & DispatchProps & InjectedIntlProps;

class UttaksplanMain extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleItemClick = this.handleItemClick.bind(this);
        this.opprettPerioder = this.opprettPerioder.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(setTermindato(this.props.termindato));
        this.props.dispatch(
            setDekningsgrad(
                this.props.dekningsgrad || this.props.initialDekningsgrad
            )
        );
        this.opprettPerioder();
    }

    handleItemClick(item: TimelineItem) {
        if (item.type === TimelineItemType.event) {
            const periode = item.data as Periode;
            if (periode.type === Periodetype.Utsettelse) {
                this.props.dispatch(
                    visPeriodeDialog(Periodetype.Utsettelse, periode)
                );
            } else if (periode.type === Periodetype.Uttak) {
                this.props.dispatch(
                    visPeriodeDialog(Periodetype.Uttak, periode)
                );
            }
        }
    }
    opprettPerioder() {
        const {
            dispatch,
            termindato,
            permisjonsregler,
            dekningsgrad,
            form
        } = this.props;
        const { fellesperiodeukerForelder1, fellesperiodeukerForelder2 } = form;

        dispatch(
            opprettPerioder(
                termindato,
                dekningsgrad,
                fellesperiodeukerForelder1,
                fellesperiodeukerForelder2,
                permisjonsregler
            )
        );
        dispatch(visTidslinje(true));
    }
    render() {
        const {
            periode,
            innslag,
            termindato,
            tidsromForUtsettelse,
            navnForelder1,
            navnForelder2,
            permisjonsregler,
            ukerFellesperiode,
            visPermisjonsplan,
            dispatch,
            intl,
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
                    <div className="m-textCenter">
                        <Knapp onClick={() => this.opprettPerioder()}>
                            Opprett perioder
                        </Knapp>
                    </div>
                </div>
                {visPermisjonsplan && (
                    <div className="tidsplan">
                        <div className="blokk-s">
                            <FordelingUttaksplan />
                        </div>
                        <div className="blokk-m">
                            <Timeline
                                items={innslag.map((i) =>
                                    mapInnslagToTimelineItem(i, intl)
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
                                    <UkerOgDager dager={dager} />
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
                        </div>

                        <div className="m-textCenter">
                            <Knapperad>
                                <Knapp
                                    onClick={() =>
                                        dispatch(
                                            visPeriodeDialog(Periodetype.Uttak)
                                        )
                                    }>
                                    Legg til uttak
                                </Knapp>
                                <Knapp
                                    onClick={() =>
                                        dispatch(
                                            visPeriodeDialog(
                                                Periodetype.Utsettelse
                                            )
                                        )
                                    }>
                                    Legg til utsettelse
                                </Knapp>
                            </Knapperad>
                        </div>

                        {visPermisjonsplan &&
                            tidsromForUtsettelse &&
                            termindato &&
                            periode.valgtPeriode && (
                                <PeriodeDialog
                                    periodetype={
                                        periode.valgtPeriode.periodetype
                                    }
                                    isOpen={periode.dialogErApen}
                                    navnForelder1={navnForelder1}
                                    navnForelder2={navnForelder2}
                                    perioder={periode.perioder}
                                    periode={periode.valgtPeriode.periode}
                                    tidsrom={tidsromForUtsettelse}
                                    permisjonsregler={permisjonsregler}
                                    termindato={termindato}
                                />
                            )}
                    </div>
                )}
                <DevHelper
                    termindato={termindato}
                    dekningsgrad={form.dekningsgrad || '100%'}
                    permisjonsregler={permisjonsregler}
                    fellesperiodeukerForelder1={form.fellesperiodeukerForelder1}
                    fellesperiodeukerForelder2={form.fellesperiodeukerForelder2}
                />
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
    const innslag: Tidslinjeinnslag[] = tidslinjeFraPerioder(appState);
    return {
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

export default connect(mapStateToProps)(injectIntl(UttaksplanMain));
