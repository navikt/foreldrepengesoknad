import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import BEMHelper from 'common/util/bem';

import { getVarighetString } from 'common/util/intlUtils';
import { Normaltekst } from 'nav-frontend-typografi';
import { getStønadskontoNavn } from '../../util/uttaksplan';

import StønadskontoIkon from '../uttaksplan-ikon/StønadskontoIkon';
import { NavnPåForeldre } from 'common/types';
import './kontostatus.less';
import { Stønadskontouttak } from '../../types/uttaksplan/periodetyper';

export interface Props {
    uttak: Stønadskontouttak;
    navnPåForeldre: NavnPåForeldre;
}

const BEM = BEMHelper('kontostatus');

const Kontostatus: React.StatelessComponent<Props & InjectedIntlProps> = ({ uttak, navnPåForeldre, intl }) => {
    const varighetString = getVarighetString(uttak.antallDager, intl);
    const kontoErOvertrukket = uttak.antallDager < 0;

    return (
        <Normaltekst className={BEM.block} tag="div">
            <div className={BEM.element('ikon')} aria-hidden={true} role="presentation">
                <StønadskontoIkon konto={uttak.konto} navnPåForeldre={navnPåForeldre} />
            </div>
            <div className={BEM.element('content')}>
                <div className={kontoErOvertrukket ? BEM.element('kontoOvertrukket') : BEM.element('konto')}>
                    {getStønadskontoNavn(intl, uttak.konto, navnPåForeldre)}
                </div>
                <strong className={kontoErOvertrukket ? BEM.element('dagerOvertrukket') : BEM.element('dager')}>
                    {kontoErOvertrukket ? `- ${varighetString}` : varighetString}
                </strong>
            </div>
        </Normaltekst>
    );
};

export default injectIntl(Kontostatus);
