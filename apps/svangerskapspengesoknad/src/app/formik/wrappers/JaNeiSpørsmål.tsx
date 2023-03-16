import React, { FunctionComponent } from 'react';
import { Field, FieldProps } from 'formik';
import { get, Omit } from 'lodash';

import RadioPanelGruppeResponsive, {
    RadioPanelGruppeResponsiveProps,
} from 'common/components/skjema/elements/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import { useIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import { translateError } from 'app/utils/errorUtils';

type Props = Omit<RadioPanelGruppeResponsiveProps, 'radios' | 'onChange'> & {
    labels?: {
        ja: string;
        nei: string;
    };
};

enum Radios {
    'JA' = 'ja',
    'NEI' = 'nei',
}

const JaNeiSpørsmål: FunctionComponent<Props> = ({ labels, name, ...radioPanelGruppeProps }) => {
    const intl = useIntl();
    return (
        <Field
            name={name}
            type="string"
            render={({ field, form }: FieldProps) => {
                let checked;
                if (field.value === true) {
                    checked = Radios.JA;
                } else if (field.value === false) {
                    checked = Radios.NEI;
                }

                const radios = [
                    {
                        label: labels ? labels.ja : getMessage(intl, 'jaNeiSpørsmål.ja'),
                        value: Radios.JA,
                    },
                    {
                        label: labels ? labels.nei : getMessage(intl, 'jaNeiSpørsmål.nei'),
                        value: Radios.NEI,
                    },
                ];

                const feilmelding = get(form.errors, name);
                const feil = feilmelding && form.submitCount > 0 ? translateError(intl, feilmelding) : undefined;

                return (
                    <RadioPanelGruppeResponsive
                        {...radioPanelGruppeProps}
                        name={name}
                        radios={radios}
                        feil={feil}
                        checked={checked}
                        onChange={(_, value) => {
                            form.setFieldValue(name, value === Radios.JA);
                        }}
                    />
                );
            }}
        />
    );
};

export default JaNeiSpørsmål;
