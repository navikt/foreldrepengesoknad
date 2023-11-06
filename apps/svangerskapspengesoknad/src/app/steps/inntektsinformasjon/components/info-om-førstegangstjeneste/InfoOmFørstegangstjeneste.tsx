import { FormattedMessage } from 'react-intl';
import { Block } from '@navikt/fp-common';
import links from 'app/links/links';
import { BodyLong, ExpansionCard } from '@navikt/ds-react';

const InfoOmFørstegangstjeneste = () => {
    return (
        <ExpansionCard size="small" aria-label="Er du i førstegangstjeneste?">
            <ExpansionCard.Header>
                <ExpansionCard.Title size="small" as="h2">
                    <FormattedMessage id="inntektsinformasjon.infoOmFørstegangstjeneste.tittel" />
                </ExpansionCard.Title>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <Block padBottom="l">
                    <BodyLong>
                        <FormattedMessage id="inntektsinformasjon.infoOmFørstegangstjeneste.content.del1" />
                    </BodyLong>
                </Block>
                <Block padBottom="l">
                    <BodyLong>
                        <FormattedMessage
                            id="inntektsinformasjon.infoOmFørstegangstjeneste.content.del2"
                            values={{
                                a: (msg: any) => (
                                    <a href={links.papirsøknad} target="_blank" rel="noreferrer" className="lenke">
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
                </Block>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};

export default InfoOmFørstegangstjeneste;
