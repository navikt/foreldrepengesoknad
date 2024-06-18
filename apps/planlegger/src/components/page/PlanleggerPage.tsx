import { ReactNode } from 'react';

import styles from './planleggerPage.module.css';

interface Props {
    header: ReactNode;
    children: React.ReactElement | React.ReactElement[];
}

const PlanleggerPage: React.FunctionComponent<Props> = ({ header, children }) => {
    return (
        <div className={styles.pageContent}>
            <div className={styles.header}>{header}</div>
            <div className={styles.content}>{children}</div>
        </div>
    );
};

export default PlanleggerPage;
