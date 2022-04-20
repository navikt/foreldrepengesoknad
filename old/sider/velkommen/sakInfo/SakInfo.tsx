import * as React from 'react';
import BEMHelper from 'common/util/bem';

import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import EtikettBase from 'nav-frontend-etiketter';
import InfoBlock from 'common/components/infoBlock/InfoBlock';
import BarnevognIkon from 'common/components/ikoner/BarnevognIkon';
import StorkIkon from 'common/components/ikoner/StorkIkon';
import { getIntlKeyForStatus } from '../../../util/stringUtils';
import Sak from '../../../types/søknad/Sak';
import { sakGjelderAdopsjon } from '../../../util/saker/sakerUtils';

import './sakInfo.less';

interface Props {
    sak: Sak;
}

const SakInfo: React.FunctionComponent<Props> = ({ sak }) => {
    const bem = BEMHelper('sak-info');
    const statusTextKey = sak.status ? getIntlKeyForStatus(sak.status) : undefined;
    return (
        <InfoBlock padding="none">
            <div className={bem.block}>
                <div className={bem.element('text')}>
                    <Element className="blokk-xxxs">
                        <FormattedMessage id="velkommen.sak.type" />
                    </Element>
                    <Normaltekst className="blokk-xxs">
                        <FormattedMessage
                            id="velkommen.sak.sistEndret"
                            values={{
                                date: moment(sak.opprettet).format('LL'),
                            }}
                        />
                    </Normaltekst>
                    {statusTextKey && (
                        <EtikettBase
                            type={statusTextKey === 'velkommen.sak.status.ferdigBehandlet' ? 'suksess' : 'fokus'}
                        >
                            <FormattedMessage id={statusTextKey} />
                        </EtikettBase>
                    )}
                </div>
                <div className={bem.element('icon')}>{sakGjelderAdopsjon(sak) ? <StorkIkon /> : <BarnevognIkon />}</div>
            </div>
        </InfoBlock>
    );
};
export default SakInfo;
