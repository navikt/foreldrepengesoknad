import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from '../components/ja-nei-spørsmål/JaNeiSpørsmål';

interface AleneOmOmsorgsSpørsmålProps {
    aleneOmOmsorg?: boolean;
    onChange: (aleneomsorg: boolean) => void;
}

type Props = AleneOmOmsorgsSpørsmålProps & InjectedIntlProps;

const AleneOmOmsorgsSpørsmål = (props: Props) => {
    const { onChange, aleneOmOmsorg, intl } = props;

    return (
        <JaNeiSpørsmål
            spørsmål={getMessage(intl, 'annenForelder.aleneOmOmsorg')}
            navn="omsorgsfordeling"
            hjelpetekst="Du har omsorgen for barnet alene, og du bor ikke sammen med den andre forelderen."
            onChange={onChange}
            valgtVerdi={aleneOmOmsorg === undefined ? undefined : !aleneOmOmsorg}
        />
    );
};

export default injectIntl(AleneOmOmsorgsSpørsmål);
