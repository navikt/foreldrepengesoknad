import React from 'react';
import UtvidetInformasjon from 'app/components/elementer/utvidetinformasjon/UtvidetInformasjon';
import { Undertittel } from 'nav-frontend-typografi';
import Block from 'common/components/block/Block';
import { FormattedMessage } from 'react-intl';
import lenker from 'app/util/routing/lenker';

const InfoTilFiskere = () => {
    return (
        <UtvidetInformasjon apneLabel="Er du fisker? Les hvordan du skal fylle ut søknaden">
            <div style={{ backgroundColor: '#e9e7e7', padding: '1.5rem' }}>
                <Block margin="xs">
                    <FormattedMessage id="andreInntekter.infoTilFiskere.del1" />
                </Block>
                <Undertittel>
                    <FormattedMessage id="andreInntekter.infoTilFiskere.hyre" />
                </Undertittel>
                <Block margin="xs">
                    <FormattedMessage id="andreInntekter.infoTilFiskere.del2" />
                </Block>
                <Block margin="xs">
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
                </Block>
                <Undertittel>
                    <FormattedMessage id="andreInntekter.infoTilFiskere.lott" />
                </Undertittel>
                <Block margin="xs">
                    <FormattedMessage id="andreInntekter.infoTilFiskere.del4" />
                </Block>
                <Block margin="xs">
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
                </Block>
                <Undertittel>
                    <FormattedMessage id="andreInntekter.infoTilFiskere.egenBåt" />
                </Undertittel>
                <Block margin="xs">
                    <FormattedMessage id="andreInntekter.infoTilFiskere.del6" />
                </Block>
                <Undertittel>
                    <FormattedMessage id="andreInntekter.infoTilFiskere.lottOgHyre" />
                </Undertittel>
                <Block margin="xs">
                    <FormattedMessage id="andreInntekter.infoTilFiskere.del7" />
                </Block>
                <Block margin="xs">
                    <FormattedMessage id="andreInntekter.infoTilFiskere.del8" />
                </Block>
                <Block margin="xs">
                    <FormattedMessage id="andreInntekter.infoTilFiskere.del9" />
                </Block>
                <Block margin="none">
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
                </Block>
            </div>
        </UtvidetInformasjon>
    );
};

export default InfoTilFiskere;
