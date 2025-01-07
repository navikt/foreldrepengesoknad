import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, Link, ReadMore, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { loggAmplitudeEvent } from '@navikt/fp-metrics';
import { AppName } from '@navikt/fp-types';

type Props = { appOrigin: AppName };
export const HvemKanVæreFrilanser = ({ appOrigin }: Props) => {
    const intl = useIntl();

    return (
        <ReadMore
            onOpenChange={(open) =>
                loggAmplitudeEvent({
                    origin: appOrigin,
                    eventName: open ? 'readmore åpnet' : 'readmore lukket',
                    eventData: { tittel: 'inntektsinformasjon.harDuJobbetSomFrilans.apneLabel' },
                })
            }
            header={intl.formatMessage({ id: 'inntektsinformasjon.harDuJobbetSomFrilans.apneLabel' })}
        >
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
