const UtbetalingerIkon = (props: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { title, ...rest } = props;
    return (
        <svg focusable="false" role="img" aria-hidden="true" width={46} height={37} {...rest}>
            <g transform="translate(0 -6)" fill="none" fillRule="evenodd">
                <path fill="#E3B0A8" d="M3.538 6.708H46v23.048H3.538z" />
                <path fill="#F1D8D4" d="M37.153 6.708h5.308v23.048h-5.308z" />
                <path fill="#C2EAF7" d="M1.77 8.481H44.23V31.53H1.77z" />
                <path fill="#E0F5FB" d="M35.384 8.481h5.308V31.53h-5.308z" />
                <path fill="#9BD0B0" d="M0 10.254h42.462v23.048H0z" />
                <path fill="#CDE7D8" d="M33.615 10.254h5.308v23.048h-5.308z" />
                <path
                    // eslint-disable-next-line max-len
                    d="M5.308 20.775v-6.853h1.07l4.14 5.38v-5.38h1v6.853h-1.07l-4.14-5.386v5.386h-1zm7.645-3.338c0-1.138.351-2.028 1.054-2.672.702-.643 1.609-.965 2.72-.965.728 0 1.384.151 1.968.453.584.303 1.03.724 1.336 1.265.306.54.46 1.154.46 1.84 0 .695-.162 1.316-.484 1.865-.323.548-.78.964-1.371 1.246a4.389 4.389 0 0 1-1.914.423c-.742 0-1.405-.156-1.99-.468a3.205 3.205 0 0 1-1.328-1.276 3.457 3.457 0 0 1-.451-1.711zm1.075.014c0 .826.255 1.476.766 1.952.511.475 1.152.713 1.922.713.785 0 1.431-.24 1.938-.72.508-.48.761-1.161.761-2.043 0-.558-.108-1.045-.325-1.461a2.29 2.29 0 0 0-.952-.968 2.874 2.874 0 0 0-1.406-.343c-.738 0-1.373.22-1.905.661-.533.441-.799 1.177-.799 2.209zm7.764 3.324v-6.853h1.043v3.398l3.914-3.398h1.414l-3.307 2.776 3.452 4.077H26.93l-2.806-3.469-1.29 1.094v2.375h-1.043z"
                    fill="#117938"
                />
                <ellipse fill="#FECB86" fillRule="nonzero" cx={8.846} cy={35.075} rx={7.077} ry={7.092} />
                <path
                    // eslint-disable-next-line max-len
                    d="M19.462 42.167a5.313 5.313 0 0 1-5.308-5.32 5.313 5.313 0 0 1 5.308-5.318 5.313 5.313 0 0 1 5.307 5.319 5.313 5.313 0 0 1-5.307 5.319zm0-3.546c.977 0 1.769-.794 1.769-1.773 0-.98-.792-1.773-1.77-1.773-.977 0-1.769.794-1.769 1.773 0 .98.792 1.773 1.77 1.773z"
                    fill="#F0F2F2"
                    fillRule="nonzero"
                />
            </g>
        </svg>
    );
};

export default UtbetalingerIkon;
