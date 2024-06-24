import getMessage from 'common/util/i18nUtils';
import { useIntl } from 'react-intl';

import { Button } from '@navikt/ds-react';

import './fortsettKnapp.less';

interface FortsettKnappProps {
    location?: string;
    children?: JSX.Element | string;
}

const FortsettKnapp = (props: FortsettKnappProps) => {
    const intl = useIntl();
    const { children } = props;

    return (
        <Button variant="primary" className="fortsettKnapp">
            {children || getMessage(intl, 'fortsettknapp.label')}
        </Button>
    );
};

export default FortsettKnapp;
