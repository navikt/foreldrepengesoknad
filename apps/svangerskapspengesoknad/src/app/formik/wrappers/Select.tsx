import React, { FunctionComponent, ReactNode } from 'react';
import { Field, FieldProps } from 'formik';
import { Select as NavSelect } from 'nav-frontend-skjema';
import { SelectChangeEvent } from 'app/types/events';
import get from 'lodash/get';
import { translateError } from 'app/utils/errorUtils';
import { useIntl } from 'react-intl';

interface Props {
    name: string;
    label: string;
    children: ReactNode | ReactNode[];
}

const Select: FunctionComponent<Props> = (props) => {
    const intl = useIntl();
    const { name, label, children } = props;
    return (
        <Field
            name={name}
            render={({ field, form }: FieldProps<any>) => {
                const feilmelding = get(form.errors, name);
                const feil = feilmelding && form.submitCount > 0 ? translateError(intl, feilmelding) : undefined;

                return (
                    <NavSelect
                        {...field}
                        label={label}
                        onChange={(e: SelectChangeEvent) => {
                            form.setFieldValue(field.name, e.target.value);
                        }}
                        feil={feil}
                    >
                        {children}
                    </NavSelect>
                );
            }}
        />
    );
};

export default Select;
