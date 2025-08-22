import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, Link, ReadMore, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { loggAmplitudeEvent } from '@navikt/fp-metrics';

export const HvemKanDriveMedEgenNæring = () => {
    const intl = useIntl();

    return (
        <ReadMore
            onOpenChange={(open) =>
                loggAmplitudeEvent({
                    origin: 'svangerskapspengesoknad',
                    eventName: open ? 'readmore åpnet' : 'readmore lukket',
                    eventData: { tittel: 'inntektsinformasjon.harJobbetSomSelvstendigNæringsdrivende.apneLabel' },
                })
            }
            header={intl.formatMessage({ id: 'inntektsinformasjon.harJobbetSomSelvstendigNæringsdrivende.apneLabel' })}
        >
            <VStack gap="space-8">
                <BodyShort>
                    <FormattedMessage id="inntektsinformasjon.harJobbetSomSelvstendigNæringsdrivende.infoboks.del1" />
                </BodyShort>
                <BodyShort>
                    <FormattedMessage
                        id="inntektsinformasjon.harJobbetSomSelvstendigNæringsdrivende.infoboks.del2"
                        values={{
                            a: (msg) => (
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
