import { VenstreChevron } from 'nav-frontend-chevron';
import { Knapp } from 'nav-frontend-knapper';
import * as React from 'react';

import './backButton.less';

interface Props {
    text?: string;
    hidden: boolean;
    onClick: () => void;
}

const BackButton: React.FunctionComponent<Props> = ({ onClick, hidden, text = 'Tilbake' }) => {
    return hidden ? null : (
        <Knapp className="backButton" onClick={onClick} mini={true} htmlType="button">
            <span className="backButton__chevron">
                <VenstreChevron />
            </span>
            {text}
        </Knapp>
    );
};

export default BackButton;
