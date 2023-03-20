import React from 'react';
import { StatusKey } from './../../assets/status-ikon/StatusIkon';
interface Props {
    image: React.ReactNode;
    status: StatusKey;
    statusText: string;
    description: string;
}
declare const PictureScanningExample: React.FunctionComponent<Props>;
export default PictureScanningExample;
