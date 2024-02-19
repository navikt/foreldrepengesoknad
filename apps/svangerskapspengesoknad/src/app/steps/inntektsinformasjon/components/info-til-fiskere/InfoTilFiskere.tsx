import { BodyLong, BodyShort, ExpansionCard, VStack } from '@navikt/ds-react';
import { links } from '@navikt/fp-constants';
import { FormattedMessage } from 'react-intl';

const InfoTilFiskere = () => {
    return (
        <ExpansionCard size="small" aria-label="Info til fiskere">
            <ExpansionCard.Header>
                <ExpansionCard.Title size="small" as="h3">
                    <FormattedMessage id="inntektsinformasjon.infoTilFiskere.tittel" />
                </ExpansionCard.Title>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <VStack gap="4">
                    <BodyLong>
                        <FormattedMessage id="inntektsinformasjon.infoTilFiskere.del1" />
                    </BodyLong>
                    <div>
                        <BodyShort as="h4" style={{ marginBottom: '.5rem', fontWeight: 'bold' }}>
                            <FormattedMessage id="inntektsinformasjon.infoTilFiskere.hyre" />
                        </BodyShort>
                        <BodyLong>
                            <FormattedMessage id="inntektsinformasjon.infoTilFiskere.del2" />
                        </BodyLong>
                    </div>
                    <BodyLong>
                        <FormattedMessage
                            id="inntektsinformasjon.infoTilFiskere.del3"
                            values={{
                                a: (msg: any) => (
                                    <a
                                        href={links.hvordanSendeInntektsmelding}
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
                    <div>
                        <BodyShort as="h4" style={{ marginBottom: '.5rem', fontWeight: 'bold' }}>
                            <FormattedMessage id="inntektsinformasjon.infoTilFiskere.lott" />
                        </BodyShort>
                        <BodyLong>
                            <FormattedMessage id="inntektsinformasjon.infoTilFiskere.del4" />
                        </BodyLong>
                    </div>
                    <BodyLong>
                        <FormattedMessage
                            id="inntektsinformasjon.infoTilFiskere.del5"
                            values={{
                                a: (msg: any) => (
                                    <a href={links.omLottOgHyre} target="_blank" rel="noreferrer" className="lenke">
                                        {msg}
                                    </a>
                                ),
                            }}
                        />
                    </BodyLong>
                    <div>
                        <BodyShort as="h4" style={{ marginBottom: '.5rem', fontWeight: 'bold' }}>
                            <FormattedMessage id="inntektsinformasjon.infoTilFiskere.egenBåt" />
                        </BodyShort>
                        <BodyLong>
                            <FormattedMessage id="inntektsinformasjon.infoTilFiskere.del6" />
                        </BodyLong>
                    </div>
                    <div>
                        <BodyShort as="h4" style={{ marginBottom: '.5rem', fontWeight: 'bold' }}>
                            <FormattedMessage id="inntektsinformasjon.infoTilFiskere.lottOgHyre" />
                        </BodyShort>
                        <BodyLong>
                            <FormattedMessage id="inntektsinformasjon.infoTilFiskere.del7" />
                        </BodyLong>
                    </div>
                    <BodyLong>
                        <FormattedMessage id="inntektsinformasjon.infoTilFiskere.del8" />
                    </BodyLong>
                    <BodyLong>
                        <FormattedMessage id="inntektsinformasjon.infoTilFiskere.del9" />
                    </BodyLong>
                    <BodyLong>
                        <FormattedMessage
                            id="inntektsinformasjon.infoTilFiskere.del10"
                            values={{
                                a: (msg: any) => (
                                    <a href={links.omLottOgHyre} target="_blank" rel="noreferrer" className="lenke">
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

export default InfoTilFiskere;
