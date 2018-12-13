import * as React from 'react';
import { EtikettLiten, Element } from 'nav-frontend-typografi';
import { guid } from 'nav-frontend-js-utils';

interface InnholdMedLedetekstProps {
    ledetekst: string;
    children: JSX.Element;
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
            {!Array.isArray(children.props.children) && children}
            {Array.isArray(children.props.children) &&
                children.props.children.map((child: string) => (
                    <Element className="feltoppsummering__verdi" key={guid()}>
                        {child}
                    </Element>
                ))}
        </div>
    );
};

export default InnholdMedLedetekst;
