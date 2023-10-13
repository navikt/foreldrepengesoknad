import { useIntl } from 'react-intl';
import { Locale } from '@navikt/fp-common';
import { links } from '@navikt/fp-constants';
import Feilside from '../../fpcommon/feilside/Feilside';

export interface Props {
    locale: Locale;
    onChangeLocale: (locale: Locale) => void;
}

const FeilsideInfo: React.FunctionComponent<Props> = ({ locale, onChangeLocale }) => {
    const intl = useIntl();
    return (
        <Feilside
            dokumenttittel={intl.formatMessage({ id: 'Søknad.Pageheading' })}
            ingress=""
            tittel=""
            illustrasjon={{
                tittel: intl.formatMessage({ id: 'FeilsideInfo.GenerellFeil.Tittel' }),
                tekst: intl.formatMessage({ id: 'FeilsideInfo.GenerellFeil.Ingress' }),
                veileder: {
                    ansikt: 'skeptisk',
                },
                lenke: {
                    tekst: intl.formatMessage({ id: 'FeilsideInfo.GenerellFeil.Brukerstøtte' }),
                    url: links.brukerstøtte,
                },
            }}
            setLanguage={onChangeLocale}
            språkkode={locale}
        />
    );
};

export default FeilsideInfo;
