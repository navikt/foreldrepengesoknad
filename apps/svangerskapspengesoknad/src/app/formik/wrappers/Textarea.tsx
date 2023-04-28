import { FunctionComponent } from 'react';
import { Field, FieldProps } from 'formik';
import { get } from 'lodash';
import { useIntl } from 'react-intl';
import { Textarea as TextareaDS, TextareaProps } from '@navikt/ds-react';
import { translateError } from 'app/utils/errorUtils';

interface OwnProps {
    name: string;
}

type Props = OwnProps & Omit<TextareaProps, 'value' | 'onChange'>;

const Textarea: FunctionComponent<Props> = ({ name, ...textareaProps }) => {
    const intl = useIntl();
    return (
        <Field
            name={name}
            type="textarea"
            render={({ field, form }: FieldProps) => {
                const feilmelding = get(form.errors, name);
                const feil = feilmelding && form.submitCount > 0 ? translateError(intl, feilmelding) : undefined;

                return (
                    <TextareaDS
                        {...field}
                        {...textareaProps}
                        value={field.value === undefined ? '' : field.value}
                        error={feil}
                    />
                );
            }}
        />
    );
};

export default Textarea;
