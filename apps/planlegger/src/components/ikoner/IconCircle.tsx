import { FunctionComponent, ReactElement } from 'react';

import styles from './ikonCircle.module.css';

type CircleColor = 'darkGreen' | 'mediumGreen' | 'green' | 'gray' | 'blue' | 'lightBlue';
type CircleSize = 'medium' | 'large' | 'xl';

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
    if (color === 'lightBlue') {
        return styles.lightBlue;
    }
    return color === 'mediumGreen' ? styles.mediumGreen : styles.darkGreen;
};
const getSize = (size: CircleSize) => {
    if (size === 'medium') {
        return styles.mediumCircle;
    }

    return size === 'large' ? styles.largeCircle : styles.xlCircle;
};

interface Props {
    children: ReactElement;
    color: CircleColor;
    size: CircleSize;
}

const IconCircle: FunctionComponent<Props> = ({ children, color, size }) => {
    return <div className={`${getSize(size)} ${getColor(color)}`}>{children}</div>;
};

export default IconCircle;
