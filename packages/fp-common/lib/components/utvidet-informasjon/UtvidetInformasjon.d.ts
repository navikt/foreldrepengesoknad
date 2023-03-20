import React from 'react';
import './utvidetInformasjon.less';
export interface UtvidetInformasjonProps {
    children: React.ReactNode;
    erApen?: boolean;
    apneLabel?: React.ReactNode;
    lukkLabel?: React.ReactNode;
}
declare const UtvidetInformasjon: React.FunctionComponent<UtvidetInformasjonProps>;
export default UtvidetInformasjon;
