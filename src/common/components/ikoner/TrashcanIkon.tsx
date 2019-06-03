import React from 'react';

const TrashcanIkon = (props: any) => (
    <svg focusable="false" role="presentation" width="24" height="24" viewBox="0 0 24 24" {...props}>
        <path
            d="M3.516 3.5h16v20h-16zm4-3h8v3h-8zm-6.5 3h22M7.516 7v12m4-12v12m4-12v12"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit={10}
            fill="none"
        />
    </svg>
);

export default TrashcanIkon;
