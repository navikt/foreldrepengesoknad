import * as React from 'react';
// tslint:disable-next-line:no-var-requires
const Icon = require('nav-frontend-ikoner-assets').default;
import { KnappProps } from 'nav-frontend-knapper/lib/knapp';

import './slettKnapp.less';

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
        <Icon kind="trashcan" size={20} />
    </button>
);

export default SlettKnapp;
