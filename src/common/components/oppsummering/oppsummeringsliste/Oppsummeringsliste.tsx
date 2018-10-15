import * as React from 'react';
import { Element } from 'nav-frontend-typografi';
import { guid } from 'nav-frontend-js-utils';
import List from '../../../../app/components/list/List';
import './oppsummeringsliste.less';

interface OppsummeringslisteelementProps {
    venstrestiltTekst: string | React.ReactNode;
    høyrestiltTekst: string;
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
                <Oppsummeringslisteelement {...elementProps} />
            )}
        />
    );
};

const Oppsummeringslisteelement: React.StatelessComponent<OppsummeringslisteelementProps> = ({
    venstrestiltTekst,
    høyrestiltTekst
}: OppsummeringslisteelementProps) => (
    <li className="oppsummeringsliste__element" key={guid()}>
        <Element>{venstrestiltTekst}</Element>
        <Element className="høyrestiltTekst">{høyrestiltTekst}</Element>
    </li>
);

export default Oppsummeringsliste;
