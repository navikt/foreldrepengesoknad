import { FunctionComponent } from 'react';
import { Field, FieldProps } from 'formik';
import { DatePickerProps } from '@navikt/ds-react';
import { DateLimits } from 'common/util/datoUtils';
import { translateError } from 'app/utils/errorUtils';
import { useIntl } from 'react-intl';
import { get } from 'lodash';
import Datepicker from './Datepicker';

interface OwnProps {
    name: string;
    label: string | React.ReactNode;
    datoAvgrensinger?: DateLimits;
}

type Props = OwnProps & DatePickerProps;

const DatoInput: FunctionComponent<Props> = ({ name, datoAvgrensinger, label }) => {
    const intl = useIntl();

    return (
        <Field name={name} type="string">
            {({ form }: FieldProps) => {
                const feilmelding = get(form.errors, name) as string;
                const error = feilmelding && form.submitCount > 0 ? translateError(intl, feilmelding) : undefined;

                return (
                    <Datepicker
                        name={name}
                        error={error}
                        label={label}
                        datoAvgrensinger={datoAvgrensinger}
                        form={form}
                    />
                );
            }}
        </Field>
    );
};

export default DatoInput;
