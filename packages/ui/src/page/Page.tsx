import { ReactNode } from 'react';

import styles from './page.module.css';

interface Props {
    header: ReactNode;
    children: React.ReactElement | React.ReactElement[];
}

export const Page = ({ header, children }: Props) => {
    return (
        <div className={styles.pageContent}>
            <div className={styles.header}>{header}</div>
            <div className={styles.content}>{children}</div>
        </div>
    );
};
