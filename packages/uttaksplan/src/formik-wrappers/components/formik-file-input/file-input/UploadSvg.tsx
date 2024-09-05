function UploadSvg(props: any) {
    return (
        <svg
            width={22}
            height={22}
            viewBox="0 0 24 24"
            focusable={false}
            {...props}
            role="presentation"
            aria-hidden={true}
        >
            <title>{'Opplastingsikon'}</title>
            <path
                d="M22 18.435v1.826C22 21.773 20.832 23 19.392 23H4.608C3.168 23 2 21.773 2 20.26v-1.825M12 2v15.522m-6.364-9.13L12 2l6.364 6.391"
                stroke="#0067C5"
                strokeWidth={0.93}
                fill="none"
                fillRule="evenodd"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default UploadSvg;
