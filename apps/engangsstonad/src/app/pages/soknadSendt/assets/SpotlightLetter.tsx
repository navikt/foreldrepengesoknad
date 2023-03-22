import * as React from 'react';

const SpotlightLetter = (props: any) => (
    <svg
        width={120}
        height={120}
        viewBox="0 0 120 120"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-hidden="true"
        {...props}
    >
        <title>Søknad sendt illustrasjon</title>
        <defs>
            <circle id="path-1" cx="60" cy="60" r="60" />
            <circle id="path-3" cx="8" cy="8" r="8" />
        </defs>
        <g id="Spotlight/letter" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <use id="Background" fill="#9BD0B0" xlinkHref="#path-1" />
            <g id="Letter" transform="translate(32.000000, 30.000000)">
                <path
                    d="M4.385,30.26975 C3.693,29.57675 0.418,27.19775 1.111,26.50475 L0,22.99075 L26.227,0.51975 C26.92,-0.17325 28.042,-0.17325 28.736,0.51975 L54.961,22.99075 L49.021,35.84775 C49.712,36.53975 27.301,48.01175 26.609,48.70575 L4.385,30.26975 Z"
                    id="Back"
                    fill="#0C576F"
                />
                <g transform="translate(4.000000, 16.000000)">
                    <path
                        d="M45.7388018,30.9845992 L1.50880182,30.9845992 C1.20380182,30.9845992 0.957801819,30.7355992 0.957801819,30.4345992 L0.957801819,0.606599213 C0.957801819,0.302599213 1.20380182,0.0555992126 1.50880182,0.0555992126 L45.7388018,0.0555992126 C46.0418018,0.0555992126 46.2878018,0.302599213 46.2878018,0.606599213 L46.2878018,30.4345992 C46.2878018,30.7355992 46.0418018,30.9845992 45.7388018,30.9845992"
                        id="Paper"
                        fill="#DCDCD2"
                    />
                    <g id="Checkmark" transform="translate(16.000000, 5.000000)">
                        <use id="Circle" fill="#0C5EA8" xlinkHref="#path-3" />
                        <path
                            d="M6.56203584,9.48462091 L11.2605404,4.94732782 C11.6578208,4.5636786 12.2908893,4.57472885 12.6745385,4.97200925 C13.0581878,5.36928965 13.0471375,6.0023582 12.6498571,6.38600742 L7.19332991,11.6553145 C6.79622485,12.0387944 6.16353973,12.0279231 5.77983986,11.6311589 C5.72674155,11.5893288 5.6771113,11.5414566 5.63194475,11.4876292 L3.56731217,9.02709588 C3.21231038,8.60402121 3.26749434,7.97326562 3.69056901,7.61826382 C4.11364367,7.26326203 4.74439926,7.31844599 5.09940106,7.74152066 L6.56203584,9.48462091 Z"
                            id="Mark"
                            fill="#FFFFFF"
                        />
                    </g>
                </g>
                <path
                    d="M2.21639938,59.6589001 L46.9593994,59.6589001 C48.1063994,59.6589001 0.141399384,23.0289001 0.141399384,23.0289001 L0.141399384,57.5839001 C0.141399384,58.7289001 1.07039938,59.6589001 2.21639938,59.6589001"
                    id="Front-left"
                    fill="#4C92D9"
                />
                <path
                    d="M53.0298,59.6589001 L8.28679997,59.6589001 C7.14079997,59.6589001 55.1048,23.0289001 55.1048,23.0289001 L55.1048,57.5839001 C55.1048,58.7289001 54.1758,59.6589001 53.0298,59.6589001"
                    id="Front-right"
                    fill="#2C79C5"
                />
            </g>
        </g>
    </svg>
);

export default SpotlightLetter;
