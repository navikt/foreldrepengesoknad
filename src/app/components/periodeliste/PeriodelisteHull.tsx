import * as React from 'react';
import { periodelisteBem } from './Periodeliste';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import { getVarighetString } from 'common/util/intlUtils';

export interface Props {
    antallDager: number;
}

const PeriodelisteHull: React.StatelessComponent<Props & InjectedIntlProps> = ({ antallDager, intl }) => (
    <div className={periodelisteBem.element('hull')}>
        <FormattedMessage
            id="periodeliste.hullMellomPerioder"
            values={{ dager: getVarighetString(antallDager, intl) }}
        />
    </div>
);

export default injectIntl(PeriodelisteHull);
