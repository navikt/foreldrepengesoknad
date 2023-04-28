import { FunctionComponent } from 'react';
import { Field, FieldProps } from 'formik';
import { get } from 'lodash';
import { useIntl } from 'react-intl';
import { translateError } from 'app/utils/errorUtils';
import { TextField, TextFieldProps } from '@navikt/ds-react';

interface OwnProps {
    name: string;
}

type Props = OwnProps & TextFieldProps;

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
                    <TextField
                        {...field}
                        {...inputProps}
                        value={field.value === undefined ? '' : field.value}
                        error={feil?.feilmelding}
                    />
                );
            }}
        />
    );
};

export default InputField;
