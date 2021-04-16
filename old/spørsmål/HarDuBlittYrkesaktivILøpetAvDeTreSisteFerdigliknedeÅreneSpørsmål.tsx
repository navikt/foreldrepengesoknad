import * as React from 'react';
import JaNeiSpørsmål from '../../common/components/skjema/elements/ja-nei-spørsmål/JaNeiSpørsmål';
import { useIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';

interface HarDuBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅreneSpørsmålProps {
    spørsmålstekst: string;
    harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene?: boolean;
    onChange: (harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene: boolean) => void;
}

type Props = HarDuBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅreneSpørsmålProps;

const HarDuBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅreneSpørsmål = (props: Props) => {
    const { onChange, spørsmålstekst, harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene } = props;
    const intl = useIntl();

    return (
        <JaNeiSpørsmål
            spørsmål={spørsmålstekst}
            navn="harBlittYrkesaktivSisteTreÅr"
            hjelpetekst={getMessage(intl, 'blittYrkesaktivSiste3År.hjelpetekst')}
            hjelpetekstApneLabel={getMessage(intl, 'blittYrkesaktivSiste3År.hjelpetekst.apneLabel')}
            onChange={onChange}
            valgtVerdi={harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene}
        />
    );
};

export default HarDuBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅreneSpørsmål;
