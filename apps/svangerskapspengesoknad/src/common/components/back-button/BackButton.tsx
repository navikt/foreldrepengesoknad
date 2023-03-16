import { Button } from '@navikt/ds-react';
import React from 'react';
const { VenstreChevron } = require('nav-frontend-chevron');

import './backButton.less';

interface Props {
    text?: string;
    hidden: boolean;
    onClick: () => void;
}

const BackButton: React.FunctionComponent<Props> = ({ onClick, hidden, text = 'Tilbake' }) => {
    return hidden ? null : (
        <Button variant="secondary" className="backButton" onClick={onClick} size="small" type="button">
            <span className="backButton__chevron">
                <VenstreChevron />
            </span>
            {text}
        </Button>
    );
};

export default BackButton;
