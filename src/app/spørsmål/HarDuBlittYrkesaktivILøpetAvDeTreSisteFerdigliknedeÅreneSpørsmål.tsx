import * as React from 'react';
import JaNeiSpørsmål from '../components/ja-nei-spørsmål/JaNeiSpørsmål';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';

interface HarDuBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅreneSpørsmålProps {
    spørsmålstekst: string;
    harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene?: boolean;
    onChange: (harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene: boolean) => void;
}

type Props = HarDuBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅreneSpørsmålProps & InjectedIntlProps;

const HarDuBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅreneSpørsmål = (props: Props) => {
    const { onChange, spørsmålstekst, harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene, intl } = props;

    return (
        <JaNeiSpørsmål
            spørsmål={spørsmålstekst}
            navn="harBlittYrkesaktivSisteTreÅr"
            hjelpetekst={getMessage(intl, 'blittYrkesaktivSiste3År.hjelpetekst')}
            onChange={onChange}
            valgtVerdi={harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene}
        />
    );
};

export default injectIntl(HarDuBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅreneSpørsmål);
