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
import { sakGjelderAdopsjon } from '../../util/saker/sakerUtils';
import StorkIkon from 'common/components/ikoner/StorkIkon';

interface Props {
    nyesteSak: Sak;
}

const SakInfo: React.StatelessComponent<Props> = ({ nyesteSak }) => {
    const bem = BEMHelper('sak-info');
    const statusTextKey = nyesteSak.status ? getIntlKeyForStatus(nyesteSak.status) : undefined;
    return (
        <InfoBlock padding="none">
            <div className={bem.className}>
                <div className={bem.element('text')}>
                    <Element className="blokk-xxxs">
                        <FormattedMessage id={'velkommen.sak.type'} />
                    </Element>
                    <Normaltekst className="blokk-xxs">
                        <FormattedMessage
                            id={'velkommen.sak.sistEndret'}
                            values={{
                                date: moment(nyesteSak.opprettet).format('LL')
                            }}
                        />
                    </Normaltekst>
                    {statusTextKey && (
                        <EtikettBase type={'fokus'}>
                            <FormattedMessage id={statusTextKey} />
                        </EtikettBase>
                    )}
                </div>
                <div className={bem.element('icon')}>
                    {sakGjelderAdopsjon(nyesteSak) ? <StorkIkon /> : <BarnevognIkon />}
                </div>
            </div>
        </InfoBlock>
    );
};
export default SakInfo;
