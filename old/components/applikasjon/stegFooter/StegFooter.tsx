import * as React from 'react';
import BEMHelper from 'common/util/bem';
import { FormattedMessage } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import LinkButton from 'app/components/elementer/linkButton/LinkButton';

import './stegFooter.less';

interface Props {
    onAvbryt: () => void;
    onFortsettSenere: () => void;
}

const StegFooter: React.FunctionComponent<Props> = ({ onAvbryt, onFortsettSenere }) => {
    const bem = BEMHelper('stegFooter');

    return (
        <Normaltekst tag="div" className={bem.block}>
            <div className={bem.element('divider')} />
            <div className={bem.element('links')}>
                <LinkButton
                    id="fortsettSøknadLenke"
                    onClick={(e) => {
                        e.preventDefault();
                        onFortsettSenere();
                    }}
                >
                    <FormattedMessage id="steg.footer.fortsettSenere" />
                </LinkButton>
                <span className={bem.element('dot')} aria-hidden={true} />
                <LinkButton
                    id="avbrytSøknadLenke"
                    onClick={(e) => {
                        e.preventDefault();
                        onAvbryt();
                    }}
                >
                    <FormattedMessage id="steg.footer.avbryt" />
                </LinkButton>
            </div>
        </Normaltekst>
    );
};

export default StegFooter;
