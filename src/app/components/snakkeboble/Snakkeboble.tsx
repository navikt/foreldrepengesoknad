import * as React from 'react';
import { Element } from 'nav-frontend-typografi';

import './snakkeboble.less';

interface Props {
    tittel: string;
    tekst: string | React.ReactNode;
}

const Snakkeboble: React.StatelessComponent<Props> = ({
    tittel = null,
    tekst
}) => (
    <div className={`snakkeboble snakkeboble--hvit`}>
        <div className="snakkeboble__innhold">
            {tittel && (
                <div className="snakkeboble__tittel capitalizeName">
                    <Element className="m_no-margin">{tittel}</Element>
                </div>
            )}
            <div className="snakkeboble__tekst">{tekst}</div>
        </div>
    </div>
);
export default Snakkeboble;
