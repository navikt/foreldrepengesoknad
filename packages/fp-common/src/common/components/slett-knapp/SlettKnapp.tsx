import * as React from 'react';
import TrashcanIkon from './TrashcanIkon';
import { ButtonProps } from '@navikt/ds-react';

import './slettKnapp.less';

export interface SlettKnappProps extends ButtonProps {
    ariaLabel: string;
    onClick: () => void;
}

const SlettKnapp: React.FunctionComponent<SlettKnappProps> = ({ onClick, ariaLabel }) => (
    <button
        type="button"
        className="slettKnapp"
        aria-label={ariaLabel}
        onClick={(e) => {
            e.stopPropagation();
            onClick();
        }}
    >
        <TrashcanIkon width={20} height={20} />
    </button>
);

export default SlettKnapp;
