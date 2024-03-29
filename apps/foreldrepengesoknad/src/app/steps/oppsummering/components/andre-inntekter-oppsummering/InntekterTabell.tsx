import { FunctionComponent, ReactElement } from 'react';
import { BodyShort, Label } from '@navikt/ds-react';

import './inntekterTabell.less';

interface Props {
    list: Array<{
        key: string;
        headerVenstre: string;
        headerHøyre: string;
        content?: ReactElement;
    }>;
}

const InntekterTabell: FunctionComponent<Props> = ({ list }) => {
    return (
        <ul className="oppsummeringsliste">
            {list.map((l) => (
                <li key={l.key} className="oppsummeringsliste__element">
                    <div className="oppsummeringsliste__element__heading">
                        <Label>{l.headerVenstre}</Label>
                        <div className="høyrestiltTekst">
                            <BodyShort>{l.headerHøyre}</BodyShort>
                        </div>
                    </div>
                    {l.content && <div className="oppsummeringsliste__element__content">{l.content}</div>}
                </li>
            ))}
        </ul>
    );
};

export default InntekterTabell;
