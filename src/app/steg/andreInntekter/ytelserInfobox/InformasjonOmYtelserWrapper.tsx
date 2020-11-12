import * as React from 'react';
import { useIntl } from 'react-intl';

import { Normaltekst } from 'nav-frontend-typografi';

import getMessage from 'common/util/i18nUtils';

import './ytelser.less';

interface YtelseInfoWrapperProps {
    ytelser: any[];
}
const InformasjonOmYtelserWrapper: React.FunctionComponent<YtelseInfoWrapperProps> = ({ ytelser }) => {
    const intl = useIntl();
    const harYtelser = ytelser !== undefined && ytelser.length > 0;

    return (
        <React.Fragment>
            {!harYtelser && (
                <div className="ytelserEmpty">
                    <Normaltekst>{getMessage(intl, 'annenInntekt.ytelser.tekst')}</Normaltekst>
                </div>
            )}
            {harYtelser && <ul className="ytelserList">{ytelser.map(() => 'Ytelse')}</ul>}
        </React.Fragment>
    );
};

export default InformasjonOmYtelserWrapper;
