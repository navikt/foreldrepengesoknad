import * as React from 'react';
import Ingress from 'nav-frontend-typografi/lib/ingress';
import './oppsummeringsseksjon.less';

interface OppsummeringsseksjonProps {
    ingress?: string;
    children: React.ReactNode;
}

const Oppsummeringsseksjon: React.StatelessComponent<OppsummeringsseksjonProps> = ({ ingress, children }) => (
    <div className="oppsummeringsseksjon">
        {ingress && <Ingress>{ingress}</Ingress>}
        {children}
    </div>
);

export default Oppsummeringsseksjon;
