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
    opprettPerioder,
    initUttaksplan
} from 'uttaksplan/redux/actions';
import UttaksplanSkjema from 'uttaksplan/skjema/uttaksplanSkjema/UttaksplanSkjema';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import DevHelper from 'uttaksplan/main/dev/DevToolbar';
import {
    Uttaksgrunnlag,
    Uttaksdatoer,
    UttaksplanAppProps
} from 'uttaksplan/types/uttaksgrunnlag';

import '../styles/uttaksplan.less';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import EkspanderbartInnhold from 'common/components/ekspanderbart-innhold/EkspanderbartInnhold';
import DevBeregning from 'uttaksplan/main/dev/DevBeregning';
import Periodeplanlegger from 'uttaksplan/main/Periodeplanlegger';

export interface StateProps {
    form: UttaksplanFormState;
    dekningsgrad: Dekningsgrad;
    uttaksgrunnlag?: Uttaksgrunnlag;
    uttaksdatoer?: Uttaksdatoer;
    perioder: Periode[];
    manuellUttaksplan?: boolean;
}

interface OwnProps {
    grunnlag: UttaksplanAppProps;
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
            JSON.stringify(nextProps.grunnlag)
        ) {
            this.resetUttaksplan(nextProps.grunnlag, nextProps.dekningsgrad);
        }
    }

    resetUttaksplan(grunnlag: UttaksplanAppProps, dekningsgrad: Dekningsgrad) {
        this.props.dispatch(initUttaksplan(grunnlag, dekningsgrad));
    }

    opprettPerioder() {
        const { grunnlag, dispatch, uttaksgrunnlag, form } = this.props;
        const { dekningsgrad } = form;
        const { fellesperiodeukerForelder1, fellesperiodeukerForelder2 } = form;

        if (dekningsgrad && uttaksgrunnlag) {
            dispatch(
                opprettPerioder(
                    grunnlag.termindato,
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
            grunnlag,
            perioder,
            uttaksdatoer,
            uttaksgrunnlag,
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
                    erApen={perioderOpprettet}>
                    {perioderOpprettet && (
                        <div className="tidsplan">
                            <Periodeplanlegger
                                perioder={perioder}
                                uttaksgrunnlag={uttaksgrunnlag}
                                synlig={perioderOpprettet}
                            />
                        </div>
                    )}
                </EkspanderbartInnhold>
                <DevBeregning
                    uttaksdatoer={uttaksdatoer}
                    uttaksgrunnlag={uttaksgrunnlag}
                />
                <DevHelper
                    termindato={grunnlag.termindato}
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

    return {
        form,
        dekningsgrad,
        uttaksgrunnlag: uttaksplan.uttaksgrunnlag,
        uttaksdatoer: uttaksplan.uttaksdatoer,
        perioder: uttaksplan.perioder
    };
};

export default connect(mapStateToProps)(injectIntl(UttaksplanMain));
