import React from 'react';
import { UttaksplanIkonProps } from '../types';

const FerieIkon = (props: UttaksplanIkonProps) => {
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
                <g stroke="#FFF" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M25.583 19.737h-5c-2.042 0-3.85.657-4.991 1.667m4.991-1.654l-2.763-6.973m-2.149-5.423l-.307-.774" />
                    <path
                        fill="#FFF"
                        d="M15.671 7.354c-4.065 1.61-6.704 4.571-5.517 7.566l.306.775 1.937-.769.468-1.081 1.082.468 7.747-3.07.467-1.082 1.082.467 1.937-.768-.307-.775c-1.188-2.995-5.138-3.342-9.202-1.731z"
                    />
                    <path d="M25.583 24.75c-.833 0-1.666-.747-1.666-1.667 0 .92-.834 1.667-1.667 1.667-.833 0-1.667-.747-1.667-1.667 0 .92-.833 1.667-1.666 1.667-.834 0-1.667-.747-1.667-1.667 0 .92-.833 1.667-1.667 1.667-.833 0-1.666-.747-1.666-1.667 0 .92-.834 1.667-1.667 1.667-.833 0-1.667-.747-1.667-1.667 0 .92-.833 1.667-1.666 1.667-.834 0-1.667-.747-1.667-1.667 0 .575-.386 1.083-.833 1.383" />
                </g>
            </g>
        </svg>
    );
};

export default FerieIkon;
