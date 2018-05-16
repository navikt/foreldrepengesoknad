import * as React from 'react';

import { Knapp } from 'nav-frontend-knapper';
import PlussIkon from '../ikoner/PlussIkon';

import './leggTilKnapp.less';

export interface Props extends React.HTMLProps<HTMLButtonElement> {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    children: React.ReactNode;
}

const LeggTilKnapp: React.StatelessComponent<Props> = (props) => (
    <Knapp
        htmlType="button"
        onClick={(e) => props.onClick(e)}
        className="leggTilKnapp"
        data-ref="leggTilKnapp">
        <span className="leggTilKnapp__content">
            <span className="leggTilKnapp__pluss">
                <PlussIkon />
            </span>
            <span className="leggTilKnapp__label">{props.children}</span>
        </span>
    </Knapp>
);

export default LeggTilKnapp;
