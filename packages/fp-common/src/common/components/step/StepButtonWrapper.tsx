import classNames from 'classnames';
import bemUtils from './../../utils/bemUtils';
import './step-button-wrapper.css';

type Props = {
    children: React.ReactNode;
    lastStep?: boolean;
    singleButton?: boolean;
};

const StepButtonWrapper: React.FunctionComponent<Props> = ({ children, lastStep = false, singleButton = false }) => {
    const bem = bemUtils('step-button-wrapper');

    return (
        <div
            className={classNames(
                bem.block,
                lastStep ? bem.modifier('last-step') : undefined,
                singleButton ? bem.modifier('single-button') : undefined,
            )}
        >
            {children}
        </div>
    );
};

export default StepButtonWrapper;
