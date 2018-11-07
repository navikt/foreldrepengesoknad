import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from '../components/ja-nei-spørsmål/JaNeiSpørsmål';

interface HarDuJobbetSomSelvstendigNæringsdrivendeSiste10MndSpørsmålProps {
    harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: boolean;
    onChange: (harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: boolean) => void;
}

type Props = HarDuJobbetSomSelvstendigNæringsdrivendeSiste10MndSpørsmålProps & InjectedIntlProps;

const HarDuJobbetSomSelvstendigNæringsdrivendeSiste10MndSpørsmål = (props: Props) => {
    const { onChange, harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd, intl } = props;

    return (
        <JaNeiSpørsmål
            spørsmål={getMessage(intl, 'harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd.spørsmål')}
            navn="harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd"
            valgtVerdi={harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd}
            onChange={(verdi) => onChange(verdi)}
        />
    );
};

export default injectIntl(HarDuJobbetSomSelvstendigNæringsdrivendeSiste10MndSpørsmål);
