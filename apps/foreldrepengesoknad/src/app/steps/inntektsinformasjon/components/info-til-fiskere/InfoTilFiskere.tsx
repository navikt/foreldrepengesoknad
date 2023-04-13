import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Block, intlUtils, UtvidetInformasjon } from '@navikt/fp-common';
import links from 'app/links/links';
import { BodyLong, Label } from '@navikt/ds-react';

const InfoTilFiskere = () => {
    const intl = useIntl();

    return (
        <UtvidetInformasjon apneLabel={intlUtils(intl, 'inntektsinformasjon.infoTilFiskere.apneLabel')}>
            <div style={{ backgroundColor: '#f1f1f1', padding: '1.5rem' }}>
                <Block padBottom="m">
                    <BodyLong>
                        <FormattedMessage id="inntektsinformasjon.infoTilFiskere.del1" />
                    </BodyLong>
                </Block>
                <Label as="h3" style={{ marginBottom: '.5rem' }}>
                    <FormattedMessage id="inntektsinformasjon.infoTilFiskere.hyre" />
                </Label>
                <Block padBottom="m">
                    <BodyLong>
                        <FormattedMessage id="inntektsinformasjon.infoTilFiskere.del2" />
                    </BodyLong>
                </Block>
                <Block padBottom="m">
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
                <Label as="h3" style={{ marginBottom: '.5rem' }}>
                    <FormattedMessage id="inntektsinformasjon.infoTilFiskere.lott" />
                </Label>
                <Block padBottom="m">
                    <BodyLong>
                        <FormattedMessage id="inntektsinformasjon.infoTilFiskere.del4" />
                    </BodyLong>
                </Block>
                <Block padBottom="m">
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
                <Label as="h3" style={{ marginBottom: '.5rem' }}>
                    <FormattedMessage id="inntektsinformasjon.infoTilFiskere.egenBåt" />
                </Label>
                <Block padBottom="m">
                    <BodyLong>
                        <FormattedMessage id="inntektsinformasjon.infoTilFiskere.del6" />
                    </BodyLong>
                </Block>
                <Label as="h3" style={{ marginBottom: '.5rem' }}>
                    <FormattedMessage id="inntektsinformasjon.infoTilFiskere.lottOgHyre" />
                </Label>
                <Block padBottom="m">
                    <BodyLong>
                        <FormattedMessage id="inntektsinformasjon.infoTilFiskere.del7" />
                    </BodyLong>
                </Block>
                <Block padBottom="m">
                    <BodyLong>
                        <FormattedMessage id="inntektsinformasjon.infoTilFiskere.del8" />
                    </BodyLong>
                </Block>
                <Block padBottom="m">
                    <BodyLong>
                        <FormattedMessage id="inntektsinformasjon.infoTilFiskere.del9" />
                    </BodyLong>
                </Block>
                <Block margin="none">
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
            </div>
        </UtvidetInformasjon>
    );
};

export default InfoTilFiskere;
