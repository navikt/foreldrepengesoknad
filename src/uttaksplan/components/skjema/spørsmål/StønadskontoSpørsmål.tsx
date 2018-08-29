import * as React from 'react';
import Radioliste, { RadiolisteValg } from 'uttaksplan/components/radioliste/Radioliste';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { StønadskontoType } from 'uttaksplan/types';
import { Feil } from 'common/components/skjema/elements/skjema-input-element/types';

export interface OwnProps {
    spørsmål: string;
    stønadskonto?: StønadskontoType;
    tilgjengeligeKontoer: StønadskontoType[];
    feil?: Feil;
    onChange: (type: StønadskontoType) => void;
}

export type Props = OwnProps & InjectedIntlProps;

const StønadskontoSpørsmål: React.StatelessComponent<Props> = ({
    feil,
    spørsmål,
    stønadskonto,
    tilgjengeligeKontoer,
    onChange,
    intl
}) => {
    const valg: RadiolisteValg[] = tilgjengeligeKontoer.map((konto) => ({
        tittel: intl.formatMessage({
            id: `stønadskontotype.${konto}`
        }),
        verdi: konto
    }));

    return (
        <Radioliste
            kolonner="2"
            tittel={spørsmål}
            stil="ekstern"
            feil={feil}
            valg={valg}
            inputnavn="stønadskonto"
            valgtVerdi={stønadskonto}
            onChange={(value) => onChange(value as StønadskontoType)}
        />
    );
};
export default injectIntl(StønadskontoSpørsmål);
