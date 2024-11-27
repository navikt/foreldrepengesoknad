import { FormattedMessage, useIntl } from 'react-intl';

import { Detail, Heading } from '@navikt/ds-react';

import { BluePanel } from '@navikt/fp-ui';
import { formatDateMedUkedag, getNavnGenitivEierform } from '@navikt/fp-utils';

interface Props {
    morsSisteDag: Date;
    navnMor: string;
}

export const MorsSisteDag = ({ morsSisteDag, navnMor }: Props) => {
    const intl = useIntl();
    const sisteDagFormattert = formatDateMedUkedag(morsSisteDag);
    const morsNavnGenitivForm = getNavnGenitivEierform(navnMor, intl.locale);

    return (
        <BluePanel>
            <Heading size="xsmall">
                <FormattedMessage
                    id="fordeling.morsSisteDag.tittel"
                    values={{ navnMor: morsNavnGenitivForm, dato: sisteDagFormattert }}
                ></FormattedMessage>
            </Heading>
            <Detail>
                <FormattedMessage id="fordeling.morsSisteDag.tekst" values={{ navnMor }}></FormattedMessage>
            </Detail>
        </BluePanel>
    );
};
