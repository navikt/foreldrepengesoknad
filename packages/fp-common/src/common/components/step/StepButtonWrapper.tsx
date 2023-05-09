import bemUtils from './../../utils/bemUtils';
import './step-button-wrapper.css';

type Props = {
    children: React.ReactNode;
};

const StepButtonWrapper: React.FunctionComponent<Props> = ({ children }) => {
    const bem = bemUtils('step-button-wrapper');

    return <div className={bem.block}>{children}</div>;
};

export default StepButtonWrapper;
