import * as React from 'react';

const AdvarselIkon = (props: any) => (
    <svg
        focusable="false"
        role="presentation"
        xmlns="http://www.w3.org/2000/svg"
        width="80"
        height="80"
        viewBox="0 0 80 80"
        {...props}>
        <g fill="none" fillRule="evenodd">
            <circle cx="40" cy="40" r="40" fill="#FFBD66" />
            <path
                fill="#3E3832"
                d="M36 20a4 4 0 1 1 8 0v25.002a4 4 0 1 1-8 0V20zm4 44a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z"
            />
        </g>
    </svg>
);

export default AdvarselIkon;
