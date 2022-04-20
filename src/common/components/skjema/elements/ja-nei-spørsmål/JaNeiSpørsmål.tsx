import * as React from 'react';
import { useIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import FlervalgSpørsmål from '../flervalg-spørsmål/FlervalgSpørsmål';
import { Validator } from 'common/lib/validation/types';

enum ValgAlternativer {
    JA = 'ja',
    NEI = 'nei',
}

interface JaNeiSpørsmålProps {
    navn: string;
    spørsmål: string;
    hjelpetekst?: React.ReactNode;
    valgtVerdi?: boolean;
    toKolonner?: boolean;
    clsName?: string;
    labels?: {
        ja: string;
        nei: string;
    };
    validators?: Validator[];
    onChange: (valgt: boolean) => void;
    hjelpetekstApneLabel?: React.ReactNode;
}

type Props = JaNeiSpørsmålProps;

const JaNeiSpørsmål = (props: Props) => {
    const {
        onChange,
        spørsmål,
        hjelpetekst,
        hjelpetekstApneLabel,
        navn,
        valgtVerdi,
        clsName,
        toKolonner = true,
        labels,
        validators,
    } = props;
    const intl = useIntl();

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
            hjelpetekstApneLabel={hjelpetekstApneLabel}
            toKolonner={toKolonner}
            clsName={clsName}
            alternativer={[
                {
                    label: labels ? labels.ja : getMessage(intl, 'ja'),
                    value: ValgAlternativer.JA,
                },
                {
                    label: labels ? labels.nei : getMessage(intl, 'nei'),
                    value: ValgAlternativer.NEI,
                },
            ]}
            onChange={(v: ValgAlternativer) => onChange(v === ValgAlternativer.JA)}
            validators={validators}
        />
    );
};

export default JaNeiSpørsmål;
