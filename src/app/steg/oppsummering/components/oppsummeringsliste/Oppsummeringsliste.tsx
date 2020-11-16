import * as React from 'react';
import classnames from 'classnames';
import { Element } from 'nav-frontend-typografi';
import { guid } from 'nav-frontend-js-utils';
import List from 'app/components/elementer/list/List';
import './oppsummeringsliste.less';

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
        className={classnames('oppsummeringsliste__element', {
            'oppsummeringsliste__element--kompakt': kompakt === true,
        })}
    >
        <div className="oppsummeringsliste__element__heading">
            <Element tag={venstrestiltTag}>{venstrestiltTekst}</Element>
            <div className="høyrestiltTekst">{høyrestiltTekst}</div>
        </div>
        {content && <div className="oppsummeringsliste__element__content">{content}</div>}
    </li>
);

export default Oppsummeringsliste;
