import * as React from 'react';

const KalenderBakgrunnIkon = (props: any) => (
    <svg focusable="false" role="presentation" width={48} height={42} {...props}>
        <g fill="none" fillRule="evenodd">
            <path d="M48 36a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6V7h48v29z" fill="#FFF" stroke="#dfdfdf" strokeWidth="1" />
            <path
                d="M6 0h36a6 6 0 0 1 6 6v4H0V6a6 6 0 0 1 6-6zm29.5 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-23 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
                fill="#BA3A26"
            />
        </g>
    </svg>
);

export default KalenderBakgrunnIkon;
