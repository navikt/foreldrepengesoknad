import { UNSAFE_DatePicker, UNSAFE_useDatepicker } from '@navikt/ds-react';
import { DateLimits, dateToISOFormattedDateString } from 'common/util/datoUtils';
import dayjs from 'dayjs';
import { FormikProps } from 'formik';
import { get } from 'lodash';
import { FunctionComponent, ReactNode, useState } from 'react';

type Props = {
    error: string | undefined;
    label: string | ReactNode;
    datoAvgrensinger?: DateLimits;
    form: FormikProps<any>;
    name: string;
};

const Datepicker: FunctionComponent<Props> = ({ error, label, datoAvgrensinger, form, name }) => {
    const formValue = get(form.values, name);
    const formattedFormValue = formValue ? dayjs(formValue, 'YYYY-MM-DD', true).format('DD.MM.YYYY') : '';
    const [selectedValue, setSelectedValue] = useState(formattedFormValue);

    const { datepickerProps } = UNSAFE_useDatepicker({
        defaultSelected: formValue ? dayjs(formValue).toDate() : undefined,
        fromDate: datoAvgrensinger
            ? datoAvgrensinger.minDato
                ? new Date(datoAvgrensinger.minDato)
                : undefined
            : undefined,
        toDate: datoAvgrensinger
            ? datoAvgrensinger.maksDato
                ? new Date(datoAvgrensinger.maksDato)
                : undefined
            : undefined,
        onDateChange: (date: Date | undefined) => {
            if (form) {
                if (date !== undefined) {
                    const dateString = dateToISOFormattedDateString(date);
                    setSelectedValue(dayjs(dateString).format('DD.MM.YYYY'));
                    form.setFieldValue(name, dateString);
                } else {
                    return;
                }
            }
        },
    });

    return (
        <UNSAFE_DatePicker {...datepickerProps}>
            <UNSAFE_DatePicker.Input
                error={error}
                label={label}
                placeholder="dd.mm.åååå"
                value={selectedValue}
                onChange={(event) => {
                    const input = event.target.value;
                    const value = dayjs(input, 'DD.MM.YYYY', true).format('YYYY-MM-DD');
                    setSelectedValue(input);

                    if (value !== 'Invalid date') {
                        form.setFieldValue(name, value);
                    } else {
                        form.setFieldValue(name, input);
                    }
                }}
            />
        </UNSAFE_DatePicker>
    );
};

export default Datepicker;
