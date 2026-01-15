import { ReactNode } from 'react';

export type CircleColor = 'darkGreen' | 'mediumGreen' | 'green' | 'gray' | 'blue' | 'lightBlue' | 'darkBlue';
type CircleSize = 'medium' | 'large' | 'xl';

const getColor = (color: CircleColor): string => {
    if (color === 'green') {
        return 'bg-ax-meta-lime-300';
    }
    if (color === 'gray') {
        return 'bg-ax-neutral-400';
    }
    if (color === 'blue' || color === 'lightBlue') {
        return 'bg-ax-brand-blue-400';
    }
    if (color === 'darkBlue') {
        return 'bg-ax-brand-blue-600';
    }
    return 'bg-ax-meta-lime-400';
};
const getSize = (size: CircleSize): string => {
    if (size === 'medium') {
        return 'rounded-full flex justify-center items-center h-8 w-8';
    }

    return size === 'large'
        ? 'rounded-full flex justify-center items-center h-10 w-10'
        : 'rounded-full flex justify-center items-center h-16 w-16';
};

interface Props {
    children: ReactNode;
    color: CircleColor;
    size: CircleSize;
}

export const IconCircleWrapper = ({ children, color, size }: Props) => (
    //Den ytre div'en ligg der for at bredden på denne alltid skal fungera i HStack
    <div>
        <div className={`${getSize(size)} ${getColor(color)}`}>{children}</div>
    </div>
);
