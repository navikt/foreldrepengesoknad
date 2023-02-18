declare module 'nav-frontend-ikoner-assets' {
    import * as React from 'react';

    type IconKind =
        | 'feil-sirkel-fyll'
        | 'help-circle'
        | 'help-circle_hover'
        | 'info-sirkel-fyll'
        | 'advarsel-sirkel-fyll'
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
        style?: Record<string, unknown> | any[];
        wrapperStyle?: Record<string, unknown> | any[];
    }

    export default class Icon extends React.Component<IconProps, Record<string, unknown>> {}
}
