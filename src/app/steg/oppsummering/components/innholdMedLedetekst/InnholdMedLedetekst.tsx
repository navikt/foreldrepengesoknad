import * as React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { guid } from 'nav-frontend-js-utils';

interface InnholdMedLedetekstProps {
    ledetekst: string;
    children: JSX.Element | JSX.Element[];
    className?: string;
}

const hasListOfChildren = (children: string | string[]): boolean => Array.isArray(children);

const InnholdMedLedetekst: React.FunctionComponent<InnholdMedLedetekstProps> = ({ ledetekst, children, className }) => {
    return (
        <div className={className}>
            <Element>{ledetekst}</Element>
            {!Array.isArray(children) && hasListOfChildren((children as JSX.Element).props.children)
                ? (children as JSX.Element).props.children.map((child: string) => (
                      <Normaltekst className="feltoppsummering__verdi" key={guid()}>
                          {child}
                      </Normaltekst>
                  ))
                : children}
        </div>
    );
};

export default InnholdMedLedetekst;
