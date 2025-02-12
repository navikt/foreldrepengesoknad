import * as React from 'react';

import { BodyShort } from '@navikt/ds-react';

import planBemUtils from '../../utils/planBemUtils';
import './personkort.less';

interface Props {
    tittel?: string;
    children: React.ReactNode;
    ikon?: React.ReactNode;
    invertert?: boolean;
    textValign?: 'top' | 'center' | 'bottom';
}

// eslint-disable-next-line @typescript-eslint/no-restricted-types
const Personkort: React.FunctionComponent<Props> = ({ tittel, children, ikon, invertert, textValign = 'top' }) => {
    const bem = planBemUtils('personkort');

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
// eslint-disable-next-line import/no-default-export
export default Personkort;
