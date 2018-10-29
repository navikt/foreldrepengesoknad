import * as React from 'react';
import BEMHelper from 'common/util/bem';
import LinkButton from '../link-button/LinkButton';

import './stegFooter.less';
import { FormattedMessage } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';

interface Props {
    onAvbryt: () => void;
}

const StegFooter: React.StatelessComponent<Props> = ({ onAvbryt }) => {
    const bem = BEMHelper('stegFooter');

    return (
        <Normaltekst tag="div" className={bem.className}>
            <div className={bem.element('divider')} />
            <LinkButton
                onClick={(e) => {
                    e.preventDefault();
                    onAvbryt();
                }}>
                <FormattedMessage id="steg.footer.avbryt" />
            </LinkButton>
        </Normaltekst>
    );
};

export default StegFooter;
