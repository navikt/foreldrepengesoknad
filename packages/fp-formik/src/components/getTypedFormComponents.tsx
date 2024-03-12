/* eslint-disable react/display-name */
import FormikCheckboxGroup, { FormikCheckboxGroupProps } from './formik-checkbox-group/FormikCheckboxGroup';
import FormikCheckbox, { FormikCheckboxProps } from './formik-checkbox/FormikCheckbox';
import FormikConfirmationCheckbox, {
    FormikConfirmationCheckboxProps,
} from './formik-confirmation-checkbox/FormikConfirmationCheckbox';
import FormikCountrySelect, { FormikCountrySelectProps } from './formik-country-select/FormikCountrySelect';
import FormikDateRangePicker, { FormikDateRangePickerProps } from './formik-date-range-picker/FormikDateRangePicker';
import FormikDatepicker, { FormikDatepickerProps } from './formik-datepicker/FormikDatepicker';
import FormikFileInput, { FormikFileInputProps } from './formik-file-input/FormikFileInput';
import FormikInputGroup, { FormikInputGroupProps } from './formik-input-group/FormikInputGroup';
import FormikRadioGroup, { FormikRadioGroupProps } from './formik-radio-group/FormikRadioGroup';
import FormikSelect, { FormikSelectProps } from './formik-select/FormikSelect';
import FormikTextField, { FormikTextFieldProps } from './formik-text-field/FormikTextField';
import FormikNumberInput, { FormikNumberInputProps } from './formik-number-input/FormikNumberInput';
import FormikTextarea, { FormikTextareaProps } from './formik-textarea/FormikTextarea';
import FormikTimeInput, { FormikTimeInputProps } from './formik-time-input/FormikTimeInput';
import FormikYesOrNoQuestion, { FormikYesOrNoQuestionProps } from './formik-yes-or-no-question/FormikYesOrNoQuestion';
import TypedFormikForm, { TypedFormikFormProps } from './typed-formik-form/TypedFormikForm';
import TypedFormikWrapper, { TypedFormikWrapperProps } from './typed-formik-wrapper/TypedFormikWrapper';
import FormikFileDropInput, { FormikFileDropInputProps } from './formik-file-drop-input/FormikFileDropInput';

export interface TypedFormComponents<FieldName, FormValues, ErrorType> {
    Checkbox: (props: FormikCheckboxProps<FieldName, ErrorType>) => JSX.Element;
    CheckboxGroup: (props: FormikCheckboxGroupProps<FieldName, ErrorType>) => JSX.Element;
    ConfirmationCheckbox: (props: FormikConfirmationCheckboxProps<FieldName, ErrorType>) => JSX.Element;
    CountrySelect: (props: FormikCountrySelectProps<FieldName, ErrorType>) => JSX.Element;
    DatePicker: (props: FormikDatepickerProps<FieldName, ErrorType>) => JSX.Element;
    DateRangePicker: (props: FormikDateRangePickerProps<FieldName, ErrorType>) => JSX.Element;
    FileInput: (props: FormikFileInputProps<FieldName>) => JSX.Element;
    FileDropInput: (props: FormikFileDropInputProps<FieldName>) => JSX.Element;
    Form: (props: TypedFormikFormProps<FormValues, ErrorType>) => JSX.Element;
    FormikWrapper: (props: TypedFormikWrapperProps<FormValues>) => JSX.Element;
    TextField: (props: FormikTextFieldProps<FieldName, ErrorType>) => JSX.Element;
    NumberInput: (props: FormikNumberInputProps<FieldName, ErrorType>) => JSX.Element;
    InputGroup: (props: FormikInputGroupProps<ErrorType, FieldName>) => JSX.Element;
    RadioGroup: (props: FormikRadioGroupProps<FieldName, ErrorType>) => JSX.Element;
    Select: (props: FormikSelectProps<FieldName, ErrorType>) => JSX.Element;
    Textarea: (props: FormikTextareaProps<FieldName, ErrorType>) => JSX.Element;
    TimeInput: (props: FormikTimeInputProps<FieldName, ErrorType>) => JSX.Element;
    YesOrNoQuestion: (props: FormikYesOrNoQuestionProps<FieldName, ErrorType>) => JSX.Element;
}

export function getTypedFormComponents<FieldName, FormValues, ErrorType = string>(): TypedFormComponents<
    FieldName,
    FormValues,
    ErrorType
> {
    return {
        Checkbox: (props: FormikCheckboxProps<FieldName, ErrorType>) => (
            <FormikCheckbox<FieldName, ErrorType> {...props} />
        ),
        CheckboxGroup: (props: FormikCheckboxGroupProps<FieldName, ErrorType>) => (
            <FormikCheckboxGroup<FieldName, ErrorType> {...props} />
        ),
        ConfirmationCheckbox: (props: FormikConfirmationCheckboxProps<FieldName, ErrorType>) => (
            <FormikConfirmationCheckbox<FieldName, ErrorType> {...props} />
        ),
        CountrySelect: (props: FormikCountrySelectProps<FieldName, ErrorType>) => (
            <FormikCountrySelect<FieldName, ErrorType> {...props} />
        ),
        DatePicker: (props: FormikDatepickerProps<FieldName, ErrorType>) => (
            <FormikDatepicker<FieldName, ErrorType> {...props} />
        ),
        DateRangePicker: (props: FormikDateRangePickerProps<FieldName, ErrorType>) => (
            <FormikDateRangePicker<FieldName, ErrorType> {...props} />
        ),
        FileDropInput: (props: FormikFileDropInputProps<FieldName>) => (
            <FormikFileDropInput<FieldName, ErrorType> {...props} />
        ),
        FileInput: (props: FormikFileInputProps<FieldName>) => <FormikFileInput<FieldName, ErrorType> {...props} />,
        Form: (props: TypedFormikFormProps<FormValues, ErrorType>) => <TypedFormikForm {...props} />,
        FormikWrapper: (props: TypedFormikWrapperProps<FormValues>) => <TypedFormikWrapper {...props} />,
        TextField: (props: FormikTextFieldProps<FieldName, ErrorType>) => (
            <FormikTextField<FieldName, ErrorType> {...props} />
        ),
        NumberInput: (props: FormikNumberInputProps<FieldName, ErrorType>) => (
            <FormikNumberInput<FieldName, ErrorType> {...props} />
        ),
        InputGroup: (props: FormikInputGroupProps<ErrorType, FieldName>) => (
            <FormikInputGroup<ErrorType, FieldName> {...props} />
        ),
        RadioGroup: (props: FormikRadioGroupProps<FieldName, ErrorType>) => (
            <FormikRadioGroup<FieldName, ErrorType> {...props} />
        ),
        Select: (props: FormikSelectProps<FieldName, ErrorType>) => <FormikSelect<FieldName, ErrorType> {...props} />,
        Textarea: (props: FormikTextareaProps<FieldName, ErrorType>) => (
            <FormikTextarea<FieldName, ErrorType> {...props} />
        ),
        TimeInput: (props: FormikTimeInputProps<FieldName, ErrorType>) => (
            <FormikTimeInput<FieldName, ErrorType> {...props} />
        ),
        YesOrNoQuestion: (props: FormikYesOrNoQuestionProps<FieldName, ErrorType>) => (
            <FormikYesOrNoQuestion<FieldName, ErrorType> {...props} />
        ),
    };
}
