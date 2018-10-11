import * as React from 'react';
import ApplicationSpinner from 'common/components/application-spinner/ApplicationSpinner';
import Applikasjonsside from '../../connected-components/sider/Applikasjonsside';

const LoadingScreen = () => (
    <Applikasjonsside>
        <ApplicationSpinner />
    </Applikasjonsside>
);

export default LoadingScreen;
