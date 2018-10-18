import * as React from 'react';
import { periodelisteBem } from './Periodeliste';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import { getVarighetString } from 'common/util/intlUtils';
import AdvarselIkonÅpen from '../uttaksplan-ikon/ikoner/AdvarselIkon\u00C5pen';

export interface Props {
    antallDager: number;
}

const PeriodelisteHull: React.StatelessComponent<Props & InjectedIntlProps> = ({ antallDager, intl }) => (
    <div className={periodelisteBem.element('hull')}>
        <span className={periodelisteBem.element('hull__icon')}>
            <AdvarselIkonÅpen />
        </span>
        <FormattedMessage
            id="periodeliste.hullMellomPerioder"
            values={{ dager: getVarighetString(antallDager, intl) }}
        />
    </div>
);

export default injectIntl(PeriodelisteHull);
