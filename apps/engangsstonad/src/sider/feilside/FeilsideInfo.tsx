import { Locale } from '@navikt/fp-common';
import { links } from '@navikt/fp-constants';
import Feilside from '../../fpcommon/feilside/Feilside';
import { useCustomIntl } from '@navikt/fp-ui';

export interface Props {
    locale: Locale;
    onChangeLocale: (locale: Locale) => void;
}

const FeilsideInfo: React.FunctionComponent<Props> = ({ locale, onChangeLocale }) => {
    const { i18n } = useCustomIntl();
    return (
        <Feilside
            dokumenttittel={i18n('Søknad.Pageheading')}
            ingress=""
            tittel=""
            illustrasjon={{
                tittel: i18n('FeilsideInfo.GenerellFeil.Tittel'),
                tekst: i18n('FeilsideInfo.GenerellFeil.Ingress'),
                veileder: {
                    ansikt: 'skeptisk',
                },
                lenke: {
                    tekst: i18n('FeilsideInfo.GenerellFeil.Brukerstøtte'),
                    url: links.brukerstøtte,
                },
            }}
            setLanguage={onChangeLocale}
            språkkode={locale}
        />
    );
};

export default FeilsideInfo;
