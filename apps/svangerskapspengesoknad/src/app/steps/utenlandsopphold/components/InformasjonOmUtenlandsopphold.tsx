import { BodyLong, BodyShort, ExpansionCard, Heading, Link } from '@navikt/ds-react';
import { Block } from '@navikt/fp-common';
import { FormattedMessage } from 'react-intl';

const InformasjonOmUtenlandsopphold = () => {
    return (
        <ExpansionCard size="small" aria-label="Informasjon om utenlandsopphold">
            <ExpansionCard.Header>
                <ExpansionCard.Title size="small" as="h2">
                    <FormattedMessage id="utenlandsopphold.oppholdOgStøtte.header.tittel" />
                </ExpansionCard.Title>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <Block padBottom="l">
                    <BodyLong>
                        <FormattedMessage id="utenlandsopphold.oppholdOgStøtte.header.ingress" />
                    </BodyLong>
                </Block>
                <Block padBottom="l">
                    <BodyLong>
                        <FormattedMessage id="utenlandsopphold.oppholdOgStøtte.seksjon1" />
                    </BodyLong>
                </Block>
                <Block padBottom="l">
                    <BodyLong>
                        <FormattedMessage id="utenlandsopphold.oppholdOgStøtte.seksjon2" />
                    </BodyLong>
                </Block>
                <Block padBottom="xl">
                    <BodyLong>
                        <FormattedMessage id="utenlandsopphold.oppholdOgStøtte.seksjon3" />
                    </BodyLong>
                </Block>
                <Block padBottom="l">
                    <Heading as="h4" size="small">
                        <FormattedMessage id="utenlandsopphold.oppholdOgStøtte.undertittel" />
                    </Heading>
                </Block>
                <Block padBottom="l">
                    <BodyLong>
                        <FormattedMessage id="utenlandsopphold.oppholdOgStøtte.seksjon4" />
                    </BodyLong>
                </Block>
                <BodyShort>
                    <FormattedMessage
                        id="utenlandsopphold.oppholdOgStøtte.seksjon5"
                        values={{
                            a: (msg: any) => (
                                <Link href="https://nav.no/foreldrepenger#utland" rel="noreferrer" target="_blank">
                                    {msg}
                                </Link>
                            ),
                        }}
                    />
                </BodyShort>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};

export default InformasjonOmUtenlandsopphold;
