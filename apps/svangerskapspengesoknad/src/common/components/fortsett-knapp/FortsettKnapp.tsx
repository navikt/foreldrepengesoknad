import { useIntl } from 'react-intl';
import './fortsettKnapp.less';
import { Button } from '@navikt/ds-react';
import getMessage from 'common/util/i18nUtils';

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
