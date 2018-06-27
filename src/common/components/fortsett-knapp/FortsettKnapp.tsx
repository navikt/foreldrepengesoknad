import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { Hovedknapp } from 'nav-frontend-knapper';
import getMessage from 'common/util/i18nUtils';
import './fortsettKnapp.less';

interface FortsettKnappProps {
    location?: string;
    children?: JSX.Element | string;
}

const FortsettKnapp = (props: FortsettKnappProps & InjectedIntlProps) => {
    const { intl, children } = props;
    return (
        <Hovedknapp className="fortsettKnapp" htmlType="submit">
            {children || getMessage(intl, 'fortsettknapp.label')}
        </Hovedknapp>
    );
};

export default injectIntl(FortsettKnapp);
