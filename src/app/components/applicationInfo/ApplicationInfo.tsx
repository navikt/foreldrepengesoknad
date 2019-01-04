import * as React from 'react';
import './applicationInfo.less';

interface BUILDInfo {
    VERSION: string;
}

declare const BUILD: BUILDInfo;

export interface Props {}

const ApplicationInfo: React.StatelessComponent<Props> = (props) => {
    try {
        return (
            <div className="applicationInfo" role="presentation" aria-hidden={true}>
                {BUILD.VERSION}
            </div>
        );
    } catch (e) {
        return null;
    }
};

export default ApplicationInfo;
