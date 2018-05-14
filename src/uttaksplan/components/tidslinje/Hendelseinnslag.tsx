import * as React from 'react';

import { InnslagHendelsetype } from './types';
import TerminIkon from '../../elements/ikoner/TerminIkon';
import { FormattedMessage } from 'react-intl';
import Dato from '../../elements/dato/Dato';

interface Props {
    innslag: InnslagHendelsetype;
}

const Hendelseinnslag: React.StatelessComponent<Props> = ({ innslag }) => {
    return (
        <div className="hendelseinnslag">
            <div className="hendelseinnslag__dato">
                <Dato dato={innslag.dato} />
            </div>
            <div className="hendelseinnslag__hendelse">
                {innslag.hendelse === 'termin' ? (
                    <FormattedMessage id="tidslinje.hendelse.termin" />
                ) : (
                    <FormattedMessage id="tidslinje.hendelse.sistepermisjonsdag" />
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
