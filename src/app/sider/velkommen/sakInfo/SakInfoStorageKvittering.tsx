import * as React from 'react';
import BEMHelper from 'common/util/bem';

import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import InfoBlock from 'common/components/infoBlock/InfoBlock';
import BarnevognIkon from 'common/components/ikoner/BarnevognIkon';
import { StorageKvittering } from '../../../types/StorageKvittering';

import './sakInfo.less';

interface Props {
    storageKvittering: StorageKvittering;
}

const SakInfoStorageKvittering: React.StatelessComponent<Props> = ({ storageKvittering }) => {
    const bem = BEMHelper('sak-info');
    return (
        <InfoBlock padding="none">
            <div className={bem.block}>
                <div className={bem.element('text')}>
                    <Element className="blokk-xxxs">
                        <FormattedMessage id="velkommen.sak.type" />
                    </Element>
                    <Normaltekst className="blokk-xxs">
                        <FormattedMessage
                            id="velkommen.sak.mottatt"
                            values={{
                                date: moment(storageKvittering.innsendingstidspunkt).format('LL'),
                            }}
                        />
                    </Normaltekst>
                </div>
                <div className={bem.element('icon')}>
                    <BarnevognIkon />
                </div>
            </div>
        </InfoBlock>
    );
};
export default SakInfoStorageKvittering;
