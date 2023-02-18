import { Element, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent, ReactElement } from 'react';

import './inntekterTabell.less';

interface Props {
    list: Array<{
        key: string;
        headerVenstre: string;
        headerHøyre: string;
        content?: ReactElement;
    }>;
}

const InntekterTabell: FunctionComponent<Props> = ({ list }) => {
    return (
        <ul className="oppsummeringsliste">
            {list.map((l) => (
                <li key={l.key} className="oppsummeringsliste__element">
                    <div className="oppsummeringsliste__element__heading">
                        <Element>{l.headerVenstre}</Element>
                        <div className="høyrestiltTekst">
                            <Normaltekst>{l.headerHøyre}</Normaltekst>
                        </div>
                    </div>
                    {l.content && <div className="oppsummeringsliste__element__content">{l.content}</div>}
                </li>
            ))}
        </ul>
    );
};

export default InntekterTabell;
