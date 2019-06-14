import * as React from 'react';

import './lenkeKnapp.less';

interface Props {
    onClick: () => void;
    text: string | React.ReactNode;
}

const LenkeKnapp: React.StatelessComponent<Props> = ({ text, onClick }) => {
    return (
        <button
            className="lenkeKnapp lenke"
            onClick={(e) => {
                e.preventDefault();
                onClick();
            }}>
            {text}
        </button>
    );
};

export default LenkeKnapp;
