import * as React from 'react';

import RangeIcon from 'common/components/ikoner/RangeIcon';
import Sirkelknapp from 'common/components/sirkelknapp/Sirkelknapp';

export type Direction = 'next' | 'previous';

export interface Props {
    onClick: () => void;
    direction: Direction;
    label: string;
    disabled?: boolean;
}

const StepperKnapp: React.FunctionComponent<Props> = ({ direction, onClick, label, disabled }) => (
    <Sirkelknapp
        stil="hvit"
        onClick={() => onClick()}
        ariaLabel={label}
        disabled={disabled}
        ikon={direction === 'previous' ? <RangeIcon type="minus" /> : <RangeIcon type="plus" />}
    />
);

export default StepperKnapp;
