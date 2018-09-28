import * as React from 'react';
import { Stønadskontouttak } from './Uttaksoppsummering';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import BEMHelper from 'common/util/bem';

import { getVarighetString } from 'common/util/intlUtils';
import { Normaltekst } from 'nav-frontend-typografi';
import { getStønadskontoNavn } from '../../util/uttaksplan';

import './kontostatus.less';
import StønadskontoIkon from '../uttaksplan-ikon/StønadskontoIkon';
import { NavnPåForeldre } from 'common/types';

export interface Props {
    uttak: Stønadskontouttak;
    navnPåForeldre: NavnPåForeldre;
}

const BEM = BEMHelper('kontostatus');

const Kontostatus: React.StatelessComponent<Props & InjectedIntlProps> = ({ uttak, navnPåForeldre, intl }) => (
    <Normaltekst className={BEM.className} tag="div">
        <div className={BEM.element('ikon')}>
            <StønadskontoIkon konto={uttak.konto} navnPåForeldre={navnPåForeldre} />
        </div>
        <div className={BEM.element('content')}>
            <div className={BEM.element('konto')}>{getStønadskontoNavn(intl, uttak.konto, navnPåForeldre)}</div>
            <strong className={BEM.element('dager')}>{getVarighetString(uttak.dagerGjenstående, intl)}</strong>
        </div>
    </Normaltekst>
);

export default injectIntl(Kontostatus);
