import * as React from 'react';
import Chevron from 'nav-frontend-chevron';

import './rangeStepper.less';
import Sirkelknapp from 'common/components/sirkelknapp/Sirkelknapp';

export type Direction = 'next' | 'previous';

export interface Props {
    onClick: () => void;
    direction: Direction;
    label: string;
    disabled?: boolean;
}

const RangeStepper: React.StatelessComponent<Props> = ({ direction, onClick, label, disabled }) => (
    <Sirkelknapp
        size="stor"
        stil="hvit"
        onClick={() => onClick()}
        ariaLabel={label}
        disabled={disabled}
        ikon={
            <Chevron
                type={direction === 'previous' ? 'venstre' : 'høyre'}
                className={`rangeStepper__chevron--${direction}`}
            />
        }
    />
);

export default RangeStepper;
