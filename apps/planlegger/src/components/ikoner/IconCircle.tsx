import { FunctionComponent, ReactElement } from 'react';

import styles from './ikonCircle.module.css';

type CircleColor = 'darkGreen' | 'mediumGreen' | 'green' | 'gray' | 'blue';

const getColor = (color: CircleColor) => {
    if (color === 'green') {
        return styles.green;
    }
    if (color === 'gray') {
        return styles.gray;
    }
    if (color === 'blue') {
        return styles.blue;
    }
    return color === 'mediumGreen' ? styles.mediumGreen : styles.darkGreen;
};

interface Props {
    children: ReactElement;
    color: CircleColor;
    size: 'medium' | 'xl';
}

const IconCircle: FunctionComponent<Props> = ({ children, color, size }) => {
    const circleSizeCss = size === 'medium' ? styles.mediumCircle : styles.xlCircle;

    return <div className={`${circleSizeCss} ${getColor(color)}`}>{children}</div>;
};

export default IconCircle;
