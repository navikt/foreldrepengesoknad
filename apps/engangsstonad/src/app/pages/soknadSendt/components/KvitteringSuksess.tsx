import * as React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { bemUtils, Block } from '@navikt/fp-common';
import CheckmarkIkon from '../assets/CheckmarkIkon';

import './kvitteringSuksess.less';
import { BodyShort, Heading } from '@navikt/ds-react';

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
                        <Heading size="small">
                            <FormattedMessage id="søknadSendt.info.tittel" />
                        </Heading>
                    </Block>
                    <div>
                        <BodyShort>
                            <FormattedMessage id="søknadSendt.info.innhold" />
                        </BodyShort>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default injectIntl(KvitteringSuksess);
