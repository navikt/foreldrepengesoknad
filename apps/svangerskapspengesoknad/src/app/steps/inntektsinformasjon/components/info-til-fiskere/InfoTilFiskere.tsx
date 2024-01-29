import { FormattedMessage } from 'react-intl';
import { Block } from '@navikt/fp-common';
import { BodyLong, BodyShort, ExpansionCard } from '@navikt/ds-react';
import { links } from '@navikt/fp-constants';

const InfoTilFiskere = () => {
    return (
        <ExpansionCard size="small" aria-label="Info til fiskere">
            <ExpansionCard.Header>
                <ExpansionCard.Title size="small" as="h3">
                    <FormattedMessage id="inntektsinformasjon.infoTilFiskere.tittel" />
                </ExpansionCard.Title>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <Block padBottom="l">
                    <BodyLong>
                        <FormattedMessage id="inntektsinformasjon.infoTilFiskere.del1" />
                    </BodyLong>
                </Block>
                <BodyShort as="h4" style={{ marginBottom: '.5rem', fontWeight: 'bold' }}>
                    <FormattedMessage id="inntektsinformasjon.infoTilFiskere.hyre" />
                </BodyShort>
                <Block padBottom="l">
                    <BodyLong>
                        <FormattedMessage id="inntektsinformasjon.infoTilFiskere.del2" />
                    </BodyLong>
                </Block>
                <Block padBottom="l">
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
                </Block>
                <BodyShort as="h4" style={{ marginBottom: '.5rem', fontWeight: 'bold' }}>
                    <FormattedMessage id="inntektsinformasjon.infoTilFiskere.lott" />
                </BodyShort>
                <Block padBottom="l">
                    <BodyLong>
                        <FormattedMessage id="inntektsinformasjon.infoTilFiskere.del4" />
                    </BodyLong>
                </Block>
                <Block padBottom="l">
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
                </Block>
                <BodyShort as="h4" style={{ marginBottom: '.5rem', fontWeight: 'bold' }}>
                    <FormattedMessage id="inntektsinformasjon.infoTilFiskere.egenBåt" />
                </BodyShort>
                <Block padBottom="l">
                    <BodyLong>
                        <FormattedMessage id="inntektsinformasjon.infoTilFiskere.del6" />
                    </BodyLong>
                </Block>
                <BodyShort as="h4" style={{ marginBottom: '.5rem', fontWeight: 'bold' }}>
                    <FormattedMessage id="inntektsinformasjon.infoTilFiskere.lottOgHyre" />
                </BodyShort>
                <Block padBottom="l">
                    <BodyLong>
                        <FormattedMessage id="inntektsinformasjon.infoTilFiskere.del7" />
                    </BodyLong>
                </Block>
                <Block padBottom="l">
                    <BodyLong>
                        <FormattedMessage id="inntektsinformasjon.infoTilFiskere.del8" />
                    </BodyLong>
                </Block>
                <Block padBottom="l">
                    <BodyLong>
                        <FormattedMessage id="inntektsinformasjon.infoTilFiskere.del9" />
                    </BodyLong>
                </Block>
                <Block margin="none">
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
                </Block>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};

export default InfoTilFiskere;
