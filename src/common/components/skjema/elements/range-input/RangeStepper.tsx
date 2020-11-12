import * as React from 'react';
import Sirkelknapp from '../../../sirkelknapp/Sirkelknapp';

import './rangeStepper.less';
import RangeIcon from 'common/components/ikoner/RangeIcon';

export type Direction = 'next' | 'previous';

export interface Props {
    onClick: () => void;
    direction: Direction;
    label: string;
    disabled?: boolean;
}

const RangeStepper: React.FunctionComponent<Props> = ({ direction, onClick, label, disabled }) => (
    <Sirkelknapp
        stil="hvit"
        onClick={() => onClick()}
        ariaLabel={label}
        disabled={disabled}
        ikon={direction === 'previous' ? <RangeIcon type="minus" /> : <RangeIcon type="plus" />}
    />
);

export default RangeStepper;
