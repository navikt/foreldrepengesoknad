import React from 'react';

export type StatusKey = 'suksess' | 'advarsel' | 'feil';

export interface OwnProps {
    status: StatusKey;
    title?: string;
    size?: number;
}

type Props = OwnProps;

const FeilSirkelFyll: React.FunctionComponent<Props> = (props) => {
    return (
        <svg role="img" aria-hidden="true" focusable="false" viewBox="0 0 24 24" width={props.size} height={props.size}>
            <g fill="none" fillRule="evenodd">
                <path
                    d="M11.999 0C5.395 0 .013 5.372 0 11.976a11.923 11.923 0 0 0 3.498 8.493A11.925 11.925 0 0 0 11.977 24H12c6.603 0 11.986-5.373 12-11.978C24.013 5.406 18.64.012 11.999 0z"
                    fillRule="nonzero"
                    fill="#A13A28"
                />
                <path
                    d="M12 10.651l3.372-3.372a.954.954 0 1 1 1.349 1.35L13.349 12l3.372 3.372a.954.954 0 1 1-1.35 1.349L12 13.349 8.628 16.72a.954.954 0 1 1-1.349-1.35L10.651 12 7.28 8.628A.954.954 0 1 1 8.63 7.28L12 10.651z"
                    fill="#FFF"
                    fillRule="nonzero"
                />
            </g>
        </svg>
    );
};

const InfoSirkelFyll: React.FunctionComponent<Props> = (props) => {
    return (
        <svg role="img" aria-hidden="true" focusable="false" viewBox="0 0 24 24" width={props.size} height={props.size}>
            {props.title && <title>{props.title}</title>}
            <g fill="none" fillRule="evenodd">
                <path
                    d="M12.205-.004l-.214.002a12.225 12.225 0 0 0-8.517 3.659C1.179 5.977-.053 9.013.002 12.208c.115 6.613 5.296 11.793 11.795 11.793l.212-.002c6.726-.116 12.105-5.595 11.99-12.21C23.883 5.178 18.702-.003 12.204-.003z"
                    fill="#FFA733"
                    fillRule="nonzero"
                />
                <path d="M12.027 19H12A1.499 1.499 0 0 1 11.973 16L12 16a1.501 1.501 0 0 1 .027 3z" fill="#3E3832" />
                <path d="M12 5a1 1 0 0 1 1 1v7a1 1 0 0 1-2 0V6a1 1 0 0 1 1-1z" fill="#3E3832" fillRule="nonzero" />
            </g>
        </svg>
    );
};

const OkSirkelFyll: React.FunctionComponent<Props> = (props) => {
    return (
        <svg role="img" aria-hidden="true" focusable="false" viewBox="0 0 24 24" width={props.size} height={props.size}>
            <g fillRule="nonzero" fill="none">
                <path
                    d="M12 0C5.383 0 0 5.384 0 12s5.383 12 12 12c6.616 0 12-5.384 12-12S18.616 0 12 0z"
                    fill="#1C6937"
                />
                <path
                    d="M9.64 14.441l6.46-5.839a.997.997 0 0 1 1.376.044.923.923 0 0 1-.046 1.334l-7.15 6.464a.993.993 0 0 1-.662.252.992.992 0 0 1-.69-.276l-2.382-2.308a.923.923 0 0 1 0-1.334.997.997 0 0 1 1.377 0l1.717 1.663z"
                    fill="#FFF"
                />
            </g>
        </svg>
    );
};

const StatusIkon = (props: Props) => {
    const { size = 24 } = props;
    switch (props.status) {
        case 'suksess':
            return <OkSirkelFyll {...props} size={size} />;
        case 'feil':
            return <FeilSirkelFyll {...props} size={size} />;
        case 'advarsel':
            return <InfoSirkelFyll {...props} size={size} />;
    }
};

export default StatusIkon;
