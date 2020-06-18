import * as React from 'react';
import { useIntl } from 'react-intl';
import RadioPanelGruppe from 'common/components/skjema/wrappers/RadioPanelGruppe';
import getMessage from 'common/util/i18nUtils';
import { Validator } from 'common/lib/validation/types';
import { RadioProps } from 'nav-frontend-skjema';

interface FlervalgSpørsmålProps {
    navn: string;
    spørsmål: string;
    hjelpetekst?: string | React.ReactNode;
    valgtVerdi?: string;
    alternativer: Omit<RadioProps, 'name'>[];
    toKolonner?: boolean;
    clsName?: string;
    validators?: Validator[];
    onChange: (verdi: string) => void;
}

type Props = FlervalgSpørsmålProps;

const getDefaultValidator = (valgtVerdi?: string): Validator[] => {
    const intl = useIntl();
    return [
        {
            test: () => valgtVerdi !== undefined,
            failText: getMessage(intl, 'radiopanelgruppe.required.feilmelding'),
        },
    ];
};

const FlervalgSpørsmål = (props: Props) => {
    const {
        onChange,
        navn,
        spørsmål,
        hjelpetekst,
        valgtVerdi,
        alternativer,
        clsName,
        toKolonner = false,
        validators,
    } = props;

    return (
        <RadioPanelGruppe
            name={navn}
            twoColumns={toKolonner}
            checked={valgtVerdi}
            legend={spørsmål}
            infoboksTekst={hjelpetekst}
            radios={alternativer}
            fieldsetClassname={clsName}
            onChange={(_e: React.ChangeEvent<HTMLInputElement>, v: string) => onChange(v)}
            validators={validators !== undefined ? validators : getDefaultValidator(valgtVerdi)}
        />
    );
};

export default FlervalgSpørsmål;
