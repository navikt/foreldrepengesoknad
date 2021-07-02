import { bemUtils } from '@navikt/fp-common';
import { NavnPåForeldre } from 'app/types/NavnPåForeldre';
import { formaterDato } from 'app/utils/dateUtils';
import { getNavnGenitivEierform } from 'app/utils/personUtils';
import { guid } from 'nav-frontend-js-utils';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Periode } from 'uttaksplan/types/Periode';
import { getPeriodeTittel } from 'uttaksplan/utils/periodeUtils';

import './infoEksisterendePerioder.less';

interface Props {
    oppgittePerioder: Periode[];
    navnForOverskrift?: string;
    navnPåForeldre: NavnPåForeldre;
}

const InfoEksisterendePerioder: FunctionComponent<Props> = ({
    oppgittePerioder,
    navnForOverskrift,
    navnPåForeldre,
}) => {
    const intl = useIntl();
    const dateFormat = 'DD. MMM YYYY';
    const bem = bemUtils('infoEksisterendePerioder');

    return (
        <div className={bem.block}>
            {navnForOverskrift && (
                <Normaltekst>
                    <FormattedMessage
                        id="eksisterendeSak.label.annenPartsPlan"
                        values={{
                            navn: getNavnGenitivEierform(navnForOverskrift, intl.locale),
                        }}
                    />
                </Normaltekst>
            )}
            <ol className={bem.element('list')}>
                {oppgittePerioder.map((periode) => {
                    return (
                        <li key={guid()}>
                            <div className={bem.element('listInfo')}>
                                <Element className={bem.element('listInfoPeriode')}>
                                    {formaterDato(periode.tidsperiode.fom, dateFormat)} -{' '}
                                    {formaterDato(periode.tidsperiode.tom, dateFormat)}:
                                </Element>
                                <Normaltekst>{getPeriodeTittel(intl, periode, navnPåForeldre)}</Normaltekst>
                            </div>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
};

export default InfoEksisterendePerioder;
