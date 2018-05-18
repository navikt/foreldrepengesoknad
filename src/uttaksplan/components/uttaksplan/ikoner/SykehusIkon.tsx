import React, { SVGProps } from 'react';

const SykehusIkon = (props: SVGProps<any>) => (
    <svg width={24} height={24} viewBox="0 0 24 24" {...props}>
        <g
            fill="none"
            fillRule="evenodd"
            stroke="#3E3832"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M17.5 10.453V23.5m-11 0V10.437m11 13.063v-11h6v11m-23 0v-11h6v11m-6 0h23M18.5 7a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
            <path d="M15.5 5.5h-2l.001-2h-3l-.001 2h-2v3h2v2h3v-2h2zm-13 9h2m-2 2h2m-2 2h2m-2 2h2m15-6h2m-2 2h2m-2 2h2m-2 2h2m-13-5h1m-1 2h1m-1 2h1m2-4h1m-1 2h1m-1 2h1m2-4h1m-1 2h1m-1 2h1m-2 4h-3v-2h3z" />
        </g>
    </svg>
);

export default SykehusIkon;
