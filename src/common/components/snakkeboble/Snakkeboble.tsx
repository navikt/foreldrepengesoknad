import * as React from 'react';
import classnames from 'classnames';
import { Element } from 'nav-frontend-typografi';
import BEMHelper from 'common/util/bem';

import './snakkeboble.less';

interface Props {
    tittel?: string;
    tittelTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
    tekst: string | React.ReactNode;
}

const bem = BEMHelper('snakkeboble');

const Snakkeboble: React.StatelessComponent<Props> = ({ tittel, tittelTag, tekst }) => (
    <div className={classnames(bem.block, bem.modifier('hvit'))}>
        <div className={bem.element('innhold')}>
            {tittel && (
                <div className={classnames(bem.element('tittel'), 'capitalizeName')}>
                    <Element tag={tittelTag} className="m_no-margin">
                        {tittel}
                    </Element>
                </div>
            )}
            <p className={bem.element('tekst')}>{tekst}</p>
        </div>
    </div>
);
export default Snakkeboble;
