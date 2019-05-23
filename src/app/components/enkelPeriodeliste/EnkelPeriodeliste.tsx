import React from 'react';
import { getPeriodeTittel } from 'app/util/uttaksplan';
import { NavnPåForeldre } from 'common/types';
import { Periode, isOppholdAnnenPartPeriode } from 'app/types/uttaksplan/periodetyper';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import './enkelPeriodeliste.less';
import LayoutRow from 'common/components/layoutRow/LayoutRow';
import { Tidsperioden } from 'app/util/uttaksplan/Tidsperioden';
import { PeriodeResultatType } from 'app/types/EksisterendeSak';

interface OwnProps {
    perioder: Periode[];
    navnPåForeldre: NavnPåForeldre;
    visTidsperiode?: boolean;
    visStatus?: boolean;
}

type Props = OwnProps & InjectedIntlProps;

const EnkelPeriodeliste: React.StatelessComponent<Props> = ({
    perioder,
    navnPåForeldre,
    visTidsperiode,
    visStatus,
    intl
}) => (
    <ol className="enkelPeriodeliste">
        {perioder.map((periode) => (
            <li key={periode.id}>
                <LayoutRow
                    left={getPeriodeTittel(intl, periode, navnPåForeldre)}
                    right={[
                        ...(visTidsperiode ? [Tidsperioden(periode.tidsperiode).formaterStringKort(intl)] : []),
                        ...(visStatus &&
                        isOppholdAnnenPartPeriode(periode) &&
                        periode.resultatType === PeriodeResultatType.AVSLÅTT
                            ? ['Avslått']
                            : [])
                    ]}
                />
            </li>
        ))}
    </ol>
);

export default injectIntl(EnkelPeriodeliste);
