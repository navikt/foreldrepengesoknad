import React from 'react';
import { UttaksplanIkonProps } from '../types';

const TerminIkon = (props: UttaksplanIkonProps) => (
    <svg width={24} height={24} viewBox="0 0 24 24" {...props}>
        <title>{props.title}</title>
        <path
            fill="none"
            fillRule="evenodd"
            stroke="#3E3832"
            strokeLinejoin="round"
            d="M12 22.993s10.5-8.128 10.5-15.82-9.316-8.284-10.5-.59C10.816-1.112 1.5-.52 1.5 7.764S12 22.993 12 22.993z"
        />
    </svg>
);

export default TerminIkon;
