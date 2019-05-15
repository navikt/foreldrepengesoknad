import * as React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import BEMHelper from 'common/util/bem';
import CheckmarkIkon from 'app/components/uttaksplan-ikon/ikoner/CheckmarkIkon';
import Block from 'common/components/block/Block';

import './kvitteringSuksess.less';

const cls = BEMHelper('kvittering');
const KvitteringSuksess: React.StatelessComponent = () => {
    return (
        <div className={cls.block}>
            <div className={cls.element('suksess')}>
                <div className={cls.element('ikon')}>
                    <CheckmarkIkon />
                </div>
                <div className={cls.element('tekst')}>
                    <Block margin="xxs">
                        <Undertittel>
                            <FormattedMessage id="søknadSendt.info.tittel" />
                        </Undertittel>
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
