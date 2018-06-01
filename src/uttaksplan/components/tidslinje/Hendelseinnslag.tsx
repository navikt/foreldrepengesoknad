import * as React from 'react';

import { InnslagHendelsetype } from './types';
import { FormattedMessage } from 'react-intl';
import FormatertDato from 'common/components/formatert-dato/FormatertDato';
import TerminIkon from 'uttaksplan/components/ikoner/TerminIkon';

interface Props {
    innslag: InnslagHendelsetype;
}

const Hendelseinnslag: React.StatelessComponent<Props> = ({ innslag }) => {
    return (
        <div className="hendelseinnslag">
            <div className="hendelseinnslag__dato">
                <FormatertDato dato={innslag.dato} />
            </div>
            <div className="hendelseinnslag__hendelse">
                {innslag.hendelse === 'termin' ? (
                    <FormattedMessage id="uttaksplan.tidslinje.hendelse.termin" />
                ) : (
                    <FormattedMessage id="uttaksplan.tidslinje.hendelse.sistepermisjonsdag" />
                )}
                {innslag.hendelse === 'termin' && (
                    <span className="hendelseinnslag__ikon">
                        <TerminIkon />
                    </span>
                )}
            </div>
        </div>
    );
};
export default Hendelseinnslag;
