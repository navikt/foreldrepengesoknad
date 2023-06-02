import { BodyLong } from '@navikt/ds-react';
import { Block } from '@navikt/fp-common';
import { FormattedMessage } from 'react-intl';

const FrilansSpørsmålInfoBoksTekst = () => {
    return (
        <>
            <Block padBottom="m">
                <BodyLong>
                    <FormattedMessage id="arbeidsforhold.frilans.erFrilanser.infoboksTekst.liste.punkt1" />
                </BodyLong>
            </Block>
            <Block padBottom="m">
                <BodyLong>
                    <FormattedMessage id="arbeidsforhold.frilans.erFrilanser.infoboksTekst.liste.punkt2" />
                </BodyLong>
            </Block>
            <FormattedMessage
                id="arbeidsforhold.frilans.erFrilanser.infoboksTekst.liste.punkt3"
                values={{
                    a: (msg: any) => (
                        <a
                            className="lenke"
                            rel="noopener inoreferrer"
                            href="https://www.skatteetaten.no/bedrift-og-organisasjon/arbeidsgiver/a-meldingen/veiledning/arbeidsforholdet/type-arbeidsforhold/frilanser-oppdragstaker-og-personer-som-mottar-honorarer\"
                        >
                            {msg}
                        </a>
                    ),
                }}
            />
        </>
    );
};
export default FrilansSpørsmålInfoBoksTekst;
