import * as React from 'react';
// tslint:disable-next-line:no-var-requires
import { KnappProps } from 'nav-frontend-knapper/lib/knapp';

import './slettKnapp.less';
import TrashcanIkon from '../ikoner/TrashcanIkon';

export interface SlettKnappProps extends KnappProps {
    ariaLabel: string;
    onClick: () => void;
}

const SlettKnapp: React.StatelessComponent<SlettKnappProps> = ({ onClick, ariaLabel }) => (
    <button
        type="button"
        className="slettKnapp"
        aria-label={ariaLabel}
        onClick={(e) => {
            e.stopPropagation();
            onClick();
        }}>
        <TrashcanIkon width={20} height={20} />
    </button>
);

export default SlettKnapp;
