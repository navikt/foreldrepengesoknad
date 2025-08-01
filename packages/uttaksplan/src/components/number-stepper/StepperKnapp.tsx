import RangeIcon from '../../assets/RangeIcon';
import Sirkelknapp from '../sirkelknapp/Sirkelknapp';

type Direction = 'next' | 'previous';

interface Props {
    onClick: () => void;
    direction: Direction;
    label: string;
    disabled?: boolean;
}
// eslint-disable-next-line @typescript-eslint/no-restricted-types
const StepperKnapp: React.FunctionComponent<Props> = ({ direction, onClick, label, disabled }) => (
    <Sirkelknapp
        stil="hvit"
        onClick={() => onClick()}
        ariaLabel={label}
        disabled={disabled}
        ikon={direction === 'previous' ? <RangeIcon type="minus" /> : <RangeIcon type="plus" />}
    />
);
// eslint-disable-next-line import/no-default-export
export default StepperKnapp;
