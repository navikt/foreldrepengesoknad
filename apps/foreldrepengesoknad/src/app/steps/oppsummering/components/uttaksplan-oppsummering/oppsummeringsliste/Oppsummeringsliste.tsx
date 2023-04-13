import classNames from 'classnames';
import * as React from 'react';
import List from './list/List';
import { BodyShort, Label } from '@navikt/ds-react';
import { guid } from '@navikt/fp-common';

export interface OppsummeringslisteelementProps {
    venstrestiltTekst: string;
    høyrestiltTekst: string;
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
            <Label as="h4">{venstrestiltTekst}</Label>
            <div className="høyrestiltTekst">
                <BodyShort>{høyrestiltTekst}</BodyShort>
            </div>
        </div>
        {content && <div className="oppsummeringsliste__element__content">{content}</div>}
    </li>
);

export default Oppsummeringsliste;
