import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import { getNavnGenitivEierform } from '@navikt/fp-common';
import { bemUtils } from '@navikt/fp-utils';
import { formatDateMedUkedag } from '@navikt/fp-utils/src/dateUtils';

import './mors-siste-dag.css';

interface Props {
    morsSisteDag: Date;
    navnMor: string;
}

const MorsSisteDag: React.FunctionComponent<Props> = ({ morsSisteDag, navnMor }) => {
    const intl = useIntl();
    const bem = bemUtils('morsSisteDag');
    const sisteDagFormattert = formatDateMedUkedag(morsSisteDag);
    const morsNavnGenitivForm = getNavnGenitivEierform(navnMor, intl.locale);

    return (
        <div className={bem.block}>
            <BodyShort className={bem.element('tittel')}>
                <FormattedMessage
                    id="fordeling.morsSisteDag.tittel"
                    values={{ navnMor: morsNavnGenitivForm, dato: sisteDagFormattert }}
                ></FormattedMessage>
            </BodyShort>
            <BodyShort className={bem.element('tekst')}>
                <FormattedMessage id="fordeling.morsSisteDag.tekst" values={{ navnMor }}></FormattedMessage>
            </BodyShort>
        </div>
    );
};

export default MorsSisteDag;
