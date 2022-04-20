import * as React from 'react';
import { IntlShape, useIntl } from 'react-intl';
import RadioPanelGruppe from 'common/components/skjema/wrappers/RadioPanelGruppe';
import getMessage from 'common/util/i18nUtils';
import { Validator } from 'common/lib/validation/types';
import { RadioProps } from 'nav-frontend-skjema';

interface FlervalgSpørsmålProps {
    navn: string;
    spørsmål: string;
    hjelpetekst?: React.ReactNode;
    hjelpetekstApneLabel?: React.ReactNode;
    valgtVerdi?: string;
    alternativer: Omit<RadioProps, 'name'>[];
    toKolonner?: boolean;
    clsName?: string;
    validators?: Validator[];
    onChange: (verdi: string) => void;
}

type Props = FlervalgSpørsmålProps;

const getDefaultValidator = (intl: IntlShape, valgtVerdi?: string): Validator[] => {
    return [
        {
            test: () => valgtVerdi !== undefined,
            failText: getMessage(intl, 'radiopanelgruppe.required.feilmelding'),
        },
    ];
};

const FlervalgSpørsmål = (props: Props) => {
    const intl = useIntl();
    const {
        onChange,
        navn,
        spørsmål,
        hjelpetekst,
        hjelpetekstApneLabel,
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
            hjelpetekstApneLabel={hjelpetekstApneLabel}
            radios={alternativer}
            fieldsetClassname={clsName}
            onChange={(_e: React.ChangeEvent<HTMLInputElement>, v: string) => onChange(v)}
            validators={validators !== undefined ? validators : getDefaultValidator(intl, valgtVerdi)}
        />
    );
};

export default FlervalgSpørsmål;
