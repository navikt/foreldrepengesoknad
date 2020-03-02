import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from '../../common/components/skjema/elements/ja-nei-spørsmål/JaNeiSpørsmål';

interface BoddINorgeSiste12MndSpørsmålProps {
    iNorgeSiste12?: boolean;
    onChange: (iNorgeSiste12: boolean) => void;
}

type Props = BoddINorgeSiste12MndSpørsmålProps & InjectedIntlProps;

const BoddINorgeSiste12MndSpørsmål = (props: Props) => {
    const { onChange, iNorgeSiste12, intl } = props;

    return (
        <JaNeiSpørsmål
            spørsmål={getMessage(intl, 'boddINorgeSiste12Mnd.spørsmål')}
            navn="boddINorgeSiste12Mnd"
            valgtVerdi={iNorgeSiste12}
            labels={{
                ja: getMessage(intl, 'boddINorgeSiste12Mnd.alternativ.boddINorge'),
                nei: getMessage(intl, 'boddINorgeSiste12Mnd.alternativ.boddIUtlandet')
            }}
            onChange={(verdi) => onChange(verdi)}
            hjelpetekst={getMessage(intl, 'utenlandsopphold.siste12MånederInfotekst')}
        />
    );
};

export default injectIntl(BoddINorgeSiste12MndSpørsmål);
