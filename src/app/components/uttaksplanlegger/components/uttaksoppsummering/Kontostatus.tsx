import * as React from 'react';
import { injectIntl, IntlShape } from 'react-intl';
import BEMHelper from 'common/util/bem';

import { getVarighetString } from 'common/util/intlUtils';
import { Normaltekst } from 'nav-frontend-typografi';
import { NavnPåForeldre, StønadskontoType } from 'common/types';
import { Stønadskontouttak } from 'app/types/uttaksplan/periodetyper';
import StønadskontoIkon from 'app/components/ikoner/uttaksplanIkon/StønadskontoIkon';
import { getStønadskontoNavn } from 'app/util/uttaksplan';

import './kontostatus.less';

export interface Props {
    uttak: Stønadskontouttak;
    navnPåForeldre: NavnPåForeldre;
    erEndringssøknad: boolean;
    intl: IntlShape;
}

const BEM = BEMHelper('kontostatus');

const Kontostatus: React.FunctionComponent<Props> = ({ uttak, navnPåForeldre, erEndringssøknad, intl }) => {
    if (erEndringssøknad && uttak.konto === StønadskontoType.ForeldrepengerFørFødsel) {
        uttak.dager = 0;
    }

    const varighetString = getVarighetString(uttak.dager, intl);
    const kontoErOvertrukket = uttak.dager < 0;

    return (
        <Normaltekst className={BEM.block} tag="div">
            <div className={BEM.element('ikon')} aria-hidden={true} role="presentation">
                <StønadskontoIkon konto={uttak.konto} navnPåForeldre={navnPåForeldre} />
            </div>
            <div className={BEM.element('content')}>
                <div className={kontoErOvertrukket ? BEM.element('kontoOvertrukket') : BEM.element('konto')}>
                    {getStønadskontoNavn(intl, uttak.konto, navnPåForeldre)}
                </div>
                <strong
                    className={kontoErOvertrukket ? BEM.element('dagerOvertrukket') : BEM.element('dager')}
                    data-name={uttak.konto}
                >
                    {kontoErOvertrukket ? `- ${varighetString}` : varighetString}
                </strong>
            </div>
        </Normaltekst>
    );
};

export default injectIntl(Kontostatus);
