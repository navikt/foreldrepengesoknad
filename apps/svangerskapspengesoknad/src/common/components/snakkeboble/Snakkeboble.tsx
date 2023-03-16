import React from 'react';
import classnames from 'classnames';
import BEMHelper from 'common/util/bem';

import './snakkeboble.less';
import { Label } from '@navikt/ds-react';

interface Props {
    tittel?: string;
    tekst: string | React.ReactNode;
}

const bem = BEMHelper('snakkeboble');

const Snakkeboble: React.FunctionComponent<Props> = ({ tittel, tekst }) => (
    <div className={classnames(bem.block, bem.modifier('hvit'))}>
        <div className={bem.element('innhold')}>
            {tittel && (
                <div className={classnames(bem.element('tittel'), 'capitalizeName')}>
                    <Label className="m_no-margin">{tittel}</Label>
                </div>
            )}
            <div className={bem.element('tekst')}>{tekst}</div>
        </div>
    </div>
);
export default Snakkeboble;
