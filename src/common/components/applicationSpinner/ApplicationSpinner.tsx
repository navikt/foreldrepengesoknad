import * as React from 'react';
import Spinner from 'nav-frontend-spinner';

export interface Props {}

import './applicationSpinner.less';

const ApplicationSpinner: React.StatelessComponent<Props> = (props) => (
    <div className="applicationSpinner">
        <div className="applicationSpinner__spinner">
            <Spinner type="XXL" />
        </div>
    </div>
);

export default ApplicationSpinner;
