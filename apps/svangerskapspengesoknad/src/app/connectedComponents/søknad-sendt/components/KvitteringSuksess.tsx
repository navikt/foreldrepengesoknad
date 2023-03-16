import React, { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import BEMHelper from 'common/util/bem';
import CheckmarkIkon from 'app/icons/CheckmarkIkon';

import './kvitteringSuksess.less';
import Block from 'common/components/block/Block';
import { Heading } from '@navikt/ds-react';

const cls = BEMHelper('kvittering');

const KvitteringSuksess: FunctionComponent = () => {
    return (
        <div className={cls.block}>
            <div className={cls.element('suksess')}>
                <div className={cls.element('ikon')}>
                    <CheckmarkIkon />
                </div>
                <div className={cls.element('tekst')}>
                    <Block margin="xxs">
                        <Heading size="small">
                            <FormattedMessage id="søknadSendt.info.tittel" />
                        </Heading>
                    </Block>
                    <div>
                        <FormattedMessage id="søknadSendt.info.innhold" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KvitteringSuksess;
