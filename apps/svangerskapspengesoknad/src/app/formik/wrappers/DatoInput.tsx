import React, { FunctionComponent } from 'react';
import { Field, FieldProps } from 'formik';
import CommonDatoInput, { DatoInputProps } from 'common/components/skjema/elements/dato-input/DatoInput';
import get from 'lodash/get';
import { Omit } from 'lodash';
import { useIntl } from 'react-intl';
import { translateError } from 'app/utils/errorUtils';

interface OwnProps {
    name: string;
    label: string | React.ReactNode;
    fullskjermKalender?: boolean;
}

type Props = OwnProps & Omit<DatoInputProps, 'id' | 'onChange'>;

const DatoInput: FunctionComponent<Props> = ({ name, label, fullskjermKalender, ...datoInputProps }) => {
    const intl = useIntl();
    return (
        <Field
            name={name}
            type="string"
            render={({ form }: FieldProps) => {
                const feilmelding = get(form.errors, name) as string;

                return (
                    <CommonDatoInput
                        {...datoInputProps}
                        name={name}
                        id={name}
                        label={label}
                        dato={get(form.values, name)}
                        feil={feilmelding && form.submitCount > 0 ? translateError(intl, feilmelding) : undefined}
                        onChange={(dato?: string) => {
                            form.setFieldValue(name, dato);
                        }}
                        calendarSettings={{
                            position: fullskjermKalender ? 'fullscreen' : 'under',
                        }}
                    />
                );
            }}
        />
    );
};

export default DatoInput;
