import React from 'react';
import { useIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import { SubmitEvent } from '../../../app/types/events';
import './fortsettKnapp.less';
import { Button } from '@navikt/ds-react';

interface FortsettKnappProps {
    location?: string;
    children?: JSX.Element | string;
    onClick?: (e: SubmitEvent) => void;
}

const FortsettKnapp = (props: FortsettKnappProps) => {
    const intl = useIntl();
    const { children, onClick } = props;

    return (
        <Button variant="primary" className="fortsettKnapp" onClick={onClick}>
            {children || getMessage(intl, 'fortsettknapp.label')}
        </Button>
    );
};

export default FortsettKnapp;
