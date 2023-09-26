import { useIntl } from 'react-intl';
import { Locale } from '@navikt/fp-common';
import { lenker } from 'fpcommon/util/lenker';
import Feilside from 'fpcommon/components/feilside/Feilside';

export interface Props {
    locale: Locale;
    onChangeLocale: (locale: Locale) => void;
}

const FeilsideInfo: React.FunctionComponent<Props> = ({ locale, onChangeLocale }) => {
    const intl = useIntl();
    return (
        <Feilside
            dokumenttittel="NAV Engangsstønad"
            ingress=""
            tittel=""
            illustrasjon={{
                tittel: intl.formatMessage({ id: 'intro.generellFeil.tittel' }),
                tekst: intl.formatMessage({ id: 'intro.generellFeil.ingress' }),
                veileder: {
                    ansikt: 'skeptisk',
                },
                lenke: {
                    tekst: intl.formatMessage({ id: 'intro.generellFeil.brukerstøtte' }),
                    url: lenker.brukerstøtte,
                },
            }}
            setLanguage={onChangeLocale}
            språkkode={locale}
        />
    );
};

export default FeilsideInfo;
