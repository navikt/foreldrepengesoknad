import { FormattedMessage, useIntl } from 'react-intl';

import { BodyLong, BodyShort, ExpansionCard, Heading, Link, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';

interface Props {
    stonadstype: 'Foreldrepenger' | 'Svangerskapspenger';
}

export const HjelpeTekstFelles = ({ stonadstype }: Props) => {
    const intl = useIntl();
    return (
        <ExpansionCard
            size="small"
            aria-label={intl.formatMessage({ id: 'UtenlandsoppholdSteg.HjelpeTekstFelles.Tittel' })}
        >
            <ExpansionCard.Header>
                <ExpansionCard.Title size="small">
                    <FormattedMessage id="UtenlandsoppholdSteg.HjelpeTekstFelles.Tittel" />
                </ExpansionCard.Title>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <VStack gap="10">
                    <VStack gap="5">
                        <BodyLong>
                            <FormattedMessage id="UtenlandsoppholdSteg.HjelpeTekstFelles.Del1.1" />
                        </BodyLong>
                        <BodyLong>
                            <FormattedMessage id="UtenlandsoppholdSteg.HjelpeTekstFelles.Del1.2" />
                        </BodyLong>
                        <BodyLong>
                            <FormattedMessage id="UtenlandsoppholdSteg.HjelpeTekstFelles.Del1.3" />
                        </BodyLong>
                        <BodyLong>
                            <FormattedMessage id="UtenlandsoppholdSteg.HjelpeTekstFelles.Del1.4" />
                        </BodyLong>
                    </VStack>
                    <VStack gap="5">
                        <Heading size="small" level="4">
                            <FormattedMessage id="UtenlandsoppholdSteg.HjelpeTekstFelles.Del2.Undertittel" />
                        </Heading>
                        <BodyLong>
                            <FormattedMessage id="UtenlandsoppholdSteg.HjelpeTekstFelles.Del2.1" />
                        </BodyLong>

                        <BodyShort>
                            {stonadstype === 'Foreldrepenger' && (
                                <FormattedMessage
                                    id="UtenlandsoppholdSteg.HjelpeTekstFelles.Del2.2.fp"
                                    values={{
                                        a: (value) => (
                                            <Link href={links.foreldrepengerUtland} target="_blank">
                                                {value}
                                            </Link>
                                        ),
                                    }}
                                />
                            )}
                            {stonadstype === 'Svangerskapspenger' && (
                                <FormattedMessage
                                    id="UtenlandsoppholdSteg.HjelpeTekstFelles.Del2.2.svp"
                                    values={{
                                        a: (value) => (
                                            <Link href={links.svangerskapspengerUtland} target="_blank">
                                                {value}
                                            </Link>
                                        ),
                                    }}
                                />
                            )}
                        </BodyShort>
                    </VStack>
                </VStack>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};
