import styles from './bluePanel.module.css';

interface Props {
    children: React.ReactElement | React.ReactElement[];
    isDarkBlue?: boolean;
    shouldFadeIn?: boolean;
}

const BluePanel: React.FunctionComponent<Props> = ({ children, isDarkBlue = false, shouldFadeIn = false }) => (
    <div
        className={`${styles.box} ${shouldFadeIn ? styles.animation : undefined} ${isDarkBlue ? styles.darkBlue : styles.blue}`}
    >
        {children}
    </div>
);

export default BluePanel;
