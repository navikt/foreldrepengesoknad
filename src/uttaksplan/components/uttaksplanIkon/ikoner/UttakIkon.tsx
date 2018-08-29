import React, { SVGProps } from 'react';

const UttakIkon = (props: SVGProps<any>) => (
    <svg width={24} height={24} viewBox="0 0 24 24" {...props}>
        <g fill="none" fillRule="evenodd" stroke="#3E3832" strokeLinejoin="round">
            <path d="M4.701 22.44H.534v-8.378h4.167z" />
            <path
                strokeLinecap="round"
                d="M4.7 20.833c10.938 3.646 7.292 3.646 19.792-2.604-1.107-1.106-1.98-1.368-3.125-1.042L16.75 18.72"
            />
            <path
                strokeLinecap="round"
                d="M4.7 15.104h3.126c2.45 0 4.166 1.563 4.687 2.084h3.125c1.66 0 1.66 2.083 0 2.083H9.91m5.207-15.625a3.125 3.125 0 1 0 6.25 0 3.125 3.125 0 0 0-6.25 0zM9.91 10.938a3.125 3.125 0 1 0 6.249 0 3.125 3.125 0 0 0-6.25 0zm3.124-1.042v2.083m5.208-9.375v2.084"
            />
        </g>
    </svg>
);

export default UttakIkon;
