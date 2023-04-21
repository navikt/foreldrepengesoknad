export interface OwnProps {
    size?: number;
}

const SpebarnIkon = ({ size = 42 }) => {
    const ratio = 82 / 42;
    return (
        <svg
            focusable="false"
            role="img"
            aria-hidden="true"
            viewBox="0 0 41 82"
            width={size}
            height={size ? size * ratio : undefined}
        >
            <title>{'Spebarn'}</title>
            <g fill="none" fillRule="evenodd">
                <path
                    d="M2.986 39.834c.554-9.039 8.06-16.198 17.239-16.198 9.178 0 16.685 7.16 17.238 16.198a2.878 2.878 0 0 1 1.473 2.512v2.879A2.879 2.879 0 0 1 35.93 48.1a17.326 17.326 0 0 1-9.967 9.101 5.758 5.758 0 0 1-11.478 0 17.326 17.326 0 0 1-9.968-9.101 2.879 2.879 0 0 1-3.004-2.876v-2.879c0-1.079.594-2.019 1.472-2.512z"
                    fill="#E7E5E2"
                />
                <g fill="#78706A" fillRule="nonzero">
                    <path d="M16.604 25.587a.576.576 0 0 1 1.11.306c-.106.382-.005.548.696 1.179.729.656.898 1.517.494 2.444a.576.576 0 1 1-1.055-.46c.21-.48.144-.81-.21-1.129-1.003-.903-1.298-1.387-1.035-2.34zM19.813 25.28a.576.576 0 0 1 .926.683c-.235.32-.2.51.228 1.35.445.874.295 1.739-.414 2.459a.576.576 0 1 1-.82-.808c.367-.373.424-.704.208-1.128-.613-1.204-.715-1.76-.128-2.556zM22.958 25.248a.576.576 0 1 1 .67.936c-.322.23-.348.423-.2 1.354.153.969-.257 1.745-1.154 2.21a.576.576 0 0 1-.53-1.021c.464-.242.621-.539.547-1.009-.212-1.334-.137-1.895.667-2.47z" />
                </g>
                <path
                    d="M17.843 49.986c.38.811 1.141 1.217 2.283 1.217 1.141 0 1.902-.406 2.283-1.217"
                    stroke="#593A32"
                    strokeWidth={1.439}
                    strokeLinecap="round"
                />
                <path
                    d="M15.56 48.767c0 2.018-1.533 3.654-3.424 3.654-1.892 0-3.425-1.636-3.425-3.654 0-2.017 1.533-3.653 3.425-3.653 1.89 0 3.424 1.636 3.424 3.653M31.54 48.767c0 2.018-1.532 3.654-3.423 3.654-1.892 0-3.425-1.636-3.425-3.654 0-2.017 1.533-3.653 3.425-3.653 1.89 0 3.424 1.636 3.424 3.653"
                    fill="#E8CCC8"
                />
                <path
                    d="M21.066 43.328c-.308.07-.611-.141-.676-.47-.065-.33.133-.652.441-.721.768-.172 1.41-.04 1.763.592.686 1.23.447 2.647-.635 3.629-.63.57-1.512.775-2.129.377a.633.633 0 0 1-.193-.836.55.55 0 0 1 .784-.206c.135.087.508 0 .798-.263.663-.601.792-1.365.394-2.078-.037-.067-.203-.1-.547-.024zM10.44 39.173c-.077-.327.11-.657.415-.739.306-.081.616.117.692.443.323 1.377.883 1.975 1.73 1.975.846 0 1.406-.598 1.729-1.975.076-.326.386-.524.692-.443.306.082.492.412.415.739-.438 1.87-1.4 2.897-2.836 2.897-1.437 0-2.399-1.027-2.837-2.897zM24.138 39.173c-.077-.327.11-.657.415-.739.306-.081.616.117.692.443.323 1.377.883 1.975 1.73 1.975.846 0 1.406-.598 1.729-1.975.076-.326.386-.524.692-.443.306.082.492.412.415.739-.438 1.87-1.4 2.897-2.836 2.897-1.437 0-2.399-1.027-2.837-2.897z"
                    fill="#59514B"
                    fillRule="nonzero"
                />
                <g transform="translate(13.277 46.332)">
                    <path
                        d="M7.42 1.056C9.132 1.056 10.273 0 11.415 0c1.904 0 3.424 1.363 3.424 3.695 0 2.333-2.3 4.224-5.136 4.224-.82 0-1.596.037-2.283.002-.688.035-1.463-.002-2.283-.002C2.3 7.919 0 6.028 0 3.695 0 1.363 1.52 0 3.424 0 4.566 0 5.707 1.056 7.42 1.056z"
                        fill="#91C823"
                    />
                    <ellipse fill="#FFF" cx={7.42} cy={4.262} rx={3.995} ry={3.045} />
                </g>
                <path
                    d="M23.55 50.595c.315 0 .57.272.57.608v3.383c0 1.707-1.696 3.316-3.424 3.316-1.855 0-3.424-1.359-3.424-3.316v-3.383c0-.336.255-.608.57-.608h5.708zm-5.137 1.217v2.774c0 1.222 1.012 2.098 2.283 2.098 1.126 0 2.283-1.098 2.283-2.098v-2.774h-4.566z"
                    fill="#FFF"
                    fillRule="nonzero"
                />
                <path
                    d="M39.836 81.207H.614A17.453 17.453 0 0 1 .11 77.99L.075 43.87c0-17.43 14.175-23.113 20.15-23.113 5.975 0 20.15 5.9 20.15 22.974V77.99a20.963 20.963 0 0 1-.54 3.217zM2.986 39.834a2.878 2.878 0 0 0-1.472 2.512v2.879A2.879 2.879 0 0 0 4.518 48.1a17.326 17.326 0 0 0 9.968 9.101 5.758 5.758 0 0 0 11.478 0 17.326 17.326 0 0 0 9.967-9.101 2.879 2.879 0 0 0 3.004-2.876v-2.879c0-1.079-.593-2.019-1.472-2.512-.553-9.039-8.06-16.198-17.238-16.198-9.179 0-16.685 7.16-17.239 16.198z"
                    fill="#9B9590"
                />
                <path
                    d="M13.028 55.613c.588 1.08 3.23 6.452 7.126 9.762 3.869-3.26 7.267-9.035 7.267-10.04-.394-.26-.787 1.042-1.176.836-1.927 1.883-7.357 3.86-12.497 0-.605.35-.72-.558-.72-.558z"
                    fill="#E7E5E2"
                />
                <path
                    d="M18.431 79.668a.72.72 0 1 1-.73-1.24c6.297-3.708 12.941-11.301 19.9-22.781a.72.72 0 0 1 1.23.746c-7.07 11.665-13.86 19.424-20.4 23.275z"
                    fill="#B7B1A9"
                    fillRule="nonzero"
                />
                <path
                    d="M11.699 56.401a.72.72 0 0 1 1.22-.763 40.776 40.776 0 0 0 7.715 9.093c3.018 2.649 5.171 4.34 6.425 5.057a.72.72 0 0 1-.714 1.25c-1.363-.78-3.572-2.515-6.66-5.225a42.215 42.215 0 0 1-7.986-9.412z"
                    fill="#B7B1A9"
                    fillRule="nonzero"
                />
                <g fill="#C86151">
                    <path d="M27.333 4.782c0 .273-.018.549-.055.828-.278 2.116-1.563 4.348-3.527 6.588a28.937 28.937 0 0 1-3.547 3.395.333.333 0 0 1-.388.014 21.237 21.237 0 0 1-1.117-.826 23.382 23.382 0 0 1-2.441-2.228c-2.24-2.365-3.591-4.857-3.591-7.376 0-5.368 5.724-6.323 7.335-2.102 1.612-4.152 7.331-3.384 7.331 1.707z" />
                </g>
            </g>
        </svg>
    );
};

export default SpebarnIkon;
