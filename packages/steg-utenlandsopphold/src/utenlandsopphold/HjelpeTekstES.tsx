import { FormattedMessage, useIntl } from 'react-intl';

import { BodyLong, BodyShort, ExpansionCard, Heading, Link, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';

export const HjelpeTekstES = () => {
    const intl = useIntl();

    return (
        <ExpansionCard
            size="small"
            aria-label={intl.formatMessage({ id: 'UtenlandsoppholdSteg.HjelpeTekstES.Tittel' })}
        >
            <ExpansionCard.Header>
                <ExpansionCard.Title size="small">
                    <FormattedMessage id="UtenlandsoppholdSteg.HjelpeTekstES.Tittel" />
                </ExpansionCard.Title>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <VStack gap="space-40">
                    <VStack gap="space-20">
                        <BodyLong>
                            <FormattedMessage id="UtenlandsoppholdSteg.HjelpeTekstES.Del1.1" />
                        </BodyLong>
                    </VStack>
                    <VStack gap="space-20">
                        <Heading size="small" level="4">
                            <FormattedMessage id="UtenlandsoppholdSteg.HjelpeTekstES.Del2.Undertittel" />
                        </Heading>
                        <BodyLong>
                            <FormattedMessage id="UtenlandsoppholdSteg.HjelpeTekstES.Del2.1" />
                        </BodyLong>
                        <BodyLong>
                            <FormattedMessage id="UtenlandsoppholdSteg.HjelpeTekstES.Del2.2" />
                        </BodyLong>
                        <BodyLong>
                            <FormattedMessage id="UtenlandsoppholdSteg.HjelpeTekstES.Del2.3" />
                        </BodyLong>
                        <BodyLong>
                            <FormattedMessage id="UtenlandsoppholdSteg.HjelpeTekstES.Del2.4" />
                        </BodyLong>

                        <BodyShort>
                            <FormattedMessage
                                id="UtenlandsoppholdSteg.HjelpeTekstES.Del2.5"
                                values={{
                                    a: (value) => (
                                        <Link href={links.engangsstonadHvem} target="_blank">
                                            {value}
                                        </Link>
                                    ),
                                }}
                            />
                        </BodyShort>
                    </VStack>
                </VStack>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};
