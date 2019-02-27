declare module 'nav-frontend-ikoner-assets' {
    import * as React from 'react';

    type IconKind =
        | 'feil-sirkel-fyll'
        | 'help-circle'
        | 'help-circle_hover'
        | 'info-sirkel-fyll'
        | 'ok-sirkel-fyll'
        | 'spinner'
        | 'spinner-negativ'
        | 'spinner-stroke'
        | 'spinner-stroke-negativ'
        | 'spinner-transparent';

    export interface IconProps {
        height?: string | number;
        width?: number | string;
        kind: IconKind;
        onClick?: () => void;
        preview?: boolean;
        size?: string | number;
        style?: Object | Array;
        wrapperStyle?: Object | Array;
    }

    export default class Icon extends React.Component<IconProps, {}> {}
}
