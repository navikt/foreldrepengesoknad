import classNames from 'classnames';
import bemUtils from './../../utils/bemUtils';
import './step-button-wrapper.css';

type Props = {
    children: React.ReactNode;
    lastStep?: boolean;
};

const StepButtonWrapper: React.FunctionComponent<Props> = ({ children, lastStep = false }) => {
    const bem = bemUtils('step-button-wrapper');

    return <div className={classNames(bem.block, lastStep ? bem.modifier('last-step') : undefined)}>{children}</div>;
};

export default StepButtonWrapper;
