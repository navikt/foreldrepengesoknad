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

interface StateProps {
    stegProps: StegProps;
    søknad: Søknad;
    person: Person;
}

type Props = StateProps & DispatchProps & SøkerinfoProps & HistoryProps;

class UttaksplanSteg extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return <Steg {...this.props.stegProps}>Uttaksplan</Steg>;
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
        stegProps
    };
};

export default connect<StateProps, {}, {}>(mapStateToProps)(UttaksplanSteg);
