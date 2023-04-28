import { FunctionComponent } from 'react';
import { Field, FieldProps } from 'formik';
import { DatePickerProps, UNSAFE_DatePicker, UNSAFE_useDatepicker } from '@navikt/ds-react';
import moment from 'moment';

interface OwnProps {
    name: string;
    label: string | React.ReactNode;
    datoAvgrensinger?:
        | {
              maksDato: string | undefined;
              minDato?: undefined;
          }
        | {
              minDato: string | undefined;
              maksDato: string;
          }
        | {
              minDato: string;
              maksDato: string | undefined;
          }
        | {
              minDato: string | undefined;
              maksDato?: undefined;
          };
}

type Props = OwnProps & DatePickerProps;

const DatoInput: FunctionComponent<Props> = ({ name, datoAvgrensinger }) => {
    const { datepickerProps, inputProps } = UNSAFE_useDatepicker({
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
    });

    return (
        <Field
            name={name}
            type="string"
            render={({ form }: FieldProps) => {
                // const feilmelding = get(form.errors, name) as string;
                // const error = feilmelding && form.submitCount > 0 ? translateError(intl, feilmelding) : undefined;

                return (
                    <UNSAFE_DatePicker {...datepickerProps}>
                        <UNSAFE_DatePicker.Input
                            {...inputProps}
                            onSelect={(event) => {
                                const date = new Date(event.currentTarget.value);

                                if (date !== undefined) {
                                    const formattedDate = moment(event.currentTarget.value).format('dd.mm.yyyy');
                                    form.setFieldValue(name, formattedDate);
                                } else {
                                    form.setFieldValue(name, event.currentTarget.value);
                                }
                            }}
                            label="Velg dato"
                        />
                    </UNSAFE_DatePicker>
                );
            }}
        />
    );
};

export default DatoInput;

// import { FunctionComponent } from 'react';
// import { Field, FieldProps } from 'formik';
// import CommonDatoInput, { DatoInputProps } from 'common/components/skjema/elements/dato-input/DatoInput';
// import get from 'lodash/get';
// import { Omit } from 'lodash';
// import { useIntl } from 'react-intl';
// import { translateError } from 'app/utils/errorUtils';

// interface OwnProps {
//     name: string;
//     label: string | React.ReactNode;
//     fullskjermKalender?: boolean;
// }

// type Props = OwnProps & Omit<DatoInputProps, 'id' | 'onChange'>;

// const DatoInput: FunctionComponent<Props> = ({ name, label, fullskjermKalender, ...datoInputProps }) => {
//     const intl = useIntl();
//     return (
//         <Field
//             name={name}
//             type="string"
//             render={({ form }: FieldProps) => {
//                 const feilmelding = get(form.errors, name) as string;

//                 return (
//                     <CommonDatoInput
//                         {...datoInputProps}
//                         name={name}
//                         id={name}
//                         label={label}
//                         dato={get(form.values, name)}
//                         feil={feilmelding && form.submitCount > 0 ? translateError(intl, feilmelding) : undefined}
//                         onChange={(dato?: string) => {
//                             form.setFieldValue(name, dato);
//                         }}
//                         calendarSettings={{
//                             position: fullskjermKalender ? 'fullscreen' : 'under',
//                         }}
//                     />
//                 );
//             }}
//         />
//     );
// };

// export default DatoInput;
