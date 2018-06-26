import * as React from 'react';
import { connect } from 'react-redux';
import {
    UttaksplanAppState,
    PeriodeState,
    UttaksplanFormState
} from 'uttaksplan/redux/types';
import { Periode, Periodetype } from 'uttaksplan/types';
import { DispatchProps } from 'common/redux/types';

import { Knapp } from 'nav-frontend-knapper';
import {
    TimelineItem,
    TimelineItemType
} from 'uttaksplan/components/timeline/types';
import {
    setDekningsgrad,
    setFellesperiodeukerMor,
    visTidslinje,
    visPeriodeDialog,
    opprettPerioder
} from 'uttaksplan/redux/actions';
import Knapperad from 'common/components/knapperad/Knapperad';
import UttaksplanSkjema from 'uttaksplan/skjema/uttaksplanSkjema/UttaksplanSkjema';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import DevHelper from 'uttaksplan/main/dev/DevToolbar';
import UttaksperiodeDialog from 'uttaksplan/connectedComponents/uttaksperiodeDialog/UttaksperiodeDialog';
import UtsettelsesperiodeDialog from 'uttaksplan/connectedComponents/utsettelsesperiodeDialog/UtsettelsesperiodeDialog';
import {
    Uttaksgrunnlag,
    SøkerGrunnlag,
    AnnenForelderGrunnlag
} from 'uttaksplan/types/uttaksgrunnlag';
import {
    getUttaksgrunnlag,
    getUttaksdatoer,
    getUttaksinfo
} from 'uttaksplan/utils/uttaksgrunnlagUtils';

import '../styles/uttaksplan.less';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import EkspanderbartInnhold from 'common/components/ekspanderbart-innhold/EkspanderbartInnhold';
import PeriodeTimeline from 'uttaksplan/components/periodeTimeline/PeriodeTimeline';

export interface StateProps {
    form: UttaksplanFormState;
    uttaksgrunnlag: Uttaksgrunnlag;
    periode: PeriodeState;
    manuellUttaksplan?: boolean;
}

interface OwnProps {
    termindato: Date;
    søker: SøkerGrunnlag;
    annenForelder?: AnnenForelderGrunnlag;
    antallBarn: number;
    erBarnetFødt: boolean;
    onChange: (perioder: Periode[]) => void;
}

export type Props = OwnProps & StateProps & DispatchProps & InjectedIntlProps;

class UttaksplanMain extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleItemClick = this.handleItemClick.bind(this);
        this.opprettPerioder = this.opprettPerioder.bind(this);
        this.handlePeriodeClick = this.handlePeriodeClick.bind(this);
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
    handlePeriodeClick(periode: Periode) {
        if (periode.type === Periodetype.Utsettelse) {
            this.props.dispatch(
                visPeriodeDialog(Periodetype.Utsettelse, periode)
            );
        } else if (periode.type === Periodetype.Uttak) {
            this.props.dispatch(visPeriodeDialog(Periodetype.Uttak, periode));
        }
    }
    opprettPerioder() {
        const { termindato, dispatch, uttaksgrunnlag, form } = this.props;
        const { dekningsgrad } = form;
        const { fellesperiodeukerForelder1, fellesperiodeukerForelder2 } = form;

        if (dekningsgrad) {
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
    }
    render() {
        const {
            uttaksgrunnlag,
            termindato,
            erBarnetFødt,
            periode,
            dispatch,
            form
        } = this.props;

        const perioderOpprettet = periode.perioder.length > 0;
        const dekningsgrad = form.dekningsgrad;

        return (
            <React.Fragment>
                <div className="blokk-m">
                    <Veilederinfo type="info">
                        Her setter du opp hvordan dere ønsker å ta ut
                        foreldrepengene. Henrik må sende inn egen søknad.
                    </Veilederinfo>
                </div>
                <div className="blokk-m no-print">
                    <div className="blokk-l">
                        <UttaksplanSkjema
                            form={form}
                            uttaksgrunnlag={uttaksgrunnlag}
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
                    </div>
                </div>

                {dekningsgrad && (
                    <div className="tidsplan">
                        <EkspanderbartInnhold
                            erApen={perioderOpprettet}
                            bredBakgrunn={true}>
                            <div className="blokkPad-m">
                                <h2 className="tidsplan__tittel">Planen</h2>
                                <p className="blokkPad-s">
                                    Du kan endre periodene ved å velge dem,
                                    eller legge til nye perioder og/eller
                                    utsettelser.
                                </p>
                                <PeriodeTimeline
                                    termindato={termindato}
                                    dekningsgrad={dekningsgrad}
                                    perioder={periode.perioder}
                                    uttaksgrunnlag={uttaksgrunnlag}
                                    erBarnetFødt={erBarnetFødt}
                                    onPeriodeClick={this.handlePeriodeClick}
                                />
                            </div>
                        </EkspanderbartInnhold>

                        {!perioderOpprettet && (
                            <div className="m-textCenter">
                                <Knapp onClick={() => this.opprettPerioder()}>
                                    Lag forslag til tidsplan
                                </Knapp>
                            </div>
                        )}

                        {dekningsgrad !== undefined &&
                            perioderOpprettet && (
                                <div>
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
                                                Legg til periode
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
                                </div>
                            )}
                    </div>
                )}

                {dekningsgrad && (
                    <UttaksperiodeDialog
                        uttaksgrunnlag={uttaksgrunnlag}
                        termindato={termindato}
                        dekningsgrad={dekningsgrad}
                    />
                )}

                <UtsettelsesperiodeDialog
                    navnForelder1={uttaksgrunnlag.søker.fornavn}
                    navnForelder2={
                        uttaksgrunnlag.annenForelder
                            ? uttaksgrunnlag.annenForelder.fornavn
                            : 'Forelder 2'
                    }
                    termindato={termindato}
                    permisjonsregler={uttaksgrunnlag.permisjonsregler}
                />
                <DevHelper
                    termindato={termindato}
                    dekningsgrad={dekningsgrad || '100%'}
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
    const { periode, form } = appState.uttaksplan;
    const dekningsgrad = form.dekningsgrad || '100%';

    const uttaksgrunnlag = getUttaksgrunnlag(
        termindato,
        dekningsgrad,
        props.søker,
        props.antallBarn,
        props.annenForelder
    );

    const uttaksdatoer = getUttaksdatoer(termindato);
    console.log(uttaksdatoer);

    const uttaksinfo = getUttaksinfo(periode.perioder);
    console.log(uttaksinfo);

    return {
        form,
        uttaksgrunnlag,
        periode,
        manuellUttaksplan: periode.manuellOppdatering
    };
};

export default connect(mapStateToProps)(injectIntl(UttaksplanMain));
