import React, { FunctionComponent } from 'react';
import { Field, FieldProps } from 'formik';
import { Input, InputProps } from 'nav-frontend-skjema';
import { get } from 'lodash';
import { useIntl } from 'react-intl';
import { translateError } from 'app/utils/errorUtils';

interface OwnProps {
    name: string;
}

type Props = OwnProps & InputProps;

const InputField: FunctionComponent<Props> = ({ name, ...inputProps }) => {
    const intl = useIntl();
    return (
        <Field
            name={name}
            type={inputProps.type}
            render={({ field, form }: FieldProps) => {
                const feilmelding = get(form.errors, name);
                const feil =
                    feilmelding && form.submitCount > 0
                        ? {
                              feilmelding: translateError(intl, feilmelding),
                          }
                        : undefined;

                return (
                    <Input
                        {...field}
                        {...inputProps}
                        value={field.value === undefined ? '' : field.value}
                        feil={feil?.feilmelding}
                    />
                );
            }}
        />
    );
};

export default InputField;
