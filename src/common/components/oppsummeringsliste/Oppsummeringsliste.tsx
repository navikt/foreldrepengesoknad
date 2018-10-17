import * as React from 'react';
import { Element } from 'nav-frontend-typografi';
import { guid } from 'nav-frontend-js-utils';
import List from '../../../app/components/list/List';
import './oppsummeringsliste.less';

interface OppsummeringslisteelementProps {
    venstrestiltTekst: string;
    høyrestiltTekst: string;
    content?: React.ReactNode;
}

interface OppsummeringslisteProps {
    data: OppsummeringslisteelementProps[];
}

const Oppsummeringsliste: React.StatelessComponent<OppsummeringslisteProps> = (props: OppsummeringslisteProps) => {
    const { data } = props;
    return (
        <List
            className="oppsummeringsliste"
            data={data}
            renderElement={(elementProps: OppsummeringslisteelementProps) => (
                <Oppsummeringslisteelement {...elementProps} key={guid()} />
            )}
        />
    );
};

const Oppsummeringslisteelement: React.StatelessComponent<OppsummeringslisteelementProps> = ({
    venstrestiltTekst,
    høyrestiltTekst,
    content
}: OppsummeringslisteelementProps) => (
    <li className="oppsummeringsliste__element">
        <div className="oppsummeringsliste__element__heading">
            <Element>{venstrestiltTekst}</Element>
            <Element className="høyrestiltTekst">{høyrestiltTekst}</Element>
        </div>
        {content && <div className="oppsummeringsliste__element__content">{content}</div>}
    </li>
);

export default Oppsummeringsliste;
