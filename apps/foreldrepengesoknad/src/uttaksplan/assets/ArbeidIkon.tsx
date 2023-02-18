import React from 'react';
import { UttaksplanIkonProps } from 'uttaksplan/components/uttaksplan-ikon/UttaksplanIkon';

const ArbeidIkon = (props: UttaksplanIkonProps) => {
    const { title, ...rest } = props;
    return (
        <svg
            focusable="false"
            role="img"
            aria-hidden="true"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width={32}
            height={32}
            {...rest}
        >
            <title>{props.title}</title>
            <defs>
                <rect id="a" width={32} height={32} rx={10} />
            </defs>
            <g fill="none" fillRule="evenodd">
                <path
                    fill="#FFF"
                    fillRule="nonzero"
                    d="M23.378 7.79l-.001-.002-1.666-1.665A.413.413 0 0 0 21.417 6H10.583a.417.417 0 0 0-.295.123L8.622 7.788l-.002.002a.463.463 0 0 0-.12.293v17.5c0 .23.187.417.417.417h5.416v-3.75c0-.23.187-.417.417-.417h2.5c.23 0 .417.187.417.417V26h5.416c.23 0 .417-.187.417-.417v-17.5a.46.46 0 0 0-.122-.293zM12.667 20.167h-2.5v-2.5h2.5v2.5zm0-4.167h-2.5v-2.5h2.5V16zm0-4.167h-2.5v-2.5h2.5v2.5zm5 8.334h-3.334v-2.5h3.334v2.5zm0-4.167h-3.334v-2.5h3.334V16zm0-4.167h-3.334v-2.5h3.334v2.5zm4.166 8.334h-2.5v-2.5h2.5v2.5zm0-4.167h-2.5v-2.5h2.5V16zm0-4.167h-2.5v-2.5h2.5v2.5zM9.923 7.667l.833-.834h10.488l.834.834H9.923z"
                />
            </g>
        </svg>
    );
};

export default ArbeidIkon;
