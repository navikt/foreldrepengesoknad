import * as React from 'react';
import { History } from 'history';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { Hovedknapp } from 'nav-frontend-knapper';
import getMessage from 'common/util/i18nUtils';
import './fortsettKnapp.less';

interface FortsettKnappProps {
    history: History;
    location?: string;
    children?: JSX.Element | string;
    onClick?: () => void;
}

const FortsettKnapp = (props: FortsettKnappProps & InjectedIntlProps) => {
    const { history, location, intl, children, onClick } = props;
    return (
        <Hovedknapp
            className="fortsettKnapp"
            onClick={() =>
                onClick ? onClick() : history.push(location as string)
            }>
            {children || getMessage(intl, 'fortsettknapp.label')}
        </Hovedknapp>
    );
};

export default injectIntl(FortsettKnapp);
