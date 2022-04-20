import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';

import './personkort.less';
import { bemUtils } from '@navikt/fp-common';

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
                bem.modifier(`valign-${textValign}`)
            )}
        >
            {ikon && <div className={bem.element('ikon')}>{ikon}</div>}
            <div className={bem.element('innhold')}>
                {tittel && <Normaltekst className="tittel">{tittel}</Normaltekst>}
                <div className={bem.element('tekst')}>{children}</div>
            </div>
        </div>
    );
};
export default Personkort;
