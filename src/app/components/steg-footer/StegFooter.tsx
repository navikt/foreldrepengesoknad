import * as React from 'react';
import BEMHelper from 'common/util/bem';
import LinkButton from '../link-button/LinkButton';

import './stegFooter.less';

const StegFooter: React.StatelessComponent = () => {
    const bem = BEMHelper('stegFooter');

    return (
        <div className={bem.className}>
            <div className={bem.element('divider')} />
            <LinkButton
                onClick={(e) => {
                    e.preventDefault();
                }}>
                Avbryt søknad
            </LinkButton>
        </div>
    );
};

export default StegFooter;
