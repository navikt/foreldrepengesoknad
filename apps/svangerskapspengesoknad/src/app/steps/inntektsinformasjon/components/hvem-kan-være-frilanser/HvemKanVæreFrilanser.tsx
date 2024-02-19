import { BodyShort, Link, ReadMore, VStack } from '@navikt/ds-react';
import { links } from '@navikt/fp-constants';

import { FormattedMessage, useIntl } from 'react-intl';

const HvemKanVæreFrilanser = () => {
    const intl = useIntl();

    return (
        <ReadMore header={intl.formatMessage({ id: 'inntektsinformasjon.harDuJobbetSomFrilans.apneLabel' })}>
            <VStack gap="2">
                <BodyShort>
                    <FormattedMessage id="inntektsinformasjon.harDuJobbetSomFrilans.infoboksTekst.del1" />
                </BodyShort>
                <BodyShort>
                    <FormattedMessage id="inntektsinformasjon.harDuJobbetSomFrilans.infoboksTekst.del2" />
                </BodyShort>
                <BodyShort>
                    <FormattedMessage
                        id="inntektsinformasjon.harDuJobbetSomFrilans.infoboksTekst.del3"
                        values={{
                            a: (msg) => (
                                <Link href={links.frilanserInfoBoks} rel="noreferrer" target="_blank">
                                    {msg}
                                </Link>
                            ),
                        }}
                    />
                </BodyShort>
            </VStack>
        </ReadMore>
    );
};

export default HvemKanVæreFrilanser;
