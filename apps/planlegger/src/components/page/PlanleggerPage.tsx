import { ReactNode } from 'react';

import styles from './planleggerPage.module.css';

interface Props {
    header: ReactNode;
    useLargerBorderRadius?: boolean;
    children: React.ReactElement | React.ReactElement[];
}

const PlanleggerPage: React.FunctionComponent<Props> = ({ header, useLargerBorderRadius = false, children }) => {
    return (
        <div className={styles.pageContent}>
            <div className={styles.header}>{header}</div>
            <div className={`${styles.content} ${useLargerBorderRadius ? styles.contentBorder : undefined} `}>
                {children}
            </div>
        </div>
    );
};

export default PlanleggerPage;
