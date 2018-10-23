import * as React from 'react';
import { periodelisteBem } from './Periodeliste';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import { getVarighetString } from 'common/util/intlUtils';
import AdvarselIkonÅpen from '../uttaksplan-ikon/ikoner/AdvarselIkon\u00C5pen';
import { Normaltekst } from 'nav-frontend-typografi';

export interface Props {
    antallDager: number;
}

const PeriodelisteHull: React.StatelessComponent<Props & InjectedIntlProps> = ({ antallDager, intl }) => (
    <article className={periodelisteBem.element('hull')}>
        <h1 className="sr-only">
            <FormattedMessage id="periodeliste.hullMellomPerioder.aria-label" />
        </h1>
        <span className={periodelisteBem.element('hull__icon')} role="presentation">
            <AdvarselIkonÅpen />
        </span>
        <Normaltekst tag="span">
            <FormattedMessage
                id="periodeliste.hullMellomPerioder"
                values={{ dager: getVarighetString(antallDager, intl) }}
            />
        </Normaltekst>
    </article>
);

export default injectIntl(PeriodelisteHull);
