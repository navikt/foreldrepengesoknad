import { Normaltekst } from 'nav-frontend-typografi';
import React from 'react';

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
            <Normaltekst>{text}</Normaltekst>
        </button>
    );
};

export default LenkeKnapp;
