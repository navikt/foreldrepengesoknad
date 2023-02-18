import React from 'react';
import RangeIcon from 'uttaksplan/assets/RangeIcon';
import Sirkelknapp from '../sirkelknapp/Sirkelknapp';

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
