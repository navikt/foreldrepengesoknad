import * as React from 'react';
import BEMHelper from 'common/util/bem';

import { FormattedMessage } from 'react-intl';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import InfoBlock from 'common/components/info-block/InfoBlock';
import moment from 'moment';
import EtikettBase from 'nav-frontend-etiketter';
import { getIntlKeyForStatus } from '../../util/stringUtils';
import BarnevognIkon from 'common/components/ikoner/BarnevognIkon';
import Sak from '../../types/søknad/Sak';

import './sakInfo.less';

interface Props {
    nyesteSak: Sak;
}

const SakInfo: React.StatelessComponent<Props> = ({ nyesteSak }) => {
    const cls = BEMHelper('sak-info');
    return (
        <InfoBlock>
            <div className={cls.className}>
                <div className={cls.element('text')}>
                    <Element>
                        <FormattedMessage id={'velkommen.sak.type'} />
                    </Element>
                    <Normaltekst>
                        <FormattedMessage
                            id={'velkommen.sak.sistEndret'}
                            values={{
                                date: moment(nyesteSak.opprettet).format('LL')
                            }}
                        />
                    </Normaltekst>
                    {nyesteSak.status && (
                        <EtikettBase type={'fokus'}>
                            <FormattedMessage id={getIntlKeyForStatus(nyesteSak.status)} />
                        </EtikettBase>
                    )}
                </div>
                <BarnevognIkon className={cls.element('icon')} />
            </div>
        </InfoBlock>
    );
};
export default SakInfo;
