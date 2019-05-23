import React from 'react';
import { getPeriodeTittel } from 'app/util/uttaksplan';
import { NavnPåForeldre } from 'common/types';
import { Periode } from 'app/types/uttaksplan/periodetyper';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import './enkelPeriodeliste.less';
import LayoutRow from 'common/components/layoutRow/LayoutRow';
import { Tidsperioden } from 'app/util/uttaksplan/Tidsperioden';

interface OwnProps {
    perioder: Periode[];
    navnPåForeldre: NavnPåForeldre;
    visTidsperiode?: boolean;
}

type Props = OwnProps & InjectedIntlProps;

const EnkelPeriodeliste: React.StatelessComponent<Props> = ({ perioder, navnPåForeldre, visTidsperiode, intl }) => (
    <ol className="enkelPeriodeliste">
        {perioder.map((periode) => (
            <li key={periode.id}>
                <LayoutRow
                    left={getPeriodeTittel(intl, periode, navnPåForeldre)}
                    right={visTidsperiode ? [Tidsperioden(periode.tidsperiode).formaterStringKort(intl)] : undefined}
                />
            </li>
        ))}
    </ol>
);

export default injectIntl(EnkelPeriodeliste);
