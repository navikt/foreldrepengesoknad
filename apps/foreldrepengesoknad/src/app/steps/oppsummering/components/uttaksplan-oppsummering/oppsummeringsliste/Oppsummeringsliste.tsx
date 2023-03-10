import classNames from 'classnames';
import { guid } from 'nav-frontend-js-utils';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import List from './list/List';

export interface OppsummeringslisteelementProps {
    venstrestiltTekst: string;
    høyrestiltTekst: string;
    venstrestiltTag?: string;
    content?: React.ReactNode;
    kompakt?: boolean;
}

interface OppsummeringslisteProps {
    data: OppsummeringslisteelementProps[];
    kompakt?: boolean;
}

const Oppsummeringsliste: React.FunctionComponent<OppsummeringslisteProps> = (props: OppsummeringslisteProps) => {
    const { data, kompakt } = props;
    return (
        <List
            className="oppsummeringsliste"
            data={data}
            renderElement={(elementProps: OppsummeringslisteelementProps) => (
                <Oppsummeringslisteelement {...elementProps} kompakt={kompakt} key={guid()} />
            )}
        />
    );
};

const Oppsummeringslisteelement: React.FunctionComponent<OppsummeringslisteelementProps> = ({
    venstrestiltTekst,
    venstrestiltTag = 'h4',
    høyrestiltTekst,
    content,
    kompakt,
}: OppsummeringslisteelementProps) => (
    <li
        className={classNames('oppsummeringsliste__element', {
            'oppsummeringsliste__element--kompakt': kompakt === true,
        })}
    >
        <div className="oppsummeringsliste__element__heading">
            <Element tag={venstrestiltTag}>{venstrestiltTekst}</Element>
            <div className="høyrestiltTekst">
                <Normaltekst>{høyrestiltTekst}</Normaltekst>
            </div>
        </div>
        {content && <div className="oppsummeringsliste__element__content">{content}</div>}
    </li>
);

export default Oppsummeringsliste;
