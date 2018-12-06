import * as React from 'react';
import { Stønadskontouttak } from 'app/components/uttaksoppsummering/Uttaksoppsummering';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import { getVarighetString } from 'common/util/intlUtils';
import { injectIntl, InjectedIntl } from 'react-intl';
import { guid } from 'nav-frontend-js-utils';
import { Normaltekst } from 'nav-frontend-typografi';
import { NavnPåForeldre } from 'common/types';
import { getStønadskontoNavn } from 'app/util/uttaksplan';

interface OvertrukneDagerProps {
    overtrukneKontoer: Stønadskontouttak[];
    navnPåForeldre: NavnPåForeldre;
    intl: InjectedIntl;
}

const OvertrukneDager: React.SFC<OvertrukneDagerProps> = ({ overtrukneKontoer, navnPåForeldre, intl }) => (
    <Veilederinfo type="feil">
        {overtrukneKontoer.map((konto) => (
            <Normaltekst key={guid()}>
                {`Du har tatt ${getVarighetString(
                    Math.abs(konto.antallDager),
                    intl
                )} for mye uttak av ${getStønadskontoNavn(intl, konto.konto, navnPåForeldre)}`}
            </Normaltekst>
        ))}
    </Veilederinfo>
);

export default injectIntl(OvertrukneDager);
