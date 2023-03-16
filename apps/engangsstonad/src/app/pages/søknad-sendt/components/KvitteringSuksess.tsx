import * as React from 'react';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage, injectIntl } from 'react-intl';
import { bemUtils, Block } from '@navikt/fp-common';
import CheckmarkIkon from '../assets/CheckmarkIkon';

import './kvitteringSuksess.less';

const KvitteringSuksess: React.FunctionComponent = () => {
    const bem = bemUtils('kvittering');

    return (
        <div className={bem.block}>
            <div className={bem.element('suksess')}>
                <div className={bem.element('ikon')}>
                    <CheckmarkIkon />
                </div>
                <div className={bem.element('tekst')}>
                    <Block margin="s">
                        <Undertittel>
                            <FormattedMessage id="søknadSendt.info.tittel" />
                        </Undertittel>
                    </Block>
                    <div>
                        <Normaltekst>
                            <FormattedMessage id="søknadSendt.info.innhold" />
                        </Normaltekst>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default injectIntl(KvitteringSuksess);
