import * as React from 'react';
import classnames from 'classnames';
import Snakkeboble from '../snakkeboble/Snakkeboble';
import BEMHelper from 'common/util/bem';

import './personMedSnakkeboble.less';
import { Normaltekst } from 'nav-frontend-typografi';

interface Props {
    personRenderer: () => React.ReactNode;
    dialog?: Dialog;
    fyltBakgrunn?: boolean;
    stil?: 'kompakt';
}

interface Dialog {
    title?: string;
    text: string | React.ReactNode;
}

const bem = BEMHelper('personMedSnakkeboble');

const PersonMedSnakkeboble: React.StatelessComponent<Props> = ({
    dialog,
    personRenderer,
    stil,
    fyltBakgrunn = true,
}) => {
    return (
        <div
            className={classnames(
                bem.block,
                fyltBakgrunn ? bem.modifier('fyltBakgrunn') : undefined,
                stil ? bem.modifier(stil) : undefined
            )}
        >
            {dialog && (
                <Normaltekst tag="div" className={bem.element('snakkeboble')}>
                    <Snakkeboble tittel={dialog.title} tekst={dialog.text} tittelTag="h2" />
                </Normaltekst>
            )}
            <div className={bem.element('person')}>{personRenderer()}</div>
        </div>
    );
};

export default PersonMedSnakkeboble;
