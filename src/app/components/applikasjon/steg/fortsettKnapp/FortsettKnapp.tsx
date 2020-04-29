import * as React from 'react';
import { injectIntl, IntlShape } from 'react-intl';
import { Hovedknapp } from 'nav-frontend-knapper';
import getMessage from 'common/util/i18nUtils';
import { SubmitEvent } from '../../../../../common/types/Events';

import './fortsettKnapp.less';

interface FortsettKnappProps {
    location?: string;
    children?: JSX.Element | string;
    onClick?: (e: SubmitEvent) => void;
    submitButtonId?: string;
    intl: IntlShape;
}

const FortsettKnapp = (props: FortsettKnappProps) => {
    const { intl, children, submitButtonId, onClick } = props;
    return (
        <Hovedknapp className="fortsettKnapp" htmlType="submit" onClick={onClick} form={submitButtonId}>
            {children || getMessage(intl, 'fortsettknapp.label')}
        </Hovedknapp>
    );
};

export default injectIntl(FortsettKnapp);
