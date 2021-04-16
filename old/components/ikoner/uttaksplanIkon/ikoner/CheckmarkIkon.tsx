import * as React from 'react';

const CheckmarkIkon = (props: any) => (
    <svg focusable="false" role="presentation" width={24} height={24} {...props}>
        <g fill="none" fillRule="evenodd">
            <path
                fill="#1C6937"
                d="M12 .5C18.34.5 23.5 5.66 23.5 12S18.34 23.5 12 23.5C5.659 23.5.5 18.341.5 12S5.659.5 12 .5z"
            />
            <path
                fill="#FFF"
                d="M16.329 7.76a1 1 0 1 1 1.363 1.464l-7.52 7.007a1 1 0 0 1-1.388-.024L6.28 13.709a1 1 0 0 1 1.413-1.416l1.82 1.817 6.816-6.35z"
            />
        </g>
    </svg>
);

export default CheckmarkIkon;
