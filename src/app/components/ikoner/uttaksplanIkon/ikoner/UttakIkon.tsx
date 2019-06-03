import React from 'react';
import { UttaksplanIkonProps } from '../types';

const UttakIkon = (props: UttaksplanIkonProps) => {
    const { title, ...rest } = props;
    return (
        <svg
            focusable="false"
            role="presentation"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width={32}
            height={32}
            {...rest}>
            <title>{props.title}</title>
            <defs>
                <rect id="a" width={32} height={32} rx={10} />
            </defs>
            <g fill="none" fillRule="evenodd">
                <g transform="translate(6 6)">
                    <circle cx={14.583} cy={17.083} r={1.083} stroke="#FFF" strokeWidth={2} />
                    <circle cx={7.083} cy={17.083} r={1.083} stroke="#FFF" strokeWidth={2} />
                    <path
                        fill="#FFF"
                        d="M19.928 8.718c0 3.453-1.997 6.282-5.586 6.282H7.106c-2.586 0-4.682-2.21-4.682-4.936 0-.467.062-.918.176-1.346 3.038 0 14.084-.004 17.328 0zM13.886 2.5c3.734 0 6.042 2.836 6.042 5.385-1.835 0-4.85-.005-8.841-.005l2.8-5.38z"
                    />
                    <path
                        stroke="#FFF"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.107 9.612c0-2.314-1.218-3.962-2.678-3.962"
                    />
                </g>
            </g>
        </svg>
    );
};

export default UttakIkon;
