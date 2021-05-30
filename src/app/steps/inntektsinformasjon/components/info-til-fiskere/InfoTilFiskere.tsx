import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { Block, intlUtils, UtvidetInformasjon } from '@navikt/fp-common';
import links from 'app/links/links';

const InfoTilFiskere = () => {
    const intl = useIntl();

    return (
        <UtvidetInformasjon apneLabel={intlUtils(intl, 'inntektsinformasjon.infoTilFiskere.apneLabel')}>
            <div style={{ backgroundColor: '#e9e7e7', padding: '1.5rem' }}>
                <Block padBottom="m">
                    <Normaltekst>
                        <FormattedMessage id="inntektsinformasjon.infoTilFiskere.del1" />
                    </Normaltekst>
                </Block>
                <Element tag="h3" style={{ marginBottom: '.5rem' }}>
                    <FormattedMessage id="inntektsinformasjon.infoTilFiskere.hyre" />
                </Element>
                <Block padBottom="m">
                    <Normaltekst>
                        <FormattedMessage id="inntektsinformasjon.infoTilFiskere.del2" />
                    </Normaltekst>
                </Block>
                <Block padBottom="m">
                    <Normaltekst>
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
                    </Normaltekst>
                </Block>
                <Element tag="h3" style={{ marginBottom: '.5rem' }}>
                    <FormattedMessage id="inntektsinformasjon.infoTilFiskere.lott" />
                </Element>
                <Block padBottom="m">
                    <Normaltekst>
                        <FormattedMessage id="inntektsinformasjon.infoTilFiskere.del4" />
                    </Normaltekst>
                </Block>
                <Block padBottom="m">
                    <Normaltekst>
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
                    </Normaltekst>
                </Block>
                <Element tag="h3" style={{ marginBottom: '.5rem' }}>
                    <FormattedMessage id="inntektsinformasjon.infoTilFiskere.egenBåt" />
                </Element>
                <Block padBottom="m">
                    <Normaltekst>
                        <FormattedMessage id="inntektsinformasjon.infoTilFiskere.del6" />
                    </Normaltekst>
                </Block>
                <Element tag="h3" style={{ marginBottom: '.5rem' }}>
                    <FormattedMessage id="inntektsinformasjon.infoTilFiskere.lottOgHyre" />
                </Element>
                <Block padBottom="m">
                    <Normaltekst>
                        <FormattedMessage id="inntektsinformasjon.infoTilFiskere.del7" />
                    </Normaltekst>
                </Block>
                <Block padBottom="m">
                    <Normaltekst>
                        <FormattedMessage id="inntektsinformasjon.infoTilFiskere.del8" />
                    </Normaltekst>
                </Block>
                <Block padBottom="m">
                    <Normaltekst>
                        <FormattedMessage id="inntektsinformasjon.infoTilFiskere.del9" />
                    </Normaltekst>
                </Block>
                <Block margin="none">
                    <Normaltekst>
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
                    </Normaltekst>
                </Block>
            </div>
        </UtvidetInformasjon>
    );
};

export default InfoTilFiskere;
