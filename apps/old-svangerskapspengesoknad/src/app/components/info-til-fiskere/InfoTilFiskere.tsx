import Block from 'common/components/block/Block';
import { FormattedMessage } from 'react-intl';
import UtvidetInformasjon from '../utvidet-informasjon/UtvidetInformasjon';
import { Heading } from '@navikt/ds-react';

const InfoTilFiskere = () => {
    return (
        <UtvidetInformasjon apneLabel="Er du fisker? Les hvordan du skal fylle ut søknaden">
            <div style={{ backgroundColor: '#e9e7e7', padding: '1.5rem' }}>
                <Block margin="xs">
                    <FormattedMessage id="andreInntekter.infoTilFiskere.del1" />
                </Block>
                <Heading size="small">
                    <FormattedMessage id="andreInntekter.infoTilFiskere.hyre" />
                </Heading>
                <Block margin="xs">
                    <FormattedMessage id="andreInntekter.infoTilFiskere.del2" />
                </Block>
                <Block margin="xs">
                    <FormattedMessage
                        id="andreInntekter.infoTilFiskere.del3"
                        values={{
                            a: (msg: any) => (
                                <a
                                    className="lenke"
                                    rel="noopener noreferrer"
                                    href="https://www.nav.no/no/bedrift/tjenester-og-skjemaer/nav-og-altinn-tjenester/foreldrepenger-og-svangerskapspenger2"
                                    target="_blank"
                                >
                                    {msg}
                                </a>
                            ),
                        }}
                    />
                </Block>
                <Heading size="small">
                    <FormattedMessage id="andreInntekter.infoTilFiskere.lott" />
                </Heading>
                <Block margin="xs">
                    <FormattedMessage id="andreInntekter.infoTilFiskere.del4" />
                </Block>
                <Block margin="xs">
                    <FormattedMessage
                        id="andreInntekter.infoTilFiskere.del5"
                        values={{
                            a: (msg: any) => (
                                <a
                                    className="lenke"
                                    rel="noopener noreferrer"
                                    href="https://www.skatteetaten.no/rettskilder/type/handboker/skatte-abc/2019/fiske/F-14.014/F-14.048/"
                                    target="_blank"
                                >
                                    {msg}
                                </a>
                            ),
                        }}
                    />
                </Block>
                <Heading size="small">
                    <FormattedMessage id="andreInntekter.infoTilFiskere.egenBåt" />
                </Heading>
                <Block margin="xs">
                    <FormattedMessage id="andreInntekter.infoTilFiskere.del6" />
                </Block>
                <Heading size="small">
                    <FormattedMessage id="andreInntekter.infoTilFiskere.lottOgHyre" />
                </Heading>
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
                                <a
                                    className="lenke"
                                    rel="noopener noreferrer"
                                    href="https://www.skatteetaten.no/rettskilder/type/handboker/skatte-abc/2019/fiske/F-14.014/F-14.048/"
                                    target="_blank"
                                >
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
