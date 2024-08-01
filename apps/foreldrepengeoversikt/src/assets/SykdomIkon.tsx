const SykdomIkon = (props: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { title, ...rest } = props;
    return (
        <svg
            focusable="false"
            role="presentation"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width={32}
            height={32}
            {...rest}
        >
            <title>{props.title}</title>
            <defs>
                <rect id="a" width={32} height={32} rx={10} />
                <path
                    id="c"
                    // eslint-disable-next-line max-len
                    d="M8.294 1.518l10.19 10.19c1.823 1.822 1.785 4.82-.086 6.69s-4.867 1.91-6.69.086L1.518 8.294c-1.823-1.822-1.786-4.818.086-6.69 1.872-1.871 4.867-1.91 6.69-.086zm6.27 7.4l-3.473-3.476-5.648 5.647 3.475 3.476 5.646-5.648zM3.258 6.65a.472.472 0 0 0-.138.339.499.499 0 0 0 .49.489A.472.472 0 0 0 4.085 7a.497.497 0 0 0-.489-.489.472.472 0 0 0-.34.138zM4.96 4.963a.47.47 0 0 0-.137.34.498.498 0 0 0 .488.488.47.47 0 0 0 .476-.476.496.496 0 0 0-.488-.488.466.466 0 0 0-.34.136zm-2.005-.31a.468.468 0 0 0-.138.338.499.499 0 0 0 .49.49.47.47 0 0 0 .476-.478.497.497 0 0 0-.489-.489.468.468 0 0 0-.34.138zm1.694-1.694a.472.472 0 0 0-.138.34.496.496 0 0 0 .488.487.467.467 0 0 0 .477-.477.496.496 0 0 0-.488-.488.472.472 0 0 0-.34.138zm.622 4.009a.47.47 0 0 0-.136.34.496.496 0 0 0 .489.488.466.466 0 0 0 .476-.476.498.498 0 0 0-.488-.489.474.474 0 0 0-.341.137zm1.694-1.693a.472.472 0 0 0-.138.34.496.496 0 0 0 .488.487.467.467 0 0 0 .477-.477.495.495 0 0 0-.488-.487.472.472 0 0 0-.34.137zM6.654 3.27a.472.472 0 0 0-.138.339.5.5 0 0 0 .49.49.47.47 0 0 0 .477-.477.5.5 0 0 0-.49-.49.472.472 0 0 0-.34.138zm5.993 12.771a.468.468 0 0 0-.138.34.498.498 0 0 0 .49.488.47.47 0 0 0 .337-.139.47.47 0 0 0 .14-.337.499.499 0 0 0-.49-.49.468.468 0 0 0-.34.138zm1.694-1.696a.473.473 0 0 0-.137.339c.002.268.22.486.489.489a.466.466 0 0 0 .476-.476.499.499 0 0 0-.49-.49.476.476 0 0 0-.338.138zm.31 2.006a.472.472 0 0 0-.137.339.499.499 0 0 0 .49.489.472.472 0 0 0 .476-.477.497.497 0 0 0-.489-.489.472.472 0 0 0-.34.138zm1.696-1.693a.469.469 0 0 0-.137.338c.002.267.22.485.489.49a.469.469 0 0 0 .476-.477.499.499 0 0 0-.49-.489.472.472 0 0 0-.338.138zm-4.011-.623a.469.469 0 0 0-.137.338.497.497 0 0 0 .489.49.469.469 0 0 0 .476-.477.499.499 0 0 0-.489-.489.472.472 0 0 0-.34.138zm1.694-1.694a.472.472 0 0 0-.138.339.499.499 0 0 0 .489.489.472.472 0 0 0 .476-.476.495.495 0 0 0-.489-.49.469.469 0 0 0-.338.138zm2.005.31a.472.472 0 0 0-.137.34.499.499 0 0 0 .489.489.466.466 0 0 0 .475-.476.495.495 0 0 0-.489-.488.466.466 0 0 0-.338.136z"
                />
            </defs>
            <g fill="none" fillRule="evenodd">
                <g transform="translate(6 6)">
                    <mask id="d" fill="#fff">
                        <use xlinkHref="#c" />
                    </mask>
                    <g fill="#FFF" mask="url(#d)">
                        <path d="M0 20h20V0H0z" />
                    </g>
                </g>
            </g>
        </svg>
    );
};

export default SykdomIkon;
