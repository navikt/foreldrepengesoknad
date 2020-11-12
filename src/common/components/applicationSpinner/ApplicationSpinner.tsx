import * as React from 'react';
import Spinner from 'nav-frontend-spinner';

import './applicationSpinner.less';

const ApplicationSpinner: React.FunctionComponent = () => (
    <div className="applicationSpinner">
        <div className="applicationSpinner__spinner">
            <Spinner type="XXL" />
        </div>
    </div>
);

export default ApplicationSpinner;
