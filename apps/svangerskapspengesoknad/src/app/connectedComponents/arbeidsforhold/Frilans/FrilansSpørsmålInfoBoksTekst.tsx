import { FormattedMessage } from 'react-intl';

const FrilansSpørsmålInfoBoksTekst = () => {
    return (
        <>
            <FormattedMessage id="arbeidsforhold.frilans.erFrilanser.infoboksTekst.title" />
            <ul>
                <FormattedMessage tagName="li" id="arbeidsforhold.frilans.erFrilanser.infoboksTekst.liste.punkt1" />
                <FormattedMessage tagName="li" id="arbeidsforhold.frilans.erFrilanser.infoboksTekst.liste.punkt2" />
                <FormattedMessage tagName="li" id="arbeidsforhold.frilans.erFrilanser.infoboksTekst.liste.punkt3" />
                <FormattedMessage tagName="li" id="arbeidsforhold.frilans.erFrilanser.infoboksTekst.liste.punkt4" />
                <FormattedMessage tagName="li" id="arbeidsforhold.frilans.erFrilanser.infoboksTekst.liste.punkt5" />
                <FormattedMessage tagName="li" id="arbeidsforhold.frilans.erFrilanser.infoboksTekst.liste.punkt6" />
                <FormattedMessage tagName="li" id="arbeidsforhold.frilans.erFrilanser.infoboksTekst.liste.punkt7" />
            </ul>
            <FormattedMessage
                id="arbeidsforhold.frilans.erFrilanser.infoboksTekst.link"
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
