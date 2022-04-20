import * as React from 'react';
import { Element } from 'nav-frontend-typografi';
import './oppsummeringsseksjon.less';

interface OppsummeringsseksjonProps {
    tittel?: string;
    children: React.ReactNode;
}

const Oppsummeringsseksjon: React.FunctionComponent<OppsummeringsseksjonProps> = ({ tittel, children }) => (
    <div className="oppsummeringsseksjon">
        {tittel && (
            <Element tag="h3" className="oppsummeringsseksjon__tittel">
                {tittel}
            </Element>
        )}
        {children}
    </div>
);

export default Oppsummeringsseksjon;
