import React, { FunctionComponent } from 'react';

interface IconRef {
    id: string;
    viewBox: string;
}

interface Props {
    iconRef: IconRef;
    height?: number;
    width?: number | string;
    className?: string;
}

const FlexibleSvg: FunctionComponent<Props> = ({ iconRef, height, width, className, ...other }) => {
    const viewBox = { 'view-box': iconRef.viewBox };
    return (
        <svg
            focusable="false"
            role="presentation"
            className={className}
            height={height}
            width={width}
            {...viewBox}
            {...other}
        >
            <use xlinkHref={`#${iconRef.id}`} />
        </svg>
    );
};
export default FlexibleSvg;
