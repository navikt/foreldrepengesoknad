import { FunctionComponent, ReactNode } from 'react';

import styles from './iconCircleWrapper.module.css';

type CircleColor = 'darkGreen' | 'mediumGreen' | 'green' | 'gray' | 'blue' | 'lightBlue' | 'darkBlue';
type CircleSize = 'medium' | 'large' | 'xl';

const getColor = (color: CircleColor): string => {
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
    if (color === 'darkBlue') {
        return styles.darkBlue;
    }
    return color === 'mediumGreen' ? styles.mediumGreen : styles.darkGreen;
};
const getSize = (size: CircleSize): string => {
    if (size === 'medium') {
        return styles.mediumCircle;
    }

    return size === 'large' ? styles.largeCircle : styles.xlCircle;
};

interface Props {
    children: ReactNode;
    color: CircleColor;
    size: CircleSize;
}

const IconCircleWrapper: FunctionComponent<Props> = ({ children, color, size }) => (
    //Den ytre div'en ligg der for at bredden på denne alltid skal fungera i HStack
    <div>
        <div className={`${getSize(size)} ${getColor(color)}`}>{children}</div>
    </div>
);

export default IconCircleWrapper;
