import React from 'react';
import AriaText from './AriaText';

export interface AriaAlternativeTextProps {
    /** Alternative text for screen-readers */
    ariaText?: React.ReactNode;
    /** Text visible on screen */
    visibleText: React.ReactNode;
}

const AriaAlternative: React.FunctionComponent<AriaAlternativeTextProps> = ({ ariaText, visibleText }) => {
    if (!ariaText) {
        return <React.Fragment>{visibleText}</React.Fragment>;
    }
    return (
        <React.Fragment>
            <AriaText>{ariaText}</AriaText>
            <span aria-hidden={true} role="presentation">
                {visibleText}
            </span>
        </React.Fragment>
    );
};

export default AriaAlternative;
