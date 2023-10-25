import * as React from 'react';
import { BodyShort } from '@navikt/ds-react';

import './personkort.less';
import bemUtils from '../../utils/bemUtils';

interface Props {
    tittel?: string;
    children: React.ReactNode;
    ikon?: React.ReactNode;
    invertert?: boolean;
    textValign?: 'top' | 'center' | 'bottom';
}

const Personkort: React.FunctionComponent<Props> = ({ tittel, children, ikon, invertert, textValign = 'top' }) => {
    const bem = bemUtils('personkort');

    return (
        <div
            className={bem.classNames(
                bem.block,
                bem.modifierConditional('invertert', invertert === true),
                bem.modifier(`valign-${textValign}`),
            )}
        >
            {ikon && <div className={bem.element('ikon')}>{ikon}</div>}
            <div className={bem.element('innhold')}>
                {tittel && <BodyShort className="tittel">{tittel}</BodyShort>}
                <div className={bem.element('tekst')}>{children}</div>
            </div>
        </div>
    );
};
export default Personkort;
