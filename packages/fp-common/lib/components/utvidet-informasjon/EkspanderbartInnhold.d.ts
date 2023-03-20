import React from 'react';
import './ekspanderbartInnhold.less';
interface Props {
    children: React.ReactNode;
    erApen?: boolean;
    ariaLive?: 'assertive' | 'polite' | 'off';
    animert?: boolean;
}
declare const EkspanderbartInnhold: React.FunctionComponent<Props>;
export default EkspanderbartInnhold;
