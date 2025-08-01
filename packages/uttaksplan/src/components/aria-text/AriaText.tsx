import { FunctionComponent, ReactNode, createElement } from 'react';

/**
 *  Skjuler tekst slik at den ikke er synlig på skjerm, men leses av skjermleser
 */
interface AriaTextProps {
    id?: string;
    children?: ReactNode;
    tag?: string;
}

// eslint-disable-next-line @typescript-eslint/no-restricted-types
const AriaText: FunctionComponent<AriaTextProps> = ({ id, children, tag }) => {
    const tagName = tag || 'span';
    return createElement(tagName, { id, className: 'sr-only' }, children);
};

// eslint-disable-next-line import/no-default-export
export default AriaText;
