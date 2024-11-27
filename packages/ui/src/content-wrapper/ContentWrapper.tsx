import styles from './contentWrapper.module.css';

interface Props {
    children: React.ReactElement | React.ReactElement[];
}

export const ContentWrapper = ({ children }: Props) => {
    return <div className={styles.content}>{children}</div>;
};
