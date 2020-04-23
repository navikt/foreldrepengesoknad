import React from 'react';
import { getPeriodeForelderNavn, getOppholdskontoNavn, getForelderNavn } from 'app/util/uttaksplan';
import { NavnPåForeldre, Forelder } from 'common/types';
import { Periode, isAnnenPartInfoPeriode } from 'app/types/uttaksplan/periodetyper';
import { injectIntl, IntlShape } from 'react-intl';
import { formaterDatoKompakt } from 'common/util/datoUtils';
import BEMHelper from 'common/util/bem';

import './enkelPeriodeliste.less';

interface OwnProps {
    perioder: Periode[];
    navnPåForeldre: NavnPåForeldre;
    intl: IntlShape;
}

type Props = OwnProps;

const bem = BEMHelper('enkelPeriodeliste');

const EnkelPeriodeliste: React.StatelessComponent<Props> = ({ perioder, navnPåForeldre, intl }) => (
    <ol className={bem.block}>
        {perioder.map((periode) => (
            <li key={periode.id}>
                <strong>
                    <span className={bem.element('fom')}>{formaterDatoKompakt(periode.tidsperiode.fom)}</span>
                    <span className={bem.element('sep')}>&mdash;</span>
                    <span className={bem.element('tom')}>{formaterDatoKompakt(periode.tidsperiode.tom)}:</span>
                </strong>{' '}
                <span className={bem.element('tittel')}>
                    {isAnnenPartInfoPeriode(periode)
                        ? getOppholdskontoNavn(
                              intl,
                              periode.årsak,
                              getForelderNavn(periode.forelder, navnPåForeldre),
                              periode.forelder === Forelder.mor
                          )
                        : getPeriodeForelderNavn(periode, navnPåForeldre)}
                </span>
            </li>
        ))}
    </ol>
);

export default injectIntl(EnkelPeriodeliste);
