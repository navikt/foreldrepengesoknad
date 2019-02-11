import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from '../components/ja-nei-spørsmål/JaNeiSpørsmål';
import EksternUrl from 'common/components/infoboks/EksternUrl';
import lenker from '../util/routing/lenker';

interface HarDuJobbetSomFrilansSiste10MndSpørsmålProps {
    harJobbetSomFrilansSiste10Mnd: boolean;
    onChange: (erFrilanser: boolean) => void;
}

type Props = HarDuJobbetSomFrilansSiste10MndSpørsmålProps & InjectedIntlProps;

const HarDuJobbetSomFrilansSiste10MndSpørsmål = (props: Props) => {
    const { onChange, harJobbetSomFrilansSiste10Mnd, intl } = props;

    return (
        <JaNeiSpørsmål
            spørsmål={getMessage(intl, 'harDuJobbetSomFrilansSiste10Mnd.spørsmål')}
            navn="harJobbetSomFrilansSiste10Mnd"
            valgtVerdi={harJobbetSomFrilansSiste10Mnd}
            onChange={(verdi) => onChange(verdi)}
            hjelpetekst={
                <EksternUrl
                    tekst={'harDuJobbetSomFrilansSiste10Mnd.spørsmål.infoboksTekst'}
                    url={lenker.frilanserInfoBoks}
                    lenkeTekst={'hjemmeside'}
                />
            }
        />
    );
};

export default injectIntl(HarDuJobbetSomFrilansSiste10MndSpørsmål);
