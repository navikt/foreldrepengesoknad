import React, { SVGProps } from 'react';

export interface OwnProps {
    type?: 'advarsel' | 'feil';
    title?: string;
}

type Props = OwnProps & SVGProps<any>;

const AdvarselIkonÅpen = (props: Props) => {
    const farge = props.type === 'feil' ? '#ba3a26' : '#ff9100';

    return (
        <svg height="1.5em" width="1.5em" viewBox="0 0 23 23" {...props}>
            <title>{props.title}</title>
            <g fill="none" fillRule="evenodd" stroke={farge} strokeLinejoin="round">
                <path d="M11.5 15.805V8.154m11 14.346H.5l11-22z" strokeLinecap="round" />
                <path d="M12 19a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
            </g>
        </svg>
    );
};

export default AdvarselIkonÅpen;
