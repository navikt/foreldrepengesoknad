import * as React from 'react';
import { Stønadskontouttak } from './Uttaksoppsummering';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import StønadskontoIkon from '../periodeikon/St\u00F8nadskontoIkon';
import BEMHelper from 'common/util/bem';

import './kontostatus.less';
import { getVarighetString } from 'common/util/intlUtils';
import { Normaltekst } from 'nav-frontend-typografi';
import { getStønadskontoNavn } from '../../util/uttaksplan';

export interface Props {
    uttak: Stønadskontouttak;
}

const BEM = BEMHelper('kontostatus');

const Kontostatus: React.StatelessComponent<Props & InjectedIntlProps> = ({ uttak, intl }) => (
    <Normaltekst className={BEM.className} tag="div">
        <div className={BEM.element('ikon')}>
            <StønadskontoIkon konto={uttak.konto} />
        </div>
        <div className={BEM.element('content')}>
            <div className={BEM.element('konto')}>{getStønadskontoNavn(uttak.konto, intl)}</div>
            <strong className={BEM.element('dager')}>{getVarighetString(uttak.dager, intl)}</strong>
        </div>
    </Normaltekst>
);

export default injectIntl(Kontostatus);
