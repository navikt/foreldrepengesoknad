import { FunctionComponent, ReactNode, createElement } from 'react';

/**
 *  Skjuler tekst slik at den ikke er synlig på skjerm, men leses av skjermleser
 */
export interface AriaTextProps {
    id?: string;
    children?: ReactNode;
    tag?: string;
}

const AriaText: FunctionComponent<AriaTextProps> = ({ id, children, tag }) => {
    const tagName = tag || 'span';
    return createElement(tagName, { id, className: 'sr-only' }, children);
};

export default AriaText;
