import * as React from 'react';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { DispatchProps } from 'common/redux/types';
import { Periode, Periodetype } from 'uttaksplan/types';
import PeriodeTimeline from 'uttaksplan/components/periodeTimeline/PeriodeTimeline';
import UttaksperiodeDialog from 'uttaksplan/connectedComponents/uttaksperiodeDialog/UttaksperiodeDialog';
import UtsettelsesperiodeDialog from 'uttaksplan/connectedComponents/utsettelsesperiodeDialog/UtsettelsesperiodeDialog';
import { visPeriodeDialog } from 'uttaksplan/redux/actions';
import Knapperad from 'common/components/knapperad/Knapperad';
import { Knapp } from 'nav-frontend-knapper';
import { Uttaksgrunnlag } from 'uttaksplan/utils/uttak/uttaksgrunnlag';
import { Uttaksinfo } from 'uttaksplan/utils/uttak/uttaksinfo';

interface StateProps {
    perioder: Periode[];
    uttaksgrunnlag: Uttaksgrunnlag;
    uttaksinfo: Uttaksinfo;
    synlig: boolean;
}

export type Props = DispatchProps & StateProps & InjectedIntlProps;

class Periodeplanlegger extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        this.handlePeriodeClick = this.handlePeriodeClick.bind(this);
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

    render() {
        const { dispatch, uttaksgrunnlag, uttaksinfo, perioder } = this.props;
        const { familiehendelsedato, dekningsgrad } = uttaksgrunnlag;
        return (
            <div>
                <div className="blokkPad-m">
                    <h2 className="tidsplan__tittel">Planen</h2>
                    <p className="blokkPad-s">
                        Du kan endre periodene ved å velge dem, eller legge til
                        nye perioder og/eller utsettelser.
                    </p>
                    <PeriodeTimeline
                        familiehendelsedato={familiehendelsedato}
                        dekningsgrad={dekningsgrad}
                        perioder={perioder}
                        uttaksgrunnlag={uttaksgrunnlag}
                        uttaksinfo={uttaksinfo}
                        onPeriodeClick={this.handlePeriodeClick}
                    />
                </div>
                <div>
                    <div className="m-textCenter">
                        <Knapperad>
                            <Knapp
                                htmlType="button"
                                onClick={() =>
                                    dispatch(
                                        visPeriodeDialog(Periodetype.Uttak)
                                    )
                                }>
                                Legg til periode
                            </Knapp>
                            <Knapp
                                htmlType="button"
                                onClick={() =>
                                    dispatch(
                                        visPeriodeDialog(Periodetype.Utsettelse)
                                    )
                                }>
                                Legg til utsettelse
                            </Knapp>
                        </Knapperad>
                    </div>
                </div>

                <UttaksperiodeDialog
                    uttaksgrunnlag={uttaksgrunnlag}
                    familiehendelsedato={familiehendelsedato}
                    dekningsgrad={dekningsgrad}
                />

                <UtsettelsesperiodeDialog
                    navnForelder1={uttaksgrunnlag.søker.fornavn}
                    navnForelder2={
                        uttaksgrunnlag.annenForelder
                            ? uttaksgrunnlag.annenForelder.fornavn
                            : 'Forelder 2'
                    }
                    familiehendelsedato={familiehendelsedato}
                    permisjonsregler={uttaksgrunnlag.permisjonsregler}
                    uttaksinfo={uttaksinfo}
                />
            </div>
        );
    }
}

export default connect()(injectIntl(Periodeplanlegger));
