import * as React from 'react';
import { connect } from 'react-redux';
import { visInfo, skjulInfo } from 'uttaksplan/redux/actions';
import { DispatchProps } from 'common/redux/types';
import { UttaksplanAppState } from 'uttaksplan/redux/types';
import Sirkelknapp from 'common/components/sirkelknapp/Sirkelknapp';
import LukkInfoIkon from 'uttaksplan/components/ikoner/LukkInfoIkon';
import InfoIkon from 'uttaksplan/components/ikoner/InfoIkon';

interface OwnProps {
    id: string;
    label: string;
}

interface StateProps {
    isOpen: boolean;
}

type Props = OwnProps & StateProps & DispatchProps;

class VeilederinfoKnappContainer extends React.Component<Props, {}> {
    render() {
        const { id, label, isOpen, dispatch } = this.props;
        return (
            <Sirkelknapp
                stil="info"
                label={label}
                ikon={isOpen ? <LukkInfoIkon /> : <InfoIkon />}
                toggle={{ pressed: isOpen }}
                onClick={() => dispatch(isOpen ? skjulInfo(id) : visInfo(id))}
            />
        );
    }
}

export default connect<StateProps, {}, OwnProps>(
    (state: UttaksplanAppState, props: OwnProps): StateProps => ({
        isOpen: state.uttaksplan.view.synligInfo.has(props.id)
    })
)(VeilederinfoKnappContainer);
