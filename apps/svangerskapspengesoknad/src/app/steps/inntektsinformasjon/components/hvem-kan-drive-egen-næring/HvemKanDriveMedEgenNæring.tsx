import { BodyShort, Link, ReadMore, VStack } from '@navikt/ds-react';
import { links } from '@navikt/fp-constants';

import { FormattedMessage, useIntl } from 'react-intl';

const HvemKanDriveMedEgenNæring = () => {
    const intl = useIntl();

    return (
        <ReadMore
            header={intl.formatMessage({ id: 'inntektsinformasjon.harJobbetSomSelvstendigNæringsdrivende.apneLabel' })}
        >
            <VStack gap="2">
                <BodyShort>
                    <FormattedMessage id="inntektsinformasjon.harJobbetSomSelvstendigNæringsdrivende.infoboks.del1" />
                </BodyShort>
                <BodyShort>
                    <FormattedMessage
                        id="inntektsinformasjon.harJobbetSomSelvstendigNæringsdrivende.infoboks.del2"
                        values={{
                            a: (msg: any) => (
                                <Link href={links.næringsdrivendeInfoBoks} rel="noreferrer" target="_blank">
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

export default HvemKanDriveMedEgenNæring;
