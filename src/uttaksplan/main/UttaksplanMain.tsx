import * as React from 'react';
import { connect } from 'react-redux';
import {
    UttaksplanAppState,
    PeriodeState,
    UttaksplanFormState
} from 'uttaksplan/redux/types';
import { getTidslinjeFraPerioder } from 'uttaksplan/utils/tidslinjeUtils';
import { Tidslinjeinnslag } from 'uttaksplan/components/tidslinje/types';
import { Periode, Periodetype, Dekningsgrad } from 'uttaksplan/types';
import { getAntallUkerFellesperiode } from 'uttaksplan/utils/permisjonUtils';
import { DispatchProps } from 'common/redux/types';

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
    opprettPerioder
} from 'uttaksplan/redux/actions';
import UkerOgDager from 'common/components/uker-og-dager/UkerOgDager';
import Knapperad from 'common/components/knapperad/Knapperad';
import UttaksplanSkjema from 'uttaksplan/skjema/uttaksplanSkjema/UttaksplanSkjema';

import { getTimelineItemsFromInnslag } from 'uttaksplan/utils/innslagUtils';
import UttaksplanIkon, {
    UttaksplanIkonKeys
} from 'uttaksplan/components/uttaksplanIkon/UttaksplanIkon';

import '../styles/uttaksplan.less';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import DevHelper from 'uttaksplan/main/dev/DevToolbar';
import UttaksperiodeDialog from 'uttaksplan/connectedComponents/uttaksperiodeDialog/UttaksperiodeDialog';
import UtsettelsesperiodeDialog from 'uttaksplan/connectedComponents/utsettelsesperiodeDialog/UtsettelsesperiodeDialog';
import {
    Uttaksgrunnlag,
    SøkerGrunnlag,
    AnnenForelderGrunnlag
} from 'uttaksplan/types/uttaksgrunnlag';
import { getUttaksgrunnlag } from 'uttaksplan/utils/uttaksgrunnlagUtils';
import Uttaksoversikt from 'uttaksplan/components/uttaksoversikt/Uttaksoversikt';
import { beregnAlleUttak } from 'uttaksplan/utils/beregnUttak';

export interface StateProps {
    form: UttaksplanFormState;
    dekningsgrad: Dekningsgrad;
    uttaksgrunnlag: Uttaksgrunnlag;
    ukerFellesperiode: number;
    innslag: Tidslinjeinnslag[];
    periode: PeriodeState;
    visPermisjonsplan: boolean;
    manuellUttaksplan?: boolean;
}

interface OwnProps {
    termindato: Date;
    søker: SøkerGrunnlag;
    annenForelder: AnnenForelderGrunnlag;
    antallBarn: number;
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
            termindato,
            dekningsgrad,
            dispatch,
            uttaksgrunnlag,
            form
        } = this.props;
        const { fellesperiodeukerForelder1, fellesperiodeukerForelder2 } = form;

        dispatch(
            opprettPerioder(
                termindato,
                dekningsgrad,
                uttaksgrunnlag,
                fellesperiodeukerForelder1,
                fellesperiodeukerForelder2
            )
        );

        dispatch(visTidslinje(true));
    }
    render() {
        const {
            uttaksgrunnlag,
            termindato,
            dekningsgrad,
            innslag,
            periode,
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
                        navnForelder1={uttaksgrunnlag.søker.fornavn}
                        navnForelder2={
                            uttaksgrunnlag.annenForelder
                                ? uttaksgrunnlag.annenForelder.fornavn
                                : 'Forelder 2'
                        }
                        permisjonsregler={uttaksgrunnlag.permisjonsregler}
                        ukerFellesperiode={ukerFellesperiode}
                        onChangeDekningsgrad={(dg) =>
                            dispatch(
                                setDekningsgrad(
                                    dg,
                                    uttaksgrunnlag.permisjonsregler
                                )
                            )
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
                {visPermisjonsplan &&
                    periode.perioder && (
                        <div className="tidsplan">
                            <div className="blokk-m">
                                <Timeline
                                    items={getTimelineItemsFromInnslag(
                                        innslag,
                                        intl,
                                        uttaksgrunnlag
                                    )}
                                    iconRenderer={(icon) => (
                                        <UttaksplanIkon
                                            ikon={icon as UttaksplanIkonKeys}
                                        />
                                    )}
                                    onItemClick={(item: TimelineItem) => {
                                        this.handleItemClick(item);
                                    }}
                                    durationRenderer={(dager: number) => (
                                        <UkerOgDager
                                            dager={dager}
                                            visKunDager={true}
                                        />
                                    )}
                                    rangeRenderer={(
                                        startdato: Date,
                                        sluttdato: Date
                                    ) => (
                                        <TidsperiodeTekst
                                            tidsperiode={{
                                                startdato,
                                                sluttdato
                                            }}
                                            visSluttdato={true}
                                        />
                                    )}
                                />
                            </div>

                            <div className="blokk-m">
                                <Uttaksoversikt
                                    uttak={beregnAlleUttak(
                                        periode.perioder,
                                        uttaksgrunnlag
                                    )}
                                />
                            </div>

                            <div className="m-textCenter">
                                <Knapperad>
                                    <Knapp
                                        onClick={() =>
                                            dispatch(
                                                visPeriodeDialog(
                                                    Periodetype.Uttak
                                                )
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

                            <UttaksperiodeDialog
                                uttaksgrunnlag={uttaksgrunnlag}
                                termindato={termindato}
                                dekningsgrad={dekningsgrad}
                            />

                            <UtsettelsesperiodeDialog
                                navnForelder1={uttaksgrunnlag.søker.fornavn}
                                navnForelder2={
                                    uttaksgrunnlag.annenForelder
                                        ? uttaksgrunnlag.annenForelder.fornavn
                                        : 'Forelder 2'
                                }
                                termindato={termindato}
                                permisjonsregler={
                                    uttaksgrunnlag.permisjonsregler
                                }
                            />
                        </div>
                    )}
                <DevHelper
                    termindato={termindato}
                    dekningsgrad={dekningsgrad}
                    permisjonsregler={uttaksgrunnlag.permisjonsregler}
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
    const { termindato } = props;
    const { periode, view, form } = appState.uttaksplan;
    const dekningsgrad = form.dekningsgrad || '100%';

    const uttaksgrunnlag = getUttaksgrunnlag(
        termindato,
        dekningsgrad,
        props.søker,
        props.annenForelder,
        props.antallBarn
    );

    const ukerFellesperiode = getAntallUkerFellesperiode(
        uttaksgrunnlag.permisjonsregler,
        dekningsgrad
    );

    const innslag: Tidslinjeinnslag[] = getTidslinjeFraPerioder(
        appState.uttaksplan.periode.perioder,
        termindato,
        dekningsgrad
    );

    const visPermisjonsplan =
        innslag &&
        innslag.length > 0 &&
        dekningsgrad !== undefined &&
        termindato !== undefined &&
        view.visTidslinje === true;

    return {
        form,
        dekningsgrad,
        uttaksgrunnlag,
        innslag,
        periode,
        ukerFellesperiode,
        manuellUttaksplan: periode.manuellOppdatering,
        visPermisjonsplan
    };
};

export default connect(mapStateToProps)(injectIntl(UttaksplanMain));
