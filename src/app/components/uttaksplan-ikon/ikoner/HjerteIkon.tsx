import React from 'react';
import { UttaksplanIkonProps } from '../types';

interface OwnProps {
    fylt?: boolean;
}

const HjerteIkon = (props: UttaksplanIkonProps & OwnProps) => {
    const { title, fylt, ...rest } = props;
    return fylt ? (
        <svg focusable="false" role="presentation" width={24} height={24} {...rest}>
            <title>{title}</title>
            <path
                fill="#ba3a26"
                fillRule="evenodd"
                d="M23 7.173c0 .41-.028.823-.083 1.243-.418 3.173-2.345 6.521-5.291 9.882a43.405 43.405 0 0 1-4.856 4.717c-.22.181-.378.307-.464.374a.5.5 0 0 1-.582.021 16.293 16.293 0 0 1-.467-.325 35.073 35.073 0 0 1-4.87-4.255C3.027 15.28 1 11.544 1 7.765 1-.286 9.586-1.719 12.003 4.612 14.42-1.616 23-.464 23 7.173z"
            />
        </svg>
    ) : (
        <svg focusable="false" role="presentation" width={24} height={24} viewBox="0 0 24 24" {...rest}>
            <title>{title}</title>
            <path
                fill="none"
                fillRule="evenodd"
                stroke="#3E3832"
                strokeLinejoin="round"
                d="M12 22.993s10.5-8.128 10.5-15.82-9.316-8.284-10.5-.59C10.816-1.112 1.5-.52 1.5 7.764S12 22.993 12 22.993z"
            />
        </svg>
    );
};
export default HjerteIkon;
