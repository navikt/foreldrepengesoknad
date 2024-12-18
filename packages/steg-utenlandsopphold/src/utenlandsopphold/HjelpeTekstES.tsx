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
                <VStack gap="10">
                    <VStack gap="5">
                        <BodyLong>
                            <FormattedMessage id="UtenlandsoppholdSteg.HjelpeTekstES.Del1.1" />
                        </BodyLong>
                    </VStack>
                    <VStack gap="5">
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
('UtenlandsoppholdSteg.HjelpeTekstES.Tittel');
('UtenlandsoppholdSteg.HjelpeTekstES.Del1.1');
('UtenlandsoppholdSteg.HjelpeTekstES.Del2.Undertittel');
('UtenlandsoppholdSteg.HjelpeTekstES.Del2.1');
('UtenlandsoppholdSteg.HjelpeTekstES.Del2.2');
('UtenlandsoppholdSteg.HjelpeTekstES.Del2.3');
('UtenlandsoppholdSteg.HjelpeTekstES.Del2.4');
('UtenlandsoppholdSteg.HjelpeTekstES.Del2.5');
('UtenlandsoppholdSteg.HjelpeTekstES.Del2.5.lenke.es');
