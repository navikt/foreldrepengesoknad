import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Block from 'common/components/block/Block';
import UtvidetInformasjon from 'app/components/elementer/utvidetinformasjon/UtvidetInformasjon';
import lenker from 'app/util/routing/lenker';
import getMessage from 'common/util/i18nUtils';

const InfoTilFiskere = () => {
    const intl = useIntl();

    return (
        <UtvidetInformasjon apneLabel={getMessage(intl, 'andreInntekter.infoTilFiskere.apneLabel')}>
            <div style={{ backgroundColor: '#e9e7e7', padding: '1.5rem' }}>
                <Block margin="xs">
                    <Normaltekst>
                        <FormattedMessage id="andreInntekter.infoTilFiskere.del1" />
                    </Normaltekst>
                </Block>
                <Element tag="h3" style={{ marginBottom: '.5rem' }}>
                    <FormattedMessage id="andreInntekter.infoTilFiskere.hyre" />
                </Element>
                <Block margin="xs">
                    <Normaltekst>
                        <FormattedMessage id="andreInntekter.infoTilFiskere.del2" />
                    </Normaltekst>
                </Block>
                <Block margin="xs">
                    <Normaltekst>
                        <FormattedMessage
                            id="andreInntekter.infoTilFiskere.del3"
                            values={{
                                a: (msg: any) => (
                                    <a
                                        href={lenker.hvordanSendeInntektsmelding}
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
                    <FormattedMessage id="andreInntekter.infoTilFiskere.lott" />
                </Element>
                <Block margin="xs">
                    <Normaltekst>
                        <FormattedMessage id="andreInntekter.infoTilFiskere.del4" />
                    </Normaltekst>
                </Block>
                <Block margin="xs">
                    <Normaltekst>
                        <FormattedMessage
                            id="andreInntekter.infoTilFiskere.del5"
                            values={{
                                a: (msg: any) => (
                                    <a href={lenker.omLottOgHyre} target="_blank" rel="noreferrer" className="lenke">
                                        {msg}
                                    </a>
                                ),
                            }}
                        />
                    </Normaltekst>
                </Block>
                <Element tag="h3" style={{ marginBottom: '.5rem' }}>
                    <FormattedMessage id="andreInntekter.infoTilFiskere.egenBåt" />
                </Element>
                <Block margin="xs">
                    <Normaltekst>
                        <FormattedMessage id="andreInntekter.infoTilFiskere.del6" />
                    </Normaltekst>
                </Block>
                <Element tag="h3" style={{ marginBottom: '.5rem' }}>
                    <FormattedMessage id="andreInntekter.infoTilFiskere.lottOgHyre" />
                </Element>
                <Block margin="xs">
                    <Normaltekst>
                        <FormattedMessage id="andreInntekter.infoTilFiskere.del7" />
                    </Normaltekst>
                </Block>
                <Block margin="xs">
                    <Normaltekst>
                        <FormattedMessage id="andreInntekter.infoTilFiskere.del8" />
                    </Normaltekst>
                </Block>
                <Block margin="xs">
                    <Normaltekst>
                        <FormattedMessage id="andreInntekter.infoTilFiskere.del9" />
                    </Normaltekst>
                </Block>
                <Block margin="none">
                    <Normaltekst>
                        <FormattedMessage
                            id="andreInntekter.infoTilFiskere.del5"
                            values={{
                                a: (msg: any) => (
                                    <a href={lenker.omLottOgHyre} target="_blank" rel="noreferrer" className="lenke">
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
