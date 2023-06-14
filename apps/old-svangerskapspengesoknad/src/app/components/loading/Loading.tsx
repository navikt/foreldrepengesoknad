import { FunctionComponent } from 'react';

import BEMHelper from 'common/util/bem';
import './loading.less';
import { Loader } from '@navikt/ds-react';

const cls = BEMHelper('loading');

const Loading: FunctionComponent = () => {
    return (
        <div className={cls.block}>
            <Loader size="2xlarge" />
        </div>
    );
};

export default Loading;
