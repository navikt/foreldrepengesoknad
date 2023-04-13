import React from 'react';
import { BodyShort } from '@navikt/ds-react';

import './lenkeKnapp.less';

interface Props {
    onClick: () => void;
    text: string | React.ReactNode;
}

const LenkeKnapp: React.FunctionComponent<Props> = ({ text, onClick }) => {
    return (
        <button
            className="lenkeKnapp lenke"
            onClick={(e) => {
                e.preventDefault();
                onClick();
            }}
        >
            <BodyShort>{text}</BodyShort>
        </button>
    );
};

export default LenkeKnapp;
