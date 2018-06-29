import * as React from 'react';
import { connect } from 'react-redux';
import {
    UttaksplanAppState,
    UttaksplanFormState
} from 'uttaksplan/redux/types';
import { Periode, Dekningsgrad } from 'uttaksplan/types';
import { DispatchProps } from 'common/redux/types';

import { Knapp } from 'nav-frontend-knapper';
import {
    setDekningsgrad,
    setFellesperiodeukerMor,
    visTidslinje,
    opprettPerioderForToForeldre,
    initUttaksplan,
    opprettPerioderAleneomsorg
} from 'uttaksplan/redux/actions';
import UttaksplanSkjema from 'uttaksplan/skjema/uttaksplanSkjema/UttaksplanSkjema';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import DevHelper from 'uttaksplan/main/dev/DevToolbar';

import '../styles/uttaksplan.less';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import EkspanderbartInnhold from 'common/components/ekspanderbart-innhold/EkspanderbartInnhold';
import DevBeregning from 'uttaksplan/main/dev/DevBeregning';
import Periodeplanlegger from 'uttaksplan/main/Periodeplanlegger';
import { Uttaksgrunnlag } from 'uttaksplan/uttak/uttaksgrunnlag';
import { Uttaksinfo, getUttaksinfo } from 'uttaksplan/uttak/uttaksinfo';
import { UttaksplanRequiredProps } from 'uttaksplan/uttak/types';

export interface StateProps {
    form: UttaksplanFormState;
    dekningsgrad: Dekningsgrad;
    uttaksgrunnlag?: Uttaksgrunnlag;
    uttaksinfo?: Uttaksinfo;
    perioder: Periode[];
    manuellUttaksplan?: boolean;
}

interface OwnProps {
    grunnlag: UttaksplanRequiredProps;
    onChange: (perioder: Periode[]) => void;
}

export type Props = OwnProps & StateProps & DispatchProps & InjectedIntlProps;

class UttaksplanMain extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.opprettPerioder = this.opprettPerioder.bind(this);
        this.resetUttaksplan = this.resetUttaksplan.bind(this);
    }

    componentDidMount() {
        this.resetUttaksplan(this.props.grunnlag, this.props.dekningsgrad);
    }

    componentWillReceiveProps(nextProps: Props) {
        if (
            JSON.stringify(this.props.grunnlag) !==
                JSON.stringify(nextProps.grunnlag) ||
            nextProps.dekningsgrad !== this.props.dekningsgrad
        ) {
            this.resetUttaksplan(nextProps.grunnlag, nextProps.dekningsgrad);
        }
    }

    resetUttaksplan(
        grunnlag: UttaksplanRequiredProps,
        dekningsgrad: Dekningsgrad
    ) {
        this.props.dispatch(initUttaksplan(grunnlag, dekningsgrad));
    }

    opprettPerioder() {
        const { grunnlag, dispatch, uttaksgrunnlag, form } = this.props;
        const { dekningsgrad } = form;
        const { fellesperiodeukerForelder1, fellesperiodeukerForelder2 } = form;

        if (dekningsgrad && uttaksgrunnlag) {
            if (uttaksgrunnlag.annenForelder) {
                dispatch(
                    opprettPerioderForToForeldre(
                        grunnlag.familiehendelsedato,
                        dekningsgrad,
                        uttaksgrunnlag,
                        fellesperiodeukerForelder1,
                        fellesperiodeukerForelder2
                    )
                );
            } else {
                dispatch(
                    opprettPerioderAleneomsorg(
                        grunnlag.familiehendelsedato,
                        dekningsgrad,
                        uttaksgrunnlag
                    )
                );
            }

            dispatch(visTidslinje(true));
        }
    }
    render() {
        const {
            grunnlag,
            perioder,
            uttaksgrunnlag,
            uttaksinfo,
            dispatch,
            form
        } = this.props;

        const perioderOpprettet = perioder.length > 0;
        const dekningsgrad = form.dekningsgrad;

        if (!uttaksgrunnlag) {
            return <div>Noop</div>;
        }

        return (
            <React.Fragment>
                <div className="blokk-m">
                    <Veilederinfo type="info">
                        Her setter du opp hvordan dere ønsker å ta ut
                        foreldrepengene. Henrik må sende inn egen søknad.
                    </Veilederinfo>
                </div>
                {!perioderOpprettet && (
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
                        <div className="m-textCenter">
                            <Knapp onClick={() => this.opprettPerioder()}>
                                Lag forslag til tidsplan
                            </Knapp>
                        </div>
                    </div>
                )}
                {perioderOpprettet && (
                    <div className="m-textCenter blokk-l">
                        <Knapp
                            onClick={() =>
                                this.resetUttaksplan(
                                    this.props.grunnlag,
                                    this.props.dekningsgrad
                                )
                            }>
                            Lag ny plan
                        </Knapp>
                    </div>
                )}
                <EkspanderbartInnhold
                    bredBakgrunn={true}
                    erApen={perioderOpprettet && uttaksinfo !== undefined}>
                    {perioderOpprettet &&
                        uttaksinfo && (
                            <div className="tidsplan">
                                <Periodeplanlegger
                                    perioder={perioder}
                                    uttaksgrunnlag={uttaksgrunnlag}
                                    uttaksinfo={uttaksinfo}
                                    synlig={perioderOpprettet}
                                />
                            </div>
                        )}
                </EkspanderbartInnhold>
                <DevBeregning
                    perioder={perioder}
                    uttaksgrunnlag={uttaksgrunnlag}
                />
                <DevHelper
                    familiehendelsedato={grunnlag.familiehendelsedato}
                    dekningsgrad={dekningsgrad || '100%'}
                    permisjonsregler={uttaksgrunnlag.permisjonsregler}
                    fellesperiodeukerForelder1={form.fellesperiodeukerForelder1}
                    fellesperiodeukerForelder2={form.fellesperiodeukerForelder2}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (appState: UttaksplanAppState): StateProps => {
    const { uttaksplan, form } = appState.uttaksplan;
    const dekningsgrad = form.dekningsgrad || '100%';
    const uttaksinfo = getUttaksinfo(uttaksplan.perioder);
    return {
        form,
        dekningsgrad,
        uttaksgrunnlag: uttaksplan.uttaksgrunnlag,
        uttaksinfo,
        perioder: uttaksplan.perioder
    };
};

export default connect(mapStateToProps)(injectIntl(UttaksplanMain));
