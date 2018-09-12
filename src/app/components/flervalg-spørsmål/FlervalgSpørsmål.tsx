import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import RadioPanelGruppeResponsive from 'common/components/skjema/elements/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';

export interface FlervalgAlternativ {
    label: string;
    value: string;
}

interface FlervalgSpørsmålProps {
    navn: string;
    spørsmål: string;
    hjelpetekst?: string;
    valgtVerdi?: string;
    alternativer: FlervalgAlternativ[];
    toKolonner?: boolean;
    onChange: (verdi: string) => void;
}

type Props = FlervalgSpørsmålProps & InjectedIntlProps;

const FlervalgSpørsmål = (props: Props) => {
    const { onChange, spørsmål, hjelpetekst, valgtVerdi, alternativer, toKolonner = false } = props;

    return (
        <RadioPanelGruppeResponsive
            name={name}
            twoColumns={toKolonner}
            checked={valgtVerdi}
            legend={spørsmål}
            infoboksTekst={hjelpetekst}
            radios={alternativer}
            onChange={(e: React.ChangeEvent<HTMLInputElement>, v: string) => onChange(v)}
        />
    );
};

export default injectIntl(FlervalgSpørsmål);
