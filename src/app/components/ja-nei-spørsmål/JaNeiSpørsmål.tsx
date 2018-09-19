import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import RadioPanelGruppeResponsive from 'common/components/skjema/elements/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import getMessage from 'common/util/i18nUtils';

enum ValgAlternativer {
    'JA' = 'ja',
    'NEI' = 'nei'
}

interface JaNeiSpørsmålProps {
    navn: string;
    spørsmål: string;
    hjelpetekst?: string;
    valgtVerdi?: boolean;
    onChange: (valgt: boolean) => void;
}

type Props = JaNeiSpørsmålProps & InjectedIntlProps;

const JaNeiSpørsmål = (props: Props) => {
    const { onChange, spørsmål, hjelpetekst, navn, valgtVerdi, intl } = props;

    let checked;
    if (valgtVerdi === true) {
        checked = ValgAlternativer.JA;
    } else if (valgtVerdi === false) {
        checked = ValgAlternativer.NEI;
    }

    return (
        <RadioPanelGruppeResponsive
            name={navn}
            checked={checked}
            legend={spørsmål}
            infoboksTekst={hjelpetekst}
            radios={[
                {
                    label: getMessage(intl, 'ja'),
                    value: ValgAlternativer.JA
                },
                {
                    label: getMessage(intl, 'nei'),
                    value: ValgAlternativer.NEI
                }
            ]}
            onChange={(e: React.ChangeEvent<HTMLInputElement>, v: ValgAlternativer) =>
                onChange(v === ValgAlternativer.JA)
            }
        />
    );
};

export default injectIntl(JaNeiSpørsmål);
