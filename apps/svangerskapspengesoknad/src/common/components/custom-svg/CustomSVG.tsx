import React from 'react';

export interface IconRef {
    id: string;
    viewBox: string;
}

interface Props {
    iconRef: IconRef;
    size?: number;
    className?: string;
}

const CustomSVGFromSprite: React.FunctionComponent<Props> = ({ iconRef, size, className, ...other }) => {
    if (!iconRef) {
        return null;
    }

    const viewBox = { 'view-box': iconRef.viewBox };
    return (
        <svg className={className} height={size} width={size} {...viewBox} {...other}>
            <use xlinkHref={`#${iconRef.id}`} />
        </svg>
    );
};

export default CustomSVGFromSprite;
