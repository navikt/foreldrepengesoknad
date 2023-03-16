import * as React from 'react';

interface CheckboxIkonProps {
    checked: boolean;
}

const CheckboxIkon = (props: CheckboxIkonProps) => {
    return props.checked ? (
        <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <defs>
                <circle id="path-1" cx="12" cy="12" r="12" />
            </defs>
            <g id="Icons/checkmark/circular/checked_green" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <mask id="mask-2" fill="white">
                    <use xlinkHref="#path-1" />
                </mask>
                <g id="Mask" />
                <g id="Farge/-interaksjon/-Grønn" mask="url(#mask-2)" fill="#06893A">
                    <polygon id="Fill-45" points="0 24 24 24 24 0 0 0" />
                </g>
                <path
                    d="M9.84305376,14.2269314 L16.8908106,7.42099173 C17.4867312,6.8455179 18.436334,6.86209328 19.0118078,7.45801388 C19.5872817,8.05393448 19.5707063,9.0035373 18.9747857,9.57901113 L10.7899949,17.4829717 C10.1943373,18.0581916 9.24530959,18.0418847 8.66975978,17.4467383 C8.59011232,17.3839932 8.51566695,17.3121849 8.44791712,17.2314438 L5.35096826,13.5406438 C4.81846557,12.9060318 4.90124151,11.9598984 5.53585351,11.4273957 C6.1704655,10.894893 7.1165989,10.977669 7.64910159,11.612281 L9.84305376,14.2269314 Z"
                    id="Mark"
                    fill="#FFFFFF"
                />
            </g>
        </svg>
    ) : (
        <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <defs>
                <circle id="path-1" cx="12" cy="12" r="12" />
            </defs>
            <g id="Icons/checkmark/circular/pending" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <mask id="mask-2" fill="white">
                    <use xlinkHref="#path-1" />
                </mask>
                <g id="Mask" />
                <g id="Farge/-Grey-light" mask="url(#mask-2)" fill="#C6C2BF">
                    <polygon id="Fill-2" points="0 24 24 24 24 0 0 0" />
                </g>
                <path
                    d="M9.84305376,14.2269314 L16.8908106,7.42099173 C17.4867312,6.8455179 18.436334,6.86209328 19.0118078,7.45801388 C19.5872817,8.05393448 19.5707063,9.0035373 18.9747857,9.57901113 L10.7899949,17.4829717 C10.1943373,18.0581916 9.24530959,18.0418847 8.66975978,17.4467383 C8.59011232,17.3839932 8.51566695,17.3121849 8.44791712,17.2314438 L5.35096826,13.5406438 C4.81846557,12.9060318 4.90124151,11.9598984 5.53585351,11.4273957 C6.1704655,10.894893 7.1165989,10.977669 7.64910159,11.612281 L9.84305376,14.2269314 Z"
                    id="Mark"
                    fill="#FFFFFF"
                />
            </g>
        </svg>
    );
};
export default CheckboxIkon;
