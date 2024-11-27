import classNames from 'classnames';

import styles from './step-button-wrapper.module.css';

type Props = {
    children: React.ReactNode;
};

export const StepButtonWrapper = ({ children }: Props) => {
    return <div className={classNames(styles.stepButtonWrapper)}>{children}</div>;
};
