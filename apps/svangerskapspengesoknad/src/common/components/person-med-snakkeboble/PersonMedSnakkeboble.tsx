import React from 'react';
import classnames from 'classnames';
import Snakkeboble from '../snakkeboble/Snakkeboble';
import BEMHelper from 'common/util/bem';

import './personMedSnakkeboble.less';
import { BodyShort } from '@navikt/ds-react';

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

const PersonMedSnakkeboble: React.FunctionComponent<Props> = ({
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
                <BodyShort className={bem.element('snakkeboble')}>
                    <Snakkeboble tittel={dialog.title} tekst={dialog.text} />
                </BodyShort>
            )}
            <div className={bem.element('person')}>{personRenderer()}</div>
        </div>
    );
};

export default PersonMedSnakkeboble;
