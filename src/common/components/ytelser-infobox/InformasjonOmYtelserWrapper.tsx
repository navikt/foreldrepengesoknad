import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import { Normaltekst } from 'nav-frontend-typografi';

import getMessage from 'common/util/i18nUtils';

import './ytelser.less';

interface YtelseInfoWrapperProps {
    ytelser: any[];
}
const InformasjonOmYtelserWrapper: React.StatelessComponent<
    YtelseInfoWrapperProps & InjectedIntlProps
> = ({ ytelser, intl }) => {
    return (
        <React.Fragment>
            {(ytelser === undefined || (ytelser && ytelser.length === 0)) && (
                <div className="ytelserEmpty">
                    <Normaltekst>
                        {getMessage(intl, 'annenInntekt.ytelser.tekst')}
                    </Normaltekst>
                </div>
            )}
            {ytelser &&
                ytelser.length > 0 && (
                    <ul className="ytelserList">
                        /* TODO: Render info om ytelse */
                        {ytelser.map(() => 'Ytelse')}
                    </ul>
                )}
        </React.Fragment>
    );
};

export default injectIntl(InformasjonOmYtelserWrapper);
