import * as React from 'react';

/**
 *  Skjuler tekst slik at den ikke er synlig på skjerm, men leses av skjermleser
 */
export interface AriaTextProps {
    id?: string;
    children?: React.ReactNode;
    tag?: string;
}

const AriaText: React.FunctionComponent<AriaTextProps> = ({ id, children, tag }) => {
    const tagName = tag || 'span';
    return React.createElement(tagName, { id, className: 'sr-only' }, children);
};
export default AriaText;
