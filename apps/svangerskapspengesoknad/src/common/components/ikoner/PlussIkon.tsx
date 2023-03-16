import * as React from 'react';

const PlussIkon = (props: any) => (
    <svg width={20} height={20} viewBox="0 0 20 20" {...props}>
        <title>+</title>
        <path
            d="M9.25 9.25V.77A.76.76 0 0 1 10 0a.76.76 0 0 1 .75.77v8.48h8.48A.76.76 0 0 1 20 10c0 .412-.345.75-.77.75h-8.48v8.48A.76.76 0 0 1 10 20a.761.761 0 0 1-.75-.77v-8.48H.77A.76.76 0 0 1 0 10a.76.76 0 0 1 .77-.75h8.48z"
            fill="#0067C5"
            fillRule="evenodd"
        />
    </svg>
);

export default PlussIkon;
