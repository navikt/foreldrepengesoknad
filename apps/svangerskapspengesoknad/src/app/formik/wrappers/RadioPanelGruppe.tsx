import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { Field, FieldProps } from 'formik';
import { Omit, get } from 'lodash';

import RadioPanelGruppeResponsive, {
    RadioPanelGruppeResponsiveProps,
} from 'common/components/skjema/elements/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import { translateError } from 'app/utils/errorUtils';

type Props = Omit<RadioPanelGruppeResponsiveProps, 'onChange'> & {
    id?: string;
    value?: string;
};

const RadioPanelGruppe: FunctionComponent<Props> = (props) => {
    const intl = useIntl();
    const { id, value, legend, ...radioPanelGruppeProps } = props;
    return (
        <Field
            name={radioPanelGruppeProps.name}
            type="string"
            render={({ field, form }: FieldProps) => {
                const feilmelding = get(form.errors, radioPanelGruppeProps.name);
                const feil = feilmelding && form.submitCount > 0 ? translateError(intl, feilmelding) : undefined;
                return (
                    <RadioPanelGruppeResponsive
                        {...radioPanelGruppeProps}
                        name={id || radioPanelGruppeProps.name}
                        checked={value || field.value}
                        legend={legend}
                        onChange={(_, newValue) => {
                            form.setFieldValue(radioPanelGruppeProps.name, newValue);
                        }}
                        feil={feil}
                    />
                );
            }}
        />
    );
};
export default RadioPanelGruppe;
