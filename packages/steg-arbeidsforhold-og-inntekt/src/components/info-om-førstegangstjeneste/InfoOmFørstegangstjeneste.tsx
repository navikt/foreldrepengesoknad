import { FormattedMessage } from 'react-intl';

import { BodyLong, ExpansionCard, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';

const InfoOmFørstegangstjeneste = () => {
    return (
        <ExpansionCard size="small" aria-label="Informasjon til deg som er i førstegangstjenesten">
            <ExpansionCard.Header>
                <ExpansionCard.Title size="small" as="h3">
                    <FormattedMessage id="inntektsinformasjon.infoOmFørstegangstjeneste.tittel" />
                </ExpansionCard.Title>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <VStack gap="4">
                    <BodyLong>
                        <FormattedMessage id="inntektsinformasjon.infoOmFørstegangstjeneste.content.del1" />
                    </BodyLong>
                    <BodyLong>
                        <FormattedMessage
                            id="inntektsinformasjon.infoOmFørstegangstjeneste.content.del2"
                            values={{
                                a: (msg: any) => (
                                    <a href={links.papirsøknadSvp} target="_blank" rel="noreferrer" className="lenke">
                                        {msg}
                                    </a>
                                ),
                                b: (msg: any) => (
                                    <a
                                        href={links.arbeidstilsynetSkjema}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="lenke"
                                    >
                                        {msg}
                                    </a>
                                ),
                            }}
                        />
                    </BodyLong>
                </VStack>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};

export default InfoOmFørstegangstjeneste;
