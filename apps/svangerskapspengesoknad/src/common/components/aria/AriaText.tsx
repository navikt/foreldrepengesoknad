import React from 'react';

/**
 *  Skjuler tekst slik at den ikke er synlig på skjerm, men leses av skjermleser
 */
export interface AriaTextProps {
    id?: string;
    children?: React.ReactNode;
}

const AriaText: React.FunctionComponent<AriaTextProps> = (props) => {
    return (
        <span id={props.id} className="sr-only">
            {props.children}
        </span>
    );
};
export default AriaText;
