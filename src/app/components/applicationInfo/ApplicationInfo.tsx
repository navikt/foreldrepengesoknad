import * as React from 'react';
import './applicationInfo.less';

interface BUILDInfo {
    VERSION: string;
}
declare const BUILD: BUILDInfo;

export interface Props {}

const ApplicationInfo: React.StatelessComponent<Props> = (props) => (
    <div className="applicationInfo" role="presentation" aria-hidden={true}>
        {BUILD.VERSION}
    </div>
);

export default ApplicationInfo;
