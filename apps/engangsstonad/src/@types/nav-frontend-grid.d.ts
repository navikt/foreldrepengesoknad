declare module 'nav-frontend-grid' {
    import * as React from 'react';

    export interface ContainerProps {
        className?: string;
        fluid?: boolean;
    }

    export interface RowProps {
        className?: string;
    }

    export interface ColumnProps {
        xs: string;
        sm?: string;
        md?: string;
        lg?: string;
        className?: string;
    }

    export class Container extends React.Component<ContainerProps, {}> {}
    export class Row extends React.Component<RowProps, {}> {}
    export class Column extends React.Component<ColumnProps, {}> {}
}
