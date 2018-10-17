import * as React from 'react';
import { EtikettLiten } from 'nav-frontend-typografi';
import { guid } from 'nav-frontend-js-utils';

interface InnholdMedLedetekstProps {
    ledetekst: string;
    children: JSX.Element | JSX.Element[];
    className?: string;
}

const InnholdMedLedetekst: React.StatelessComponent<InnholdMedLedetekstProps> = ({
    ledetekst,
    children,
    className
}) => {
    return (
        <div className={className}>
            <EtikettLiten>{ledetekst}</EtikettLiten>
            {!Array.isArray(children) && children}
            {Array.isArray(children) &&
                (children as JSX.Element[]).map((child: any) => <div key={guid()}>{child}</div>)}
        </div>
    );
};

export default InnholdMedLedetekst;
