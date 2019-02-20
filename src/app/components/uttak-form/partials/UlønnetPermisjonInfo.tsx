import * as React from 'react';
import { FormattedHTMLMessage } from 'react-intl';
import UtvidetInformasjon from 'app/components/utvidetinformasjon/UtvidetInformasjon';

import './ulønnetPermisjonInfo.less';

const UlønnetPermisjonInfo: React.SFC<{}> = () => {
    return (
        <UtvidetInformasjon apneLabel="Vi ønsker en periode med ulønnet permisjon">
            <div className="ulonnetPermisjon">
                <FormattedHTMLMessage id="uttaksplan.ulønnetPermisjonInfo.del1" />
            </div>
            <FormattedHTMLMessage id="uttaksplan.ulønnetPermisjonInfo.del2" />
        </UtvidetInformasjon>
    );
};

export default UlønnetPermisjonInfo;
