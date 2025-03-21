export interface OwnProps {
    size?: number;
}

const PengerIkon = ({ size = 48 }: OwnProps) => (
    <svg focusable="false" role="img" aria-hidden="true" viewBox="0 0 48 48" width={size} height={size}>
        <g fill="none" fillRule="evenodd">
            <path fill="#E3B0A8" d="M4 6h44v24H4z" />
            <path fill="#F1D8D4" d="M38.833 6h5.5v24h-5.5z" />
            <path fill="#C2EAF7" d="M2 8h44v24H2z" />
            <path fill="#E0F5FB" d="M36.833 8h5.5v24h-5.5z" />
            <path fill="#9BD0B0" d="M0 10h44v24H0z" />
            <path fill="#CDE7D8" d="M34.833 10h5.5v24h-5.5z" />
            <path
                fill="#117938"
                // eslint-disable-next-line max-len
                d="M5.5 20.955V13.82h1.109l4.29 5.603V13.82h1.036v7.136h-1.109l-4.29-5.608v5.608H5.5zm7.922-3.475c0-1.185.364-2.112 1.092-2.782.728-.67 1.668-1.006 2.82-1.006.753 0 1.433.158 2.038.472a3.287 3.287 0 0 1 1.385 1.317c.317.563.476 1.202.476 1.916 0 .723-.167 1.37-.502 1.942a3.215 3.215 0 0 1-1.42 1.297 4.53 4.53 0 0 1-1.983.44c-.77 0-1.456-.161-2.062-.486a3.329 3.329 0 0 1-1.376-1.329 3.614 3.614 0 0 1-.468-1.781zm1.114.014c0 .86.265 1.538.794 2.032.53.495 1.193.743 1.992.743.813 0 1.483-.25 2.008-.75.526-.5.789-1.209.789-2.127 0-.581-.113-1.088-.337-1.521a2.38 2.38 0 0 0-.986-1.008 2.967 2.967 0 0 0-1.457-.358c-.765 0-1.424.23-1.975.69-.552.458-.828 1.225-.828 2.3zm8.045 3.461V13.82h1.08v3.539l4.057-3.54h1.465l-3.426 2.892 3.576 4.245h-1.426L25 17.343l-1.337 1.14v2.472h-1.08z"
            />
            <circle cx={9.5} cy={35.5} r={7.5} fill="#FECB86" fillRule="nonzero" />
            <path
                fill="#F0F2F2"
                fillRule="nonzero"
                d="M20.5 43a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0-3.667a1.833 1.833 0 1 0 0-3.666 1.833 1.833 0 0 0 0 3.666z"
            />
        </g>
    </svg>
);

// eslint-disable-next-line import/no-default-export
export default PengerIkon;
