import * as React from 'react';
import { connect } from 'react-redux';
import { StegID } from '../../../util/routing/stegConfig';
import { default as Steg, StegProps } from '../../../components/steg/Steg';
import { AppState } from '../../../redux/reducers';
import Søknad from '../../../types/søknad/Søknad';
import { DispatchProps } from 'common/redux/types';
import Person from '../../../types/Person';
import { SøkerinfoProps } from '../../../types/søkerinfo';
import { HistoryProps } from '../../../types/common';
import { lagMockUttaksplan } from '../../../util/uttaksplan/forslag/mockUttaksplan';
import søknadActionCreators from '../../../redux/actions/s\u00F8knad/s\u00F8knadActionCreators';
import { Periode } from '../../../types/uttaksplan/periodetyper';

interface StateProps {
    stegProps: StegProps;
    søknad: Søknad;
    person: Person;
    perioder: Periode[];
}

type Props = StateProps & DispatchProps & SøkerinfoProps & HistoryProps;

class UttaksplanSteg extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        const mockPerioder = lagMockUttaksplan(this.props.søknad);
        this.props.dispatch(søknadActionCreators.updateUttaksplan(mockPerioder));
    }

    render() {
        return (
            <Steg {...this.props.stegProps}>
                <h1>Uttaksplan</h1>
                {this.props.perioder.map((p) => (
                    <div key={p.id}>
                        Type: {p.type}
                        Fra: {p.tidsperiode.fom.toDateString()}
                        Til: {p.tidsperiode.tom.toDateString()},
                    </div>
                ))}
            </Steg>
        );
    }
}

const mapStateToProps = (state: AppState, props: HistoryProps & SøkerinfoProps): StateProps => {
    const { søknad } = state;
    const { history } = props;

    const stegProps: StegProps = {
        id: StegID.UTTAKSPLAN,
        renderFortsettKnapp: true,
        history
    };

    return {
        søknad,
        person: props.søkerinfo.person,
        stegProps,
        perioder: søknad.uttaksplan
    };
};

export default connect<StateProps, {}, {}>(mapStateToProps)(UttaksplanSteg);
