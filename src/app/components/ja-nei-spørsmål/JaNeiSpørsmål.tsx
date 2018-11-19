import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import FlervalgSpørsmål from '../flervalg-spørsmål/FlervalgSpørsmål';

enum ValgAlternativer {
    'JA' = 'ja',
    'NEI' = 'nei'
}

interface JaNeiSpørsmålProps {
    navn: string;
    spørsmål: string;
    hjelpetekst?: string | React.ReactNode;
    valgtVerdi?: boolean;
    toKolonner?: boolean;
    labels?: {
        ja: string;
        nei: string;
    };
    onChange: (valgt: boolean) => void;
}

type Props = JaNeiSpørsmålProps & InjectedIntlProps;

const JaNeiSpørsmål = (props: Props) => {
    const { onChange, spørsmål, hjelpetekst, navn, valgtVerdi, toKolonner = true, labels, intl } = props;

    let checked;
    if (valgtVerdi === true) {
        checked = ValgAlternativer.JA;
    } else if (valgtVerdi === false) {
        checked = ValgAlternativer.NEI;
    }

    return (
        <FlervalgSpørsmål
            navn={navn}
            valgtVerdi={checked}
            spørsmål={spørsmål}
            hjelpetekst={hjelpetekst}
            toKolonner={toKolonner}
            alternativer={[
                {
                    label: labels ? labels.ja : getMessage(intl, 'ja'),
                    value: ValgAlternativer.JA
                },
                {
                    label: labels ? labels.nei : getMessage(intl, 'nei'),
                    value: ValgAlternativer.NEI
                }
            ]}
            onChange={(v: ValgAlternativer) => onChange(v === ValgAlternativer.JA)}
        />
    );
};

export default injectIntl(JaNeiSpørsmål);
