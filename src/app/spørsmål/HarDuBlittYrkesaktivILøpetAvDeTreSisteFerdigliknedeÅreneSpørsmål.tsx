import * as React from 'react';
import JaNeiSpørsmål from '../components/ja-nei-spørsmål/JaNeiSpørsmål';

interface HarDuBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅreneSpørsmålProps {
    spørsmålstekst: string;
    harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene?: boolean;
    onChange: (harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene: boolean) => void;
}

const HarDuBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅreneSpørsmål = (
    props: HarDuBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅreneSpørsmålProps
) => {
    const { onChange, spørsmålstekst, harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene } = props;

    return (
        <JaNeiSpørsmål
            spørsmål={spørsmålstekst}
            navn="iNorgePåHendelsestidspunktet"
            onChange={onChange}
            valgtVerdi={harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene}
        />
    );
};

export default HarDuBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅreneSpørsmål;
