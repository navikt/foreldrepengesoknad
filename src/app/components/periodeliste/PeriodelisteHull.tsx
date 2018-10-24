import * as React from 'react';
import { periodelisteBem } from './Periodeliste';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import { getVarighetString } from 'common/util/intlUtils';
import AdvarselIkonÅpen from '../uttaksplan-ikon/ikoner/AdvarselIkon\u00C5pen';
import { Normaltekst } from 'nav-frontend-typografi';
import { PeriodeHullÅrsak } from '../../types/uttaksplan/periodetyper';

export interface Props {
    antallDager: number;
    årsak?: PeriodeHullÅrsak;
}

const PeriodelisteHull: React.StatelessComponent<Props & InjectedIntlProps> = ({ antallDager, årsak, intl }) => (
    <article className={periodelisteBem.element('hull')}>
        <h1 className="sr-only">
            <FormattedMessage id="periodeliste.hullMellomPerioder.aria-label" />
        </h1>
        <span className={periodelisteBem.element('hull__icon')} role="presentation">
            <AdvarselIkonÅpen />
        </span>
        <Normaltekst tag="span">
            {årsak === PeriodeHullÅrsak.Fridag ? (
                <FormattedMessage
                    id="periodeliste.hullMellomPerioder.fridag"
                    values={{ dager: getVarighetString(antallDager, intl) }}
                />
            ) : (
                <FormattedMessage
                    id="periodeliste.hullMellomPerioder"
                    values={{ dager: getVarighetString(antallDager, intl) }}
                />
            )}
        </Normaltekst>
    </article>
);

export default injectIntl(PeriodelisteHull);
