import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import FlervalgSpørsmål from '../flervalg-sp\u00F8rsm\u00E5l/FlervalgSp\u00F8rsm\u00E5l';

enum ValgAlternativer {
    'JA' = 'ja',
    'NEI' = 'nei'
}

interface JaNeiSpørsmålProps {
    navn: string;
    spørsmål: string;
    hjelpetekst?: string;
    valgtVerdi?: boolean;
    toKolonner?: boolean;
    onChange: (valgt: boolean) => void;
}

type Props = JaNeiSpørsmålProps & InjectedIntlProps;

const JaNeiSpørsmål = (props: Props) => {
    const { onChange, spørsmål, hjelpetekst, navn, valgtVerdi, toKolonner = true, intl } = props;

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
                    label: getMessage(intl, 'ja'),
                    value: ValgAlternativer.JA
                },
                {
                    label: getMessage(intl, 'nei'),
                    value: ValgAlternativer.NEI
                }
            ]}
            onChange={(v: ValgAlternativer) => onChange(v === ValgAlternativer.JA)}
        />
    );
};

export default injectIntl(JaNeiSpørsmål);
