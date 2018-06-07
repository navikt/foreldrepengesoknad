import React, { SVGProps } from 'react';

const ArbeidIkon = (props: SVGProps<any>) => (
    <svg width={24} height={24} viewBox="0 0 24 24" {...props}>
        <g
            fill="none"
            fillRule="evenodd"
            stroke="#3E3832"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M11.5 23.5H.5v-14h11zm-2-20h-7v6h7zm-4 0v-3m18 23h-9v-18h9zm-7-16h5m-5 2h5m-5 2h5m-5 2h5m-5 2h5m-5 2h5m-5 2h5m-19-7h7m-7 3h7m-7 3h7m-5-13h3m-3 2h3" />
            <path d="M6.5 21.5h-2v2h2zm14 0h-2v2h2z" />
        </g>
    </svg>
);

export default ArbeidIkon;
