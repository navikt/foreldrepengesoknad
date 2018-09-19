import * as React from 'react';
import { Stønadskontouttak } from './Uttaksoppsummering';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import BEMHelper from 'common/util/bem';

import { getVarighetString } from 'common/util/intlUtils';
import { Normaltekst } from 'nav-frontend-typografi';
import { getStønadskontoNavn } from '../../util/uttaksplan';

import './kontostatus.less';
import StønadskontoIkon from '../uttaksplan-ikon/StønadskontoIkon';

export interface Props {
    uttak: Stønadskontouttak;
    navnMor: string;
    navnFarMedmor?: string;
}

const BEM = BEMHelper('kontostatus');

const Kontostatus: React.StatelessComponent<Props & InjectedIntlProps> = ({ uttak, navnMor, navnFarMedmor, intl }) => (
    <Normaltekst className={BEM.className} tag="div">
        <div className={BEM.element('ikon')}>
            <StønadskontoIkon konto={uttak.konto} />
        </div>
        <div className={BEM.element('content')}>
            <div className={BEM.element('konto')}>{getStønadskontoNavn(intl, uttak.konto, navnMor, navnFarMedmor)}</div>
            <strong className={BEM.element('dager')}>{getVarighetString(uttak.dagerGjenstående, intl)}</strong>
        </div>
    </Normaltekst>
);

export default injectIntl(Kontostatus);
