import * as React from 'react';
import classnames from 'classnames';
import { Element } from 'nav-frontend-typografi';
import BEMHelper from 'common/util/bem';

import './snakkeboble.less';

interface Props {
    tittel?: string;
    tekst: string | React.ReactNode;
    tittelTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
}

const bem = BEMHelper('snakkeboble');

const Snakkeboble: React.FunctionComponent<Props> = ({ tittel, tittelTag, tekst }) => (
    <div className={classnames(bem.block, bem.modifier('hvit'))}>
        <div className={bem.element('innhold')}>
            {tittel && (
                <div className={classnames(bem.element('tittel'), 'capitalizeName')}>
                    <Element tag={tittelTag} className="m_no-margin">
                        {tittel}
                    </Element>
                </div>
            )}
            <div className={bem.element('tekst')}>{tekst}</div>
        </div>
    </div>
);
export default Snakkeboble;
