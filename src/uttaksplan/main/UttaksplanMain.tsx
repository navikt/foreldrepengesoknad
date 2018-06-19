import * as React from 'react';
import { connect } from 'react-redux';
import {
    UttaksplanAppState,
    PeriodeState,
    UttaksplanFormState
} from 'uttaksplan/redux/types';
import { getTidslinjeFraPerioder } from 'uttaksplan/utils/tidslinjeUtils';
import { Tidslinjeinnslag } from 'uttaksplan/components/tidslinje/types';
import { Periode, Permisjonsregler, Periodetype } from 'uttaksplan/types';
import { getAntallUkerFellesperiode } from 'uttaksplan/utils/permisjonUtils';
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
    setTermindato,
    setUttaksgrunnlag
} from 'uttaksplan/redux/actions';

import { Dekningsgrad } from 'common/types';
import { Tidsperiode } from 'nav-datovelger';
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

export interface StateProps {
    uttaksgrunnlag: Uttaksgrunnlag;
    ukerFellesperiode: number;
    innslag: Tidslinjeinnslag[];
    periode: PeriodeState;
    visPermisjonsplan: boolean;
    sisteRegistrertePermisjonsdag?: Date;
    tidsromForUtsettelse?: Tidsperiode;
    manuellUttaksplan?: boolean;
}

interface OwnProps {
    termindato: Date;
    søker: SøkerGrunnlag;
    annenForelder: AnnenForelderGrunnlag;
    antallBarn: number;
    perioder?: Periode[];
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
        this.props.dispatch(
            setUttaksgrunnlag(
                getUttaksgrunnlag(
                    this.props.termindato,
                    this.props.dekningsgrad,
                    this.props.søker,
                    this.props.annenForelder,
                    this.props.antallBarn
                )
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
        const { dispatch, uttaksgrunnlag } = this.props;
        const { fellesperiodeukerForelder1, fellesperiodeukerForelder2 } = form;

        dispatch(
            opprettPerioder(
                termindato,
                dekningsgrad,
                annenForelder,
                fellesperiodeukerForelder1,
                fellesperiodeukerForelder2,
                permisjonsregler
            )
        );

        dispatch(visTidslinje(true));
    }
    render() {
        const {
            innslag,
            termindato,
            bruker,
            søker,
            annenForelder,
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
                        navnForelder1={bruker.fornavn}
                        navnForelder2={annenForelder.navn}
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
                        <div className="blokk-m">
                            <Timeline
                                items={getTimelineItemsFromInnslag(
                                    innslag,
                                    intl,
                                    søker.erAleneOmOmsorg,
                                    bruker,
                                    annenForelder
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

                        <UttaksperiodeDialog />

                        <UtsettelsesperiodeDialog
                            navnForelder1={bruker.fornavn}
                            navnForelder2={annenForelder.navn}
                            termindato={termindato}
                            permisjonsregler={permisjonsregler}
                        />
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
    const { uttaksgrunnlag, periode, view } = appState.uttaksplan;
    // const dekningsgrad: Dekningsgrad =
    //     form.dekningsgrad || props.initialDekningsgrad || '100%';
    // const permisjonsregler = getPermisjonsregler(props.termindato);
    const ukerFellesperiode = getAntallUkerFellesperiode(
        permisjonsregler,
        dekningsgrad
    );
    const innslag: Tidslinjeinnslag[] = getTidslinjeFraPerioder(
        appState.uttaksplan.periode.perioder,
        props.termindato,
        dekningsgrad
    );

    return {
        uttaksgrunnlag,
        innslag,
        periode,
        sisteRegistrertePermisjonsdag,
        ukerFellesperiode,
        manuellUttaksplan: periode.manuellOppdatering,
        visPermisjonsplan:
            innslag &&
            innslag.length > 0 &&
            dekningsgrad !== undefined &&
            termindato !== undefined &&
            view.visTidslinje === true
    };
};

export default connect(mapStateToProps)(injectIntl(UttaksplanMain));
