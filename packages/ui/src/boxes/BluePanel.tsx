import styles from './bluePanel.module.css';

interface Props {
    children: React.ReactElement | React.ReactElement[];
    isDarkBlue?: boolean;
    shouldFadeIn?: boolean;
}

export const BluePanel = ({ children, isDarkBlue = false, shouldFadeIn = false }: Props) => (
    <div
        className={`${styles.box} ${shouldFadeIn ? styles.animation : undefined} ${isDarkBlue ? styles.darkBlue : styles.blue}`}
    >
        {children}
    </div>
);
