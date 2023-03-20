import React from 'react';
import { VeilederProps } from '../veileder/Veileder';
import './sidebanner.less';
export interface SidebannerProps {
    dialog?: Dialog;
    veileder?: VeilederProps;
}
interface Dialog {
    title: string;
    text: string | React.ReactNode;
}
declare const Sidebanner: React.FunctionComponent<SidebannerProps>;
export default Sidebanner;
