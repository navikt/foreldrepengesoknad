import { ReactNode } from 'react';
import AriaText from './AriaText';

export interface AriaAlternativeTextProps {
    /** Alternative text for screen-readers */
    ariaText?: ReactNode;
    /** Text visible on screen */
    visibleText: ReactNode;
}

const AriaAlternative: React.FunctionComponent<AriaAlternativeTextProps> = ({ ariaText, visibleText }) => {
    if (!ariaText) {
        return <>{visibleText}</>;
    }
    return (
        <>
            <AriaText>{ariaText}</AriaText>
            <span aria-hidden={true} role="presentation">
                {visibleText}
            </span>
        </>
    );
};

export default AriaAlternative;
