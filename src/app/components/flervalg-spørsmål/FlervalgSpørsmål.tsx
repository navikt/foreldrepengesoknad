import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import RadioPanelGruppe from 'common/components/skjema/wrappers/RadioPanelGruppe';
import getMessage from 'common/util/i18nUtils';

export interface FlervalgAlternativ {
    label: string;
    value: string;
}

interface FlervalgSpørsmålProps {
    navn: string;
    spørsmål: string;
    hjelpetekst?: string | React.ReactNode;
    valgtVerdi?: string;
    alternativer: FlervalgAlternativ[];
    toKolonner?: boolean;
    onChange: (verdi: string) => void;
}

type Props = FlervalgSpørsmålProps & InjectedIntlProps;

const FlervalgSpørsmål = (props: Props) => {
    const { onChange, spørsmål, hjelpetekst, valgtVerdi, alternativer, toKolonner = false, intl } = props;

    return (
        <RadioPanelGruppe
            name={name}
            twoColumns={toKolonner}
            checked={valgtVerdi}
            legend={spørsmål}
            infoboksTekst={hjelpetekst}
            radios={alternativer}
            onChange={(e: React.ChangeEvent<HTMLInputElement>, v: string) => onChange(v)}
            validators={[
                {
                    test: () => valgtVerdi !== undefined,
                    failText: getMessage(intl, 'radiopanelgruppe.required.feilmelding')
                }
            ]}
        />
    );
};

export default injectIntl(FlervalgSpørsmål);
